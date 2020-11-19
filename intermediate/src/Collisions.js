import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

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
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube1 = new THREE.Mesh( geometry, this.basicMaterial );
        this.scene.add( this.cube1 );

        this.cube1.position.set(0, 3, 0);

        const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
        this.basicMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        this.cube2 = new THREE.Mesh( geometry2, this.basicMaterial );
        this.scene.add( this.cube2 );

        this.cube2.position.set(0, 0, 0);
    }

    detectCollision() {
        const positionCopy = this.cube1.position.clone();
        positionCopy.y -= this.cube1.scale.y / 2;
        const direction = new THREE.Vector3(0, -1, 0);

        this.rayCaster.set(positionCopy, direction);
        const collisions = this.rayCaster.intersectObject(this.cube2);

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
        let position = {y: this.cube1.position.y};
        const tween = new TWEEN.Tween(position)
            .to({y: 0.5}, 2000)
            .onUpdate(() => {
                this.cube1.position.y = position.y;
                this.detectCollision();
            })
            .start();
    }

}
