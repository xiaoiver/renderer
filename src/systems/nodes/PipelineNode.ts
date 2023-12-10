import { RenderPass } from '@antv/g-device-api';
import { Entity } from '@lastolivegames/becsy';
import {
  RenderCache,
  RenderInstList,
  RenderInstManager,
} from '../../framegraph';
import { MeshPipeline } from '../MeshPipeline';

export abstract class PipelineNode {
  constructor(
    protected renderInstManager: RenderInstManager,
    protected renderCache: RenderCache,
    protected pipeline: MeshPipeline,
    protected renderList = new RenderInstList(),
  ) {
    this.init();
  }

  abstract init(): void;

  /**
   * Get called before renderpass' execution.
   */
  abstract prepare(): void;

  draw(renderPass: RenderPass) {
    this.renderList.drawOnPassRenderer(this.renderCache, renderPass);
  }

  abstract post(): void;

  abstract submit(renderable: Entity): void;
}
