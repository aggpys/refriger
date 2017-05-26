/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

/**
 * Represents a dynamic plane 3D object.
 * @param texture A dynamic plane texture.
 * @param params An object that contains dynamic plane parameters.
 */
var DynamicPlane = function(texture, params) {

    Plane.apply(this, arguments);

    this.restartPosition = params.restartPosition !== undefined ? params.restartPosition : new THREE.Vector3(0, 0, 0);
    this.velocity = this.randomizeVelocity();
    this.lifeTime = params.lifeTime !== undefined ? params.lifeTime : 100;
    this.birthTime = undefined; // First render time.

    this.dynamicValue = new THREE.Vector3(0, 0, 0);

};

DynamicPlane.prototype = Object.create(Plane.prototype);
DynamicPlane.prototype.constructor = DynamicPlane;

Object.assign(DynamicPlane.prototype, {

    randomizeVelocity: function() {

        return new THREE.Vector3(
            (Math.random() - 0.5) / 10,
            (Math.random() - 0.5) / 10,
            (Math.random() - 0.5) / 10
        );

    },

    update: function(delta, elapsedTime) {

        if (this.birthTime === undefined)
            this.birthTime = elapsedTime;

        reset = elapsedTime - this.birthTime > this.lifeTime;

        if (!reset)
            Plane.prototype.update.apply(this, arguments);
        else {
            
            this.mesh.material.opacity -= this.fadeSpeed * delta;

            if (this.mesh.material.opacity <= 0) {

                this.mesh.material.opacity = 0;
                this.mesh.position.copy(this.restartPosition);
                this.birthTime = elapsedTime;
                this.velocity = this.randomizeVelocity();

            }

        }

        this.mesh.position.add(this.velocity);
        this.mesh.rotation.z += this.velocity.z;

    }

});