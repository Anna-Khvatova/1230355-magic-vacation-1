// import * as THREE from 'three';

export function degreesToRadians(angle) {
  return (angle * Math.PI) / 180;
}

// const getLathePoints = (widht, thickness, radius) => {
//   const points = [];

//   for (let i = radius; i <= radius + widht; i++) {
//     for (let j = 1; j <= thickness; j++) {
//       points.push(new THREE.Vector2(i, j));
//     }
//   }

//   return points;
// };

// const getLatheDegrees = (degStart, degEnd) => {
//   const start = THREE.MathUtils.degToRad(degStart);
//   const length = THREE.MathUtils.degToRad(degEnd - degStart);

//   return {start, length};
// };

// export {getLathePoints, getLatheDegrees};
