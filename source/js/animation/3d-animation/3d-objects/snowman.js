import * as THREE from 'three';
import {color3D, reflection3D} from '../../../helpers/3d-data';

export class Snowman extends THREE.Group {
  constructor() {
    super();
    this.colorSphere = color3D.White;
    this.metalnessSphere = reflection3D.strong.metalness;
    this.roughnessSphere = reflection3D.strong.roughness;
    this.colorCone = color3D.Orange;
    this.metalnessCone = reflection3D.soft.metalness;
    this.roughnessCone = reflection3D.soft.roughness;
    this.constructChildren();
  }

  constructChildren() {
    this.addTopSphere();
    this.addBottomSphere();
    this.addCone();
  }

  addTopSphere() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorSphere),
      metalness: this.metalnessSphere,
      roughness: this.roughnessSphere,
      emissive: 0x243452,
    });
    const geometry = new THREE.SphereGeometry(44, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  addBottomSphere() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorSphere),
      metalness: this.metalnessSphere,
      roughness: this.roughnessSphere,
      emissive: 0x243452,
    });
    const geometry = new THREE.SphereGeometry(78, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -108, 0);
    this.add(mesh);
  }

  addCone() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorCone),
      metalness: this.metalnessCone,
      roughness: this.roughnessCone
    });
    const geometry = new THREE.ConeGeometry(18, 75, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.copy(new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-90.0), `XYZ`));
    mesh.position.set(45, 0, 0);
    this.add(mesh);
  }
}
