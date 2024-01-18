import { Entity, System } from '@lastolivegames/becsy';
import { RenderResource } from '../RenderResource';
import bindings from '../../shaders/gaussian-splatting/bindings';
import spherical_harmonics from '../../shaders/gaussian-splatting/spherical_harmonics';
import planar from '../../shaders/gaussian-splatting/planar';
import {
  GaussianCloud,
  GaussianCloudSettings,
  HALF_SH_COEFF_COUNT,
  SH_COEFF_COUNT,
  SortedEntries,
} from '../../components';
import transform from '../../shaders/gaussian-splatting/transform';
import depth from '../../shaders/gaussian-splatting/depth';
import { PrepareViewUniforms } from '../PrepareViewUniforms';
import { MeshPipeline } from '../MeshPipeline';
import { GaussianSplattingNode } from '../nodes/GaussianSplatting';
import { PrepareGaussianCloudUniforms } from './PrepareGaussianCloudUniforms';

export class GaussianCloudPipeline extends System {
  private renderResource = this.attach(RenderResource);
  private viewUniforms = this.attach(PrepareViewUniforms);
  private settingsUniforms = this.attach(PrepareGaussianCloudUniforms);
  private pipeline = this.attach(MeshPipeline);

  constructor() {
    super();
    this.query((q) => q.using(GaussianCloud, GaussianCloudSettings).read);
  }

  async prepare() {
    this.renderResource.registerShaderModule(bindings);
    this.renderResource.registerShaderModule(spherical_harmonics);
    this.renderResource.registerShaderModule(planar);
    this.renderResource.registerShaderModule(transform);
    this.renderResource.registerShaderModule(depth);
  }

  private clouds = this.query(
    (q) => q.added.and.changed.removed.with(SortedEntries).trackWrites,
  );

  /**
   * Should only has one node.
   */
  private gaussianSplattingNode: GaussianSplattingNode;

  execute(): void {
    this.clouds.added.forEach((entity) => {
      const cloud = entity.read(GaussianCloud);
      const sortedEntries = entity.read(SortedEntries);
      this.pipeline.passesChanged = true;
      this.gaussianSplattingNode = new GaussianSplattingNode(
        this.renderResource.renderHelper.renderInstManager,
        this.renderResource.renderHelper.renderCache,
        this.pipeline,
      );
      this.gaussianSplattingNode.cloud = cloud;
      this.gaussianSplattingNode.sortedEntries = sortedEntries;
      this.gaussianSplattingNode.viewUniforms = this.viewUniforms;
      this.gaussianSplattingNode.settingsUniforms = this.settingsUniforms;
      this.pipeline.nodes.unshift(this.gaussianSplattingNode);
    });

    this.clouds.changed.forEach((entity) => {
      const cloud = entity.read(GaussianCloud);
      const sortedEntries = entity.read(SortedEntries);

      this.pipeline.passesChanged = true;
      this.gaussianSplattingNode.cloud = cloud;
      this.gaussianSplattingNode.sortedEntries = sortedEntries;
      this.gaussianSplattingNode.viewUniforms = this.viewUniforms;
      this.gaussianSplattingNode.settingsUniforms = this.settingsUniforms;
    });
  }
}
