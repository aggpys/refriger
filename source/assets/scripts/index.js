/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

//= context.js
//= utils.js

(function () {

    var gc = new GraphicsContext('header', {

        colors: {
            clear: 0xffffff,
            light: 0xffffff,
            ambient: 0x0099cc
        },
        camfow: 80,
        campos: new THREE.Vector3(0, 0, 1000)

    });

    gc.animate();

})();