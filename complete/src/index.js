import Scene from './Scene';

let scene;

window.onload = () => {

    // init the scene
    
    scene = new Scene();
    scene.render();


    // connect HTML elements to JS code

    document.getElementById('jump').addEventListener('click', () => {
        scene.ar.jump();
    });
    
};
