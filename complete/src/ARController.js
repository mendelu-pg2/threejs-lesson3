import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Cube from "./Cube";

export default class ARController {

    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.cube1 = null;
        this.cube2 = null;

        this.rayCaster = new THREE.Raycaster();

        this.initAr();
        this.initMarkers();
    }

    initAr() {
        this.arToolkitSource = new THREEx.ArToolkitSource({
            sourceType: 'webcam',
        });

        this.arToolkitSource.init(() => {
            setTimeout(() => this.onResize(), 1000);
        });

        window.addEventListener('resize', () => {
            this.onResize();
        });

        this.arToolkitContext = new THREEx.ArToolkitContext({
            cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
            detectionMode: 'mono',
        });

        this.arToolkitContext.init(() => {
            this.camera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix());
        });
    }

    initMarkers() {
        this.markerRoot1 = new THREE.Group();
        this.scene.add(this.markerRoot1);
        let markerControls1 = new THREEx.ArMarkerControls(this.arToolkitContext, this.markerRoot1, {
            type: 'pattern', patternUrl: THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
        });
        this.cube1 = new Cube(this.markerRoot1, 'red');

        this.markerRoot2 = new THREE.Group();
        this.scene.add(this.markerRoot2);
        let markerControls2 = new THREEx.ArMarkerControls(this.arToolkitContext, this.markerRoot2, {
            type: 'pattern', patternUrl: THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
        });
        this.cube2 = new Cube(this.markerRoot2, 'green');
    }

    update() {
        if( this.arToolkitSource.ready !== false ) {
            this.arToolkitContext.update(this.arToolkitSource.domElement);
        }
    }

    onResize() {
        this.arToolkitSource.onResize();
        this.arToolkitSource.copySizeTo(this.renderer.domElement);
        if (this.arToolkitContext.arController !== null) {
            this.arToolkitSource.copySizeTo(this.arToolkitContext.arController.canvas);
        }
    }

    detectCollision() {
        const origin = new THREE.Vector3(
            this.markerRoot1.position.x + this.cube1.object.position.x,
            this.markerRoot1.position.y - this.cube1.object.position.z,
            this.markerRoot1.position.z + this.cube1.object.position.y,
        );
        const direction = new THREE.Vector3(0, -1, 0);

        this.rayCaster.set(origin, direction);
        const intersects = this.rayCaster.intersectObject(this.cube2.object);

        if (intersects.length > 0) {
            const distance = intersects[0].distance;
            console.log(distance);

            if (distance <= 1) {
                alert("WIN!");
            }
        }

        const arrowHelper = new THREE.ArrowHelper(direction, origin, 1, 0xffff00); // optional
        this.scene.add(arrowHelper); // optional
    }

    jump() {
        let position = {
            x: this.cube1.object.position.x,
            y: this.cube1.object.position.y,
            z: this.cube1.object.position.z
        };

        const tween = new TWEEN.Tween(position)
            .to({
                x: [this.cube1.object.position.x, this.cube1.object.position.x - 1.2],
                y: [this.cube1.object.position.y, this.cube1.object.position.y],
                z: [this.cube1.object.position.z - 5, this.cube1.object.position.z]
            })
            .interpolation(TWEEN.Interpolation.Bezier)
            .onUpdate(() => {
                this.cube1.object.position.x = position.x;
                this.cube1.object.position.y = position.y;
                this.cube1.object.position.z = position.z;
                this.detectCollision();
            })
            .start();
    }
}
