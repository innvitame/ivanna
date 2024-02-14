var mr_firstSectionHeight,
    mr_scrollTop = 0;
   
      

$(document).ready(function() {
    "use strict";

    // Smooth scroll to inner links
    $('.inner-link').each(function(){
        var href = $(this).attr('href');
        if(href.charAt(0) !== "#"){
            $(this).removeClass('inner-link');
        }
    });

	if($('.inner-link').length){
		$('.inner-link').smoothScroll({
			offset: -50,
			speed: 750
		});
    }

    // Update scroll variable for scrolling functions
    addEventListener('scroll', function() {
        mr_scrollTop = window.pageYOffset;
    }, false);

    // Append .background-image-holder <img>'s as CSS backgrounds
    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });

    // Fade in background images
    setTimeout(function() {
        $('.background-image-holder').each(function() {
            $(this).addClass('fadeIn');
        });
    }, 200);



    // Offscreen Nav
    if($('.offscreen-toggle').length){
    	$('body').addClass('has-offscreen-nav');
    }
    else{
        $('body').removeClass('has-offscreen-nav');
    }

    $('.offscreen-toggle').click(function(){
    	$('.main-container').toggleClass('reveal-nav');
    	$('nav').toggleClass('reveal-nav');
    	$('.offscreen-container').toggleClass('reveal-nav');
    });

    $('.main-container').click(function(){
    	if($(this).hasClass('reveal-nav')){
    		$(this).removeClass('reveal-nav');
    		$('.offscreen-container').removeClass('reveal-nav');
    		$('nav').removeClass('reveal-nav');
    	}
    });

    $('.offscreen-container a').click(function(){
    	$('.offscreen-container').removeClass('reveal-nav');
    	$('.main-container').removeClass('reveal-nav');
    	$('nav').removeClass('reveal-nav');
    });


    // Instagram Feed
    if($('.instafeed').length){
    	jQuery.fn.spectragram.accessData = {
			//accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
			//clientID: 'fedaafacf224447e8aef74872d3820a1'
		};
    }

    $('.instafeed').each(function() {
    	var feedID = $(this).attr('data-user-name') + '-';
        $(this).children('ul').spectragram('getUserFeed', {
            query: feedID,
            max: 12
        });
    });

    // Image Sliders
    $('.slider-all-controls').flexslider({
        start: function(slider){
            if(slider.find('.slides li:first-child').find('.fs-vid-background video').length){
               slider.find('.slides li:first-child').find('.fs-vid-background video').get(0).play();
            }
        },
        after: function(slider){
            if(slider.find('.fs-vid-background video').length){
                if(slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').length){
                    slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').get(0).pause();
                }
                if(slider.find('.flex-active-slide').find('.fs-vid-background video').length){
                    slider.find('.flex-active-slide').find('.fs-vid-background video').get(0).play();
                }
            }
        }
    });
    $('.slider-paging-controls').flexslider({
        animation: "slide",
        directionNav: false
    });
    $('.slider-arrow-controls').flexslider({
        controlNav: false
    });
    $('.slider-thumb-controls .slides li').each(function() {
        var imgSrc = $(this).find('img').attr('src');
        $(this).attr('data-thumb', imgSrc);
    });
    $('.slider-thumb-controls').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        directionNav: true
    });
    $('.logo-carousel').flexslider({
        minItems: 1,
        maxItems: 4,
        move: 1,
        itemWidth: 200,
        itemMargin: 0,
        animation: "slide",
        slideshow: true,
        slideshowSpeed: 3000,
        directionNav: false,
        controlNav: false
    });

    // Lightbox

    var $gallery = $('.lightbox-grid li a').simpleLightbox( {'animationSpeed' : 150, 'animationSlide' : true, 'widthRatio' : 1 });

    // Multipurpose Modals






    $('.close-modal:not(.modal-strip .close-modal)').click(function(){
    	var modal = $(this).closest('.foundry_modal');
        modal.toggleClass('reveal-modal');
        if(typeof modal.attr('data-cookie') != "undefined"){
            mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }

        $('.modal-screen').toggleClass('reveal-modal');
    });

    $('.modal-screen').click(function(){
    	$('.foundry_modal.reveal-modal').toggleClass('reveal-modal');
    	$(this).toggleClass('reveal-modal');
    });

    $(document).keyup(function(e) {
		 if (e.keyCode == 27) { // escape key maps to keycode `27`
			$('.foundry_modal').removeClass('reveal-modal');
			$('.modal-screen').removeClass('reveal-modal');
		}
	});

    // Modal Strips

    $('.modal-strip').each(function(){
    	if(!$(this).find('.close-modal').length){
    		$(this).append($('<i class="ti-close close-modal">'));
    	}
    	var modal = $(this);

        if(typeof modal.attr('data-cookie') != "undefined"){

            if(!mr_cookies.hasItem(modal.attr('data-cookie'))){
            	setTimeout(function(){
            		modal.addClass('reveal-modal');
            	},1000);
            }
        }else{
            setTimeout(function(){
                    modal.addClass('reveal-modal');
            },1000);
        }
    });

    $('.modal-strip .close-modal').click(function(){
        var modal = $(this).closest('.modal-strip');
        if(typeof modal.attr('data-cookie') != "undefined"){
            mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }
    	$(this).closest('.modal-strip').removeClass('reveal-modal');
    	return false;
    });




    // Countdown Timers
    if ($('.countdown').length) {
        $('.countdown').each(function() {
            var date = $(this).attr('data-date');
            date = '2024/03/22 17:00:00';

            $(this).countdown(date, function(event) {
                $(this).text(
                    event.strftime('Faltan %-D días %H:%M:%S')
                );
            });
        });
    }



    // Disable parallax para mobile
    if ((/Android|iPhone|iPad|iPod|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('section').removeClass('parallax');
    }

});

$(window).load(function() {
    "use strict";

    mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);

});


/*\
|*|  COOKIE LIBRARY THANKS TO MDN
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * mr_cookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * mr_cookies.getItem(name)
|*|  * mr_cookies.removeItem(name[, path[, domain]])
|*|  * mr_cookies.hasItem(name)
|*|  * mr_cookies.keys()
|*|
\*/

var mr_cookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};


/*\
|*|  END COOKIE LIBRARY
\*/
