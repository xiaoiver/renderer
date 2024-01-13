import { Bundle } from '../Bundle';
import { Visibility } from '../render';
import { GaussianCloud } from './GaussianCloud';
import { GaussianCloudSettings } from './GaussianCloudSettings';

export class GaussianSplattingBundle extends Bundle {
  settings: GaussianCloudSettings;
  cloud: GaussianCloud;
  visibility: Visibility;

  constructor(
    options?: Partial<{
      settings: GaussianCloudSettings;
      cloud: GaussianCloud;
      visibility: Visibility;
    }>,
  ) {
    super();

    const {
      settings = new GaussianCloudSettings(),
      cloud = new GaussianCloud(),
      visibility = new Visibility(),
    } = options || {};

    this.settings = settings;
    this.cloud = cloud;
    this.visibility = visibility;
  }
}
