/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

/**
 * Represents the scene graphics context.
 */
var GraphicsContext = function(container, params) {

    this._parent = $(container);
    params = params || {};

    var colors = params.colors !== undefined ? params.colors : {

        clear: 0,
        light: 0xffffff,
        ambient: undefined

    };

    var light = new THREE.DirectionalLight(colors.light, 0.5);
    light.position.set(-1, 0, 1);

    var campos = params.campos !== undefined ? params.campos : new THREE.Vector3(0, 0, 0);
    var camfov = params.camfov !== undefined ? params.camfov : 80;
    
    var width = this._parent.innerWidth();
    var height= this._parent.innerHeight();
    var ratio = width/height;

    this._clock = new THREE.Clock();
    this._renderer = new THREE.WebGLRenderer();
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(camfov, ratio, 1, 10000);

    if (colors.ambient !== undefined)
    {

        var ambient = new THREE.AmbientLight(colors.ambient, 0.5);
        this._scene.add(ambient);

    }

    this._renderer.setSize(width, height);
    this._renderer.setClearColor(colors.clear);
    this._camera.position.copy(campos);

    this._scene.add(light);
    this._scene.add(this._camera);

    this._parent.append(this._renderer.domElement);

    $(window).resize(this._reset.bind(this));

};

Object.assign(GraphicsContext.prototype, {

    _reset: function() {

        var width = this._parent.innerWidth();
        var height = this._parent.innerHeight();
        this._renderer.setSize(width, height);
        this._camera.aspect = width/height;
        this._camera.updateProjectionMatrix();

    },

    _render: function() {

        this._renderer.render(this._scene, this._camera);

    },

    animate: function() {

        var d = this._clock.getDelta();
        var e = this._clock.getElapsedTime();

        requestAnimationFrame(this.animate.bind(this));
        this._render();

    }

});