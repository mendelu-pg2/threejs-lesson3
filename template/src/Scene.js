import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Cube from "./Cube";

export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.camera.position.x = 1;
        this.camera.position.y = 2;
        this.camera.position.z = 5;

        this.cube = new Cube();
        this.scene.add(this.cube.object);
    }

    animate(time) {
        requestAnimationFrame(time => this.animate(time));
        TWEEN.update(time);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        this.animate();
    }

}
