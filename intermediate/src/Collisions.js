import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Cube from "./Cube";

export default class Collisions {
    constructor(scene) {
        this.scene = scene;
        
        this.cube1 = null;
        this.cube2 = null;

        this.rayCaster = new THREE.Raycaster();

        this.initObjects();
        this.detectCollision();
    }

    initObjects() {
        this.cube1 = new Cube(this.scene, 'green');
        this.cube1.object.position.set(1, 1, -6);

        this.cube2 = new Cube(this.scene, 'red')
        this.cube2.object.position.set(-1, -1, -6);
    }

    detectCollision() {
        const positionCopy = this.cube1.object.position.clone();
        positionCopy.y -= this.cube1.object.scale.y / 2;
        const direction = new THREE.Vector3(0, -1, 0);

        this.rayCaster.set(positionCopy, direction);
        const collisions = this.rayCaster.intersectObject(this.cube2.object);

        if (collisions.length > 0) {
            const firstCollision = collisions[0];
            if (firstCollision.distance <= 0.05) {
                alert("Kolize");
            }
        }

        const rayHelper = new THREE.ArrowHelper(direction, positionCopy, 1, 0x00ffff);
        this.scene.add(rayHelper);
    }

    demoAnimation() {
        let position = {
            x: this.cube1.object.position.x, 
            y: this.cube1.object.position.y
        };
        const tween = new TWEEN.Tween(position)
            .to({x: -1, y: 0}, 2000)
            .onUpdate(() => {
                this.cube1.object.position.x = position.x;
                this.cube1.object.position.y = position.y;
                this.detectCollision();
            })
            .start();
    }

}
