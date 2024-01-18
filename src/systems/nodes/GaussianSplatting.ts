import {
  AddressMode,
  BlendFactor,
  BlendMode,
  Buffer,
  BufferUsage,
  ChannelWriteMask,
  CompareFunction,
  CullMode,
  FilterMode,
  MipmapFilterMode,
  PrimitiveTopology,
  Program,
  TransparentBlack,
  fullscreenMegaState,
  nArray,
} from '@antv/g-device-api';
import { createProgram } from '../utils';
import { PipelineNode } from './PipelineNode';
import { PrepareViewUniforms } from '../PrepareViewUniforms';
import gaussian from '../../shaders/gaussian-splatting/gaussian';
import { PrepareGaussianCloudUniforms } from '../gaussian-splatting';
import { GaussianCloud, SortedEntries } from '../../components';

export class GaussianSplattingNode extends PipelineNode {
  viewUniforms: PrepareViewUniforms;
  settingsUniforms: PrepareGaussianCloudUniforms;
  cloud: GaussianCloud;
  sortedEntries: SortedEntries;

  private program: Program;
  private positionVisibilityStorageBuffer: Buffer;
  private sphericalHarmonicsStorageBuffer: Buffer;
  private rotationStorageBuffer: Buffer;
  private scaleOpacityStorageBuffer: Buffer;
  private sortedEntriesStorageBuffer: Buffer;

  init() {
    const { device } = this.renderCache;
    this.program = createProgram(
      device,
      {
        vertex: {
          wgsl: gaussian,
          entryPoint: 'vs_points',
        },
        fragment: {
          wgsl: gaussian,
          entryPoint: 'fs_main',
        },
      },
      {},
    );
  }

  prepare(): void {
    const { device } = this.renderCache;
    const { position_visibility, spherical_harmonic, rotation, scale_opacity } =
      this.cloud;

    if (!this.positionVisibilityStorageBuffer) {
      this.positionVisibilityStorageBuffer = device.createBuffer({
        viewOrSize: new Float32Array(position_visibility.length * 4),
        usage: BufferUsage.STORAGE,
      });
      this.sphericalHarmonicsStorageBuffer = device.createBuffer({
        viewOrSize: new Float32Array(spherical_harmonic.length * 4),
        usage: BufferUsage.STORAGE,
      });
      this.rotationStorageBuffer = device.createBuffer({
        viewOrSize: new Float32Array(rotation.length * 4),
        usage: BufferUsage.STORAGE,
      });
      this.scaleOpacityStorageBuffer = device.createBuffer({
        viewOrSize: new Float32Array(scale_opacity.length * 4),
        usage: BufferUsage.STORAGE,
      });
      this.sortedEntriesStorageBuffer = device.createBuffer({
        viewOrSize: new Float32Array(this.sortedEntries.sorted.length * 2),
        usage: BufferUsage.STORAGE,
      });
    }

    this.positionVisibilityStorageBuffer.setSubData(
      0,
      new Uint8Array(
        new Float32Array(
          position_visibility.flatMap(({ position, visibility }) => [
            ...position,
            visibility,
          ]),
        ).buffer,
      ),
    );

    this.sphericalHarmonicsStorageBuffer.setSubData(
      0,
      new Uint8Array(
        new Float32Array(
          spherical_harmonic.flatMap(({ coefficients }) => [
            ...coefficients,
            0,
          ]),
        ).buffer,
      ),
    );

    this.rotationStorageBuffer.setSubData(
      0,
      new Uint8Array(
        new Float32Array(rotation.flatMap(({ rotation }) => rotation)).buffer,
      ),
    );

    this.scaleOpacityStorageBuffer.setSubData(
      0,
      new Uint8Array(
        new Float32Array(
          scale_opacity.flatMap(({ scale, opacity }) => [...scale, opacity]),
        ).buffer,
      ),
    );

    this.sortedEntriesStorageBuffer.setSubData(
      0,
      new Uint8Array(
        new Float32Array(
          this.sortedEntries.sorted.flatMap(({ key, index }) => [key, index]),
        ).buffer,
      ),
    );
  }

  post(): void {}

  submit(): void {
    const renderInst = this.renderInstManager.newRenderInst();

    renderInst.setAllowSkippingIfPipelineNotReady(false);
    renderInst.setTopology(PrimitiveTopology.TRIANGLE_STRIP);
    renderInst.setMegaStateFlags({
      attachmentsState: [
        {
          channelWriteMask: ChannelWriteMask.ALL,
          rgbBlendState: {
            blendMode: BlendMode.ADD,
            blendSrcFactor: BlendFactor.ONE,
            blendDstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA,
          },
          alphaBlendState: {
            blendMode: BlendMode.ADD,
            blendSrcFactor: BlendFactor.ONE,
            blendDstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA,
          },
        },
      ],
      // blendConstant: TransparentBlack,
      depthWrite: false,
      depthCompare: CompareFunction.GEQUAL,
      cullMode: CullMode.NONE,
      ...fullscreenMegaState,
    });
    renderInst.setBindingLayout({
      numUniformBuffers: 2,
      numSamplers: 0,
      numStorageBuffers: 5,
      numStorageTextures: 0,
    });
    renderInst.setUniformBuffer(this.pipeline.renderHelper.uniformBuffer);
    renderInst.setStorageBuffers(
      [
        this.positionVisibilityStorageBuffer,
        this.sphericalHarmonicsStorageBuffer,
        this.rotationStorageBuffer,
        this.scaleOpacityStorageBuffer,
        this.sortedEntriesStorageBuffer,
      ],
      [0, 1, 2, 3, 4],
    );

    this.viewUniforms.prepareUniforms(renderInst, 0);
    this.settingsUniforms.prepareUniforms(renderInst, 1);

    renderInst.setProgram(this.program);

    // TODO: draw indirect
    renderInst.drawPrimitivesInstanced(4, this.cloud.len());

    this.renderInstManager.submitRenderInst(renderInst, this.renderList);
  }
}
