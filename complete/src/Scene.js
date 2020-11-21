import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import ARController from "./ARController";

export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.ar = new ARController(this.scene, this.camera, this.renderer);
    }

    animate(time) {
        requestAnimationFrame(time => this.animate(time));
        this.ar.update();
        TWEEN.update(time);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        this.animate();
    }

}
