/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

//= context.js
//= loader.js
//= plane.js
//= background.js
//= utils.js

/**
 * This function starts the WebGL rendering process:
 *  - initializes graphics context;
 *  - downloads the scene resources;
 *  - starts the animation cycle.
 */
(function () {

    if (!Modernizr.webgl) return; // Do nothing, if the WebGL is not supported by the current browser.

    var tm = new TextureManager('./assets/images/scenes/default');

    var gc = new GraphicsContext('header', {

        colors: {
            clear: 0xffffff,
            light: 0xffffff,
            ambient: 0x0099cc
        },

        camera: {
            position: new THREE.Vector3(0, 0, 1000),
            fov: 75
        }

    });

    tm.add('background', 'background.jpg');
    tm.load(function(manager) {

        var scene = {

            background: new Background(manager.get('background'))

        }

        gc.add(scene.background);

    });

    gc.animate();

})();