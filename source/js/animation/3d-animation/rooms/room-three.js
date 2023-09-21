import {RoomScene} from './room';
import * as THREE from 'three';
import {MATERIAL_TYPE, OBJECT_ELEMENTS} from "../../../helpers/constants";
import {MaterialCreator} from "../material-creator";
import {Snowman} from "../3d-objects/snowman";
import {Road} from "../3d-objects/road";
import {degreesToRadians} from "../../../helpers/utils";

export class RoomThreeScene extends RoomScene {
  constructor(pageSceneCreator) {
    super(pageSceneCreator);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.SkyLightBlue,
            side: THREE.DoubleSide,
          }
      ),
    };
    this.floor = {
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.MountainBlue,
          }
      ),
    };
    this.staticOutput = {
      name: OBJECT_ELEMENTS.staticOutput3,
    };

    this.constructChildren();
  }

  constructChildren() {
    super.constructChildren();

    this.addSnowman();
    this.addRoad();
    this.addRoadBlocks();
  }

  addSnowman() {
    const snowman = new Snowman(this.pageSceneCreator.materialCreator);
    const transform = {
      transformX: 210,
      transformY: 220,
      transformZ: 400,
      rotateY: Math.PI / 16,
      scale: 1,
    };

    this.pageSceneCreator.setTransformParams(snowman, transform);

    this.addObject(snowman);
  }

  addRoad() {
    const road = new Road(this.pageSceneCreator);

    this.addObject(road);
  }

  addRoadBlocks() {
    const geometry = new THREE.CylinderGeometry(12, 12, 80, 20);

    const radius = 700;
    const cylindersAmount = 5;
    const angleBetweenBlocks = degreesToRadians(15);

    const outerAngle = Math.PI / 2 - angleBetweenBlocks * cylindersAmount;

    const cylinder = new THREE.Mesh(
        geometry,
        this.pageSceneCreator.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.Grey,
        })
    );

    new Array(cylindersAmount)
      .fill(0)
      .map((_, index) => outerAngle + index * angleBetweenBlocks)
      .forEach((angle) => {
        const clone = cylinder.clone();

        const transform = {
          transformX: radius * Math.cos(angle),
          transformY: 40,
          transformZ: radius * Math.sin(angle),
        };

        this.pageSceneCreator.setTransformParams(clone, transform);

        this.addObject(clone);
      });
  }
}
