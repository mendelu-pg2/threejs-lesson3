import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export default class Cube {

    constructor() {
        let geometry1 = new THREE.CubeGeometry(1,1,1);
        let material1 = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5, side: THREE.DoubleSide});
        this.object = new THREE.Mesh( geometry1, material1 );

        this.object.position.y = 0.5;
    }

}
