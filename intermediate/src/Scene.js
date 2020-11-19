import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Collisions from './Collisions';
import {AR} from "./AR";

export default class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.collisions = new Collisions(this.scene);
        this.ar = new AR(this.scene, this.camera, this.renderer);
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
