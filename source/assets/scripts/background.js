/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

/**
 * Represents the adjustable background plane.
 * @param texture Background texture.
 * @param params An object that contains background plane parameters.
 */
var Background = function(texture, params) {

    Plane.apply(this, arguments);
    $(window).resize(this.adjust.bind(this));

};

Background.prototype = Object.create(Plane.prototype);
Background.prototype.constructor = Background;

Object.assign(Background.prototype, {

    adjust: function() {

        var width = this.mesh.geometry.parameters.width;
        var height = this.mesh.geometry.parameters.height;
        var ratio = this.context.domParent.innerWidth() / this.context.domParent.innerHeight();
        var vfov = this.context.camera.fov * (Math.PI / 180);
        var distance = this.mesh.position.distanceTo(this.context.camera.position);
        var scaleX = 1;
        var scaleY = 1;
        var visibleHeight = 2 * Math.tan(vfov / 2) * distance;
        var visibleWidth = ratio * visibleHeight;

        if (height < visibleHeight)
            scaleY = visibleHeight / height;

        if (width < visibleWidth)
            scaleX = visibleWidth / width;
        
        var scale = scaleX > scaleY ? scaleX : scaleY;

        this.mesh.scale.x = scale;
        this.mesh.scale.y = scale;

    },

    setContext: function(context) {

        Plane.prototype.setContext.apply(this, arguments);
        this.adjust();

    }

});