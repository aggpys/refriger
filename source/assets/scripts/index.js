/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

//= context.js
//= loader.js
//= plane.js
//= dynamic.js
//= background.js
//= utils.js

var gc;

/**
 * This function starts the WebGL rendering process:
 *  - initializes graphics context;
 *  - downloads the scene resources;
 *  - starts the animation cycle.
 */
function gl_start() {

    if (!Modernizr.webgl) return; // Do nothing, if the WebGL is not supported by the current browser.

    var tm = new TextureManager('./assets/images/scenes/default');

    gc = new GraphicsContext('header', {

        colors: { clear: 0xffffff },

        camera: {
            position: new THREE.Vector3(0, 0, 1000),
            fov: 75
        }

    });

    tm.add('background', 'background.jpg');
    tm.add('particle-a', 'p1.png');
    tm.add('particle-b', 'p2.png');
    tm.load(function(manager) {

        var scene = {

            background: new Background(manager.get('background')),
            particles: []

        }

        for (var i = 0; i < 300; ++i) {

            var startPosition = new THREE.Vector3(
                Math.random() * 2048 - 1024,
                Math.random() * 1024 - 512,
                300 + Math.random() * 500
            );

            var particleType = Math.random() < 0.5 ? 'particle-a' : 'particle-b';
            var size = 6 + Math.random() * 6;

            var p = new DynamicPlane(manager.get(particleType), {

                opacity: 0.3 + Math.random() * 0.7,
                width: size,
                height: size,
                fadeSpeed: Math.random(),
                delay: Math.random(),
                restartPosition: startPosition,
                position: startPosition,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
                lifeTime: Math.random() * 150

            });

            scene.particles.push(p);

        }

        gc.add(scene.background);

        for (var j = 0; j < scene.particles.length; ++j)
            gc.add(scene.particles[j]);

    });

    gc.reset();
    gc.animate();

}