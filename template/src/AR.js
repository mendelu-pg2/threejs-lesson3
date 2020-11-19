import * as THREE from "three";
import Cube from "./Cube";

export class AR {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.initAr();
        this.initObjects();
    }

    initAr() {
        this.arToolkitSource = new THREEx.ArToolkitSource({
            sourceType: 'webcam',
        });

        this.arToolkitSource.init(() => {
            this.onResize();
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

    initObjects() {
        this.markerRoot1 = new THREE.Group();
        this.scene.add(this.markerRoot1);

        const markerControls1 = new THREEx.ArMarkerControls(this.arToolkitContext, this.markerRoot1, {
            type: 'pattern', patternUrl: THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
        });

        this.cube1 = new Cube();
        this.markerRoot1.add( this.cube1.object );
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
}
