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
 * Scrolling event handler: toggles the menu logotype visibility,
 * rewrites the mobile top title while scrolling.
 */
$(document).on('scroll', function() {

    var h = $('header').height() + $('header').offset().top/2;
    
    // This code is actual for the mobile view only (top title rewriting).
    if ($(window).width() < 768) {
        var screenTop = $(window).scrollTop();
        var screenHeight = $(window).height();

        $('header,section').each(function(i, e) {
            
            var delta = $(e).offset().top - screenTop;
            if (delta < screenHeight / 2) {
                $('#section-title').html($(e).data('title'));
                return;
            }
        });
    }

    $('#brand-logo').toggleClass('visible', document.body.scrollTop >= h);

});

/**
 * Document ready event handler: inserts the e-mail, rewrites the copyright string.
 */
$(document).ready(function() {

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
    $('.tooltip-word').tooltip();

    gl_start();
    gc.reset();

    lightGallery(document.getElementById('photos'));

});

/**
 * Button click common event handler: scrolls to the target.
 */
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

$('.object-details').click(function(e) {

    if (!$(this).hasClass('expanded'))
        $('.object-details').removeClass('expanded');

    $(this).toggleClass('expanded');

    var eh = $(this).outerHeight();
    var et = $(this).offset().top;

    var scrollValue = et - window.innerHeight/2 + eh/2;

    $('html, body').animate({
        scrollTop: scrollValue
    }, 400);
});

$('.more-button').click(function(e) {

    var collection = $('.more-hidden');
    var rowHeight = collection.first().outerHeight();

    collection.first().removeClass('more-hidden');
    
    if (window.scrollY + window.innerHeight - rowHeight < $(this).offset().top) 
        $('html, body').animate({
            scrollTop: $(this).offset().top - window.innerHeight + 2*$(this).outerHeight()
        }, 400);

    if (collection.length <= 1) {
        $(this).hide();
    }

});