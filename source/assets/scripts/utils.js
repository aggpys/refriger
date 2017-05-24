/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

$(document).on('click', 'a', function(event) {

    var id = $.attr(this, 'href');
    var scrollValue = 0;

    if (id.startsWith('#') && id.length > 1)
        scrollValue = $(id).offset().top

    event.preventDefault();

    $('html, body').animate({
        scrollTop: scrollValue
    }, 445);

});

$(document).on('scroll', function() {

    var h = $('header').height() + $('header').offset().top;

    $('#brand-logo').toggleClass('visible', document.body.scrollTop > h);

});