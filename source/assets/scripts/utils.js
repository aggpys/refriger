/**
 * Copyright © 2017 Aleksey Grigoriev <aggpys@live.com>. All rights reserved.
 * Licensed under the MIT License. See LICENSE file for full license information.
 */

/**
 * Click on link (anchor) event handler: if anchor was clicked, animates scrolling to the target.
 */
$(document).on('click', 'a', function(event) {

    var id = $.attr(this, 'href');
    var scrollValue = 0;

    if (id !== undefined && id.startsWith('#') && id.length > 1) {
        scrollValue = $(id).offset().top;
    } else if (!id.startsWith('#'))
        return;
    
    event.preventDefault();

    $('html, body').animate({
        scrollTop: scrollValue
    }, 400, function() {
        window.location.hash = id;
    });

});

/**
 * Scrolling event handler: toggles the menu logotype visibility. 
 */
$(document).on('scroll', function() {

    var h = $('header').height() + $('header').offset().top/2;

    $('#brand-logo').toggleClass('visible', document.body.scrollTop >= h);

});

$(document).ready(function() {

    $('.photo-preview').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        fade: true
    });

    var yearSpan = $('#year');
    var currentYear = new Date().getFullYear();
    var pageYear = parseInt(yearSpan.html());

    if (pageYear < currentYear)
        $('#year').append(" ‒ " + currentYear);

    var mailSpan = $('#sm');

    var mailAnchor = document.createElement('a');

    mailAnchor.href = "mailto:info@refriger.ru";
    mailAnchor.innerHTML = "info@refriger.ru";

    mailSpan.html(mailAnchor);

});

$('.job-title').click(function() {

    $(this).parent().children('.job-details').toggleClass('collapsed');

});

$('button').click(function(){

    var id = $(this).data('href');
    if (id === undefined) return;

    var targetOffset = $(id).offset();
    if (targetOffset === undefined) return;

    var scrollValue = targetOffset.top;
    
    $('html, body').animate({
        scrollTop: scrollValue
    }, 400, function() {
        window.location.hash = id;
    });
});