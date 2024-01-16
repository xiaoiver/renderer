import { System } from '@lastolivegames/becsy';
import { Last, PostUpdate } from '../../systems';

export namespace SimulationLightSystems {
  export const AddClusters = System.group();
  export const AddClustersFlush = System.group();
  export const AssignLightsToClusters = System.group();
  export const UpdateDirectionalLightCascades = System.group();
  export const UpdateLightFrusta = System.group();
  export const CheckLightVisibility = System.group();
}

SimulationLightSystems.AddClusters.schedule((s) =>
  s.before(SimulationLightSystems.AddClustersFlush).after(PostUpdate),
);
SimulationLightSystems.AddClustersFlush.schedule((s) =>
  s.before(SimulationLightSystems.AssignLightsToClusters),
);
SimulationLightSystems.AssignLightsToClusters.schedule((s) =>
  s.before(SimulationLightSystems.UpdateDirectionalLightCascades),
);
SimulationLightSystems.UpdateDirectionalLightCascades.schedule((s) =>
  s.before(SimulationLightSystems.UpdateLightFrusta),
);
SimulationLightSystems.UpdateLightFrusta.schedule((s) =>
  s.before(SimulationLightSystems.CheckLightVisibility).before(Last),
);
