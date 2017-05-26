/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

/**
 * Represents the single texture resource.
 * @param name Resource name to set.
 * @param imageUri An URI of image to load.
 */
var TextureResource = function(name, imageUri) {

    this.name = name;
    this.imageUri = imageUri;
    this.texture = undefined;

};

/**
 * Represents the textures management object. 
 * @param assetsBase The assets root path.
 */
var TextureManager = function(assetsBase) {

    if (assetsBase === undefined)
        assetsBase = '/';
    else if (assetsBase.charAt(assetsBase.length - 1) !== '/')
		assetsBase = assetsBase.concat('/');

    this.assets = assetsBase;
    this.loader = new THREE.TextureLoader();
    this.textures = [];

};

Object.assign(TextureManager.prototype, {

    add: function(name, fileName) {

        this.textures.push(new TextureResource(name, this.assets + fileName));

    },

    get: function(name) {

        for (var i = 0; i < this.textures.length; i++) {

            if (this.textures[i].name === name)
                return this.textures[i].texture;

        }

    },

    load: function(callback) {

        if (this.textures.length == 0) {
            
            if (callback !== undefined) callback(this);
            return;

        }

        this.textures.forEach(function(element) {

            this.loader.load(element.imageUri, (function(texture) {

                texture.name = this.resource.name;
                texture.sourceFile = this.resource.imageUri;
                this.resource.texture = texture;

                for (var i = 0; i < this.loader.textures.length; i++) {
                    
                    if (this.loader.textures[i].texture === undefined)
                        return;

                }

                if (this.event !== undefined)
                    this.event(this.loader);

            }).bind({

                loader: this,
                resource: element,
                event: callback

            }));

        }, this);

    }

});