import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OBJECT_ELEMENTS} from '../helpers/constants';
export class ObjectsCreator {
  constructor() {
    this.objLoader = new OBJLoader();
    this.loaderGltf = new GLTFLoader();

    this.objects = {};
  }
  create(name, onSuccess) {
    if (this.objects[name] && typeof onSuccess === `function`) {
      onSuccess.call(null, this.objects[name]);
      return;
    }
    const config = ObjectsCreator.objectsConfigMap[name];
    if (!config) {
      return;
    }
    const onComplete = (obj3d) => {
      this.objects[name] = obj3d;

      if (typeof onSuccess === `function`) {
        onSuccess.call(null, obj3d);
      }
    };
    const onGltfComplete = (gltf) => {
      if (!gltf.scene) {
        return;
      }
      onComplete(gltf.scene);
    };
    if (config.path.endsWith(`.obj`)) {
      this.objLoader.load(config.path, onComplete);
    } else if (config.path.endsWith(`.gltf`)) {
      this.loaderGltf.load(config.path, onGltfComplete);
    }
  }
}

ObjectsCreator.objectsConfigMap = {
  [OBJECT_ELEMENTS.airplane]: {
    path: `./3d/module-6/scene-0-objects/airplane.obj`,
  },
  [OBJECT_ELEMENTS.suitcase]: {
    path: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  [OBJECT_ELEMENTS.watermelon]: {
    path: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  },
  [OBJECT_ELEMENTS.wallCorner]: {
    path: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  },
  [OBJECT_ELEMENTS.staticOutput1]: {
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
  },
  [OBJECT_ELEMENTS.staticOutput2]: {
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
  },
  [OBJECT_ELEMENTS.staticOutput3]: {
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
  },
  [OBJECT_ELEMENTS.staticOutput4]: {
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
  },
};
