/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

/**
 * Represents the scene graphics context.
 * @param container The selector (class, identifier, tag name, JavaScript object, etc.) of parent DOM element for the canvas.
 * @param params An object that contains context parameters, such as lights colors and camera settings.
 */
var GraphicsContext = function(container, params) {

    this.domParent = $(container);
    
    params = params || {};

    if (params.camera === undefined)
        params.camera = {};

    var colors = params.colors !== undefined ? params.colors : {

        clear: 0,
        light: 0xffffff,
        ambient: undefined

    };

    var light = new THREE.DirectionalLight(colors.light, 0.5);
    light.position.set(-1, 0, 1);

    var campos = params.camera.position !== undefined ? params.camera.position : new THREE.Vector3(0, 0, 0);
    var camfov = params.camera.fov !== undefined ? params.camera.fov : 80;

    var width = this.domParent.innerWidth();
    var height= this.domParent.innerHeight();
    var ratio = width/height;

    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(camfov, ratio, 1, 10000);
    this.camera.position.copy(campos);

    if (colors.ambient !== undefined)
    {

        var ambient = new THREE.AmbientLight(colors.ambient, 0.5);
        this.scene.add(ambient);

    }

    this.renderer.setSize(width, height);
    this.renderer.setClearColor(colors.clear);
    this.scene.add(light);
    this.scene.add(this.camera);

    this.domParent.append(this.renderer.domElement);

    $(window).resize(function() {

        var width = this.domParent.innerWidth();
        var height = this.domParent.innerHeight();
        this.renderer.setSize(width, height);
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();

    }.bind(this));

};

Object.assign(GraphicsContext.prototype, {

    animate: function() {

        var d = this.clock.getDelta();
        var e = this.clock.getElapsedTime();

        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);

    }

});