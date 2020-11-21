import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export default class Cube {

    constructor(parent, color) {
        this.parent = parent;

        let geometry1 = new THREE.CubeGeometry(1, 1, 1);
        let material1 = new THREE.MeshBasicMaterial({transparent: true, opacity: 1, color: color});
        this.object = new THREE.Mesh( geometry1, material1 );

        this.object.position.y = 0.5;

        this.parent.add(this.object);
    }

}
