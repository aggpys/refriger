/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

/**
 * Represents the simple plane (rectangle) 3D object.
 * @param texture A plane texture.
 * @param params An object that contains 3D object parameters.
 */
var Plane = function(texture, params) {

    params = params || {};

    var location = params.location !== undefined ? params.location : new THREE.Vector3(0, 0, 0);
    var textureWidth = texture !== undefined ? texture.image.width : 100;
    var textureHeight = texture !== undefined ? texture.image.height : 100;

    var geometry = new THREE.PlaneGeometry(

        params.width !== undefined ? params.width : textureWidth,
        params.height !== undefined ? params.height : textureHeight 

    );

    var material = new THREE.MeshBasicMaterial({

        transparent: params.transparent !== undefined ? params.transparent : true,
        opacity: 0,
        blending: params.blending !== undefined ? params.blending : THREE.NormalBlending,
        depthTest: true

    });

    if (texture !== undefined) {

        material.map = texture;
        material.map.needsUpdate = true;
        material.overdraw = 0.5;

    }

    this.opacity = params.opacity !== undefined ? params.opacity : 1.0;
    this.fadeSpeed = params.fadeSpeed !== undefined ? params.fadeSpeed : 1.0;
    this.delay = params.delay !== undefined ? params.delay : 0.0;
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.overdraw = true;
    this.mesh.position.copy(location);
    this.context = undefined;

};

Object.assign(Plane.prototype, {

    setContext: function(context) {

        if (context !== undefined)
            this.context = context;

    },

    update: function(delta, elapsedTime) {

        if (this.delay > elapsedTime) return;

        if (this.mesh.material.opacity < this.opacity) {

            this.mesh.material.opacity += this.fadeSpeed * delta;

            if (this.mesh.material.opacity > this.opacity)
                this.mesh.material.opacity = this.opacity;

        }

    }

});