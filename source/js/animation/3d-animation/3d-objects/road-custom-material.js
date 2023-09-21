import * as THREE from 'three';
import {color3D} from '../../../helpers/3d-data';

export class RoadCustomMaterial extends THREE.MeshStandardMaterial {
  onBeforeCompile(shader) {
    shader.uniforms = {
      ...shader.uniforms,
      roadColor: new THREE.Uniform(
          new THREE.Color(color3D.Grey)
      ),
      stripesColor: new THREE.Uniform(
          new THREE.Color(color3D.White)
      ),
    };

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_pars_vertex>`,
        `varying vec2 vUv;`
    );

    shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_vertex>`,
        `vUv = uv;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `varying vec3 vViewPosition;`,
        `varying vec3 vViewPosition;
        varying vec2 vUv;
        uniform vec3 roadColor;
        uniform vec3 stripesColor;`
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <map_fragment>`,
        `float strength = step(0.96, mod(vUv.y + 0.6, 1.0));
      strength *= step(0.6, mod(vUv.x * 4.0 + 0.4, 1.0));
      vec3 color = strength < 0.5 ? roadColor : stripesColor;
      diffuseColor = vec4(color, vUv);`
    );
  }
}
