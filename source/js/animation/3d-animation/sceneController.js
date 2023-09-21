// import * as THREE from 'three';
import {scene} from './initAnimationScreen';
import {SvgLoader} from "./svg-objects/svg-insert";
import {EXTRUDE_SETTINGS, SVG_ELEMENTS} from '../../helpers/constants';
import {MainPageComposition} from './scene-intro';
import {MaterialCreator} from './material-creator';
import {ExtrudeSvgCreator} from './svg-objects/extrude-svg';
import {ObjectsCreator} from '../../helpers/3d-object-creator';
import {TransformationGuiHelper} from '../../helpers/transformation-gui-helper';
import {PageSceneCreator} from './page-scene-creator';
import {degreesToRadians} from '../../helpers/utils';
import {RoomsPageScene} from './rooms/rooms-scene';
import {LatheGeometryCreator} from './lathe-geometry';


const materialCreator = new MaterialCreator();
const latheGeometryCreator = new LatheGeometryCreator();
const svgShapeLoader = new SvgLoader(SVG_ELEMENTS);
const extrudeSvgCreator = new ExtrudeSvgCreator(
    svgShapeLoader,
    EXTRUDE_SETTINGS
);
const objectCreator = new ObjectsCreator();
const transformationGuiHelper = new TransformationGuiHelper();
const pageSceneCreator = new PageSceneCreator(
    materialCreator,
    extrudeSvgCreator,
    objectCreator,
    latheGeometryCreator,
    transformationGuiHelper
);

export const sceneController = {
  clearScene() {
    scene.clearScene();
  },

  addMainPageComposition() {
    const mainPageComposition = new MainPageComposition(pageSceneCreator);
    scene.addSceneObject(mainPageComposition);
  },

  addRoomsPageComposition() {
    const positionZ = 2550;
    const positionY = 700;

    scene.camera.position.set(0, positionY, positionZ);

    scene.controls.target.set(
        0,
        positionY - positionZ * Math.tan(degreesToRadians(15)),
        0
    );

    const roomsComposition = new RoomsPageScene(pageSceneCreator);

    roomsComposition.rotateY(-Math.PI / 4);
    roomsComposition.rotateY(-Math.PI / 2);
    roomsComposition.rotateY(-Math.PI / 2);

    scene.addSceneObject(roomsComposition);
    scene.addTransformationsToLoop([()=>{
      roomsComposition.rotateY(-0.003);
    }]);
  },

  addScreenMesh() {
    this.addRoomsPageComposition();
  },
};
