if ($.cookie("theme_csspath")) {
    $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
}

$(function () {

    animations();
    sliders();
    fullScreenContainer();
    utils();
    sliding();
    contactForm();
    map();
    counters();
    parallax();
    demo();
});

$(window).load(function () {
    windowWidth = $(window).width();
    $(this).alignElementsSameHeight();

    masonry();

});
$(window).resize(function () {

    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
	setTimeout(function () {
	    $(this).alignElementsSameHeight();
	    fullScreenContainer();
	    waypointsRefresh();
	}, 205);
	windowWidth = newWindowWidth;
    }

});


/* =========================================
 *  for demo purpose only - can be deleted 
 *  =======================================*/

function demo() {

    if ($.cookie("theme_csspath")) {
	$('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

	if ($(this).val !== '') {

	    var colour = $(this).val();
	    var introImage = $('body').find('#intro .item');

	    introImage.removeClass();
	    introImage.addClass('item');
	    introImage.addClass(colour);


	    var theme_csspath = 'css/style.' + $(this).val() + '.css';
	    $('link#theme-stylesheet').attr("href", theme_csspath);
	    $.cookie("theme_csspath", theme_csspath, {expires: 365, path: '/'});
	}

	return false;
    });
}

/* =========================================
 *  animations
 *  =======================================*/

function animations() {

    if (Modernizr.csstransitions) {

	delayTime = 0;
	$('[data-animate]').css({opacity: '0'});
	$('[data-animate]').waypoint(function (direction) {
	    delayTime += 150;
	    $(this).delay(delayTime).queue(function (next) {
		$(this).toggleClass('animated');
		$(this).toggleClass($(this).data('animate'));
		delayTime = 0;
		next();
		//$(this).removeClass('animated');
		//$(this).toggleClass($(this).data('animate'));
	    });
	},
		{
		    offset: '95%',
		    triggerOnce: true
		});
	$('[data-animate-hover]').hover(function () {
	    $(this).css({opacity: 1});
	    $(this).addClass('animated');
	    $(this).removeClass($(this).data('animate'));
	    $(this).addClass($(this).data('animate-hover'));
	}, function () {
	    $(this).removeClass('animated');
	    $(this).removeClass($(this).data('animate-hover'));
	});
    }

}

/* =========================================
 * sliding 
 *  =======================================*/

function sliding() {
    $('.scrollTo, #navigation a').click(function (event) {
	event.preventDefault();
	var full_url = this.href;
	var parts = full_url.split("#");
	var trgt = parts[1];

	$('html, body').stop().animate({scrollTop: jQuery('#'+trgt).offset().top - 80}, 1000);
	// $('body').scrollTo($('#' + trgt), 800, {offset: -80});

    });
}

/* =========================================
 * sliders 
 *  =======================================*/

function sliders() {
    if ($('.owl-carousel').length) {

	$(".customers").owlCarousel({
	    items: 6,
	    itemsDesktopSmall: [990, 4],
	    itemsTablet: [768, 2],
	    itemsMobile: [480, 1]
	});
	$(".testimonials").owlCarousel({
	    items: 4,
	    itemsDesktopSmall: [1170, 3],
	    itemsTablet: [970, 2],
	    itemsMobile: [750, 1]
	});
    }

}

/* =========================================
 * counters 
 *  =======================================*/

function counters() {

    $('.counter').counterUp({
	delay: 10,
	time: 1000
    });

}

/* =========================================
 * parallax 
 *  =======================================*/

function parallax() {

    $('.text-parallax').parallax("50%", 0.1);
    
}

/* =========================================
 *  masonry 
 *  =======================================*/

function masonry() {

    $('#references-masonry').css({visibility: 'visible'});

    $('#references-masonry').masonry({
	itemSelector: '.reference-item:not(.hidden)',
	isFitWidth: true,
	isResizable: true,
	isAnimated: true,
	animationOptions: {
	    duration: 200,
	    easing: 'linear',
	    queue: true
	},
	gutter: 30
    });
    scrollSpyRefresh();
    waypointsRefresh();
}

/* =========================================
 * filter 
 *  =======================================*/

$('#filter a').click(function (e) {
    e.preventDefault();



    $('#filter li').removeClass('active');
    $(this).parent('li').addClass('active');

    var categoryToFilter = $(this).attr('data-filter');

    $('.reference-item').each(function () {
	if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
	    $(this).removeClass('hidden');
	}
	else {
	    $(this).addClass('hidden');
	}
    });

    if ($('#detail').hasClass('open')) {
	closeReference();
    }
    else {
	$('#references-masonry').masonry('reloadItems').masonry('layout');

    }

    scrollSpyRefresh();
    waypointsRefresh();
});

/* =========================================
 *  open reference 
 *  =======================================*/

$('.reference-item').click(function (e) {
    e.preventDefault();

    var element = $(this);
    var title = element.find('.reference-title').text();
    var description = element.find('.reference-description').html();

    images = element.find('.reference-description').data('images').split(',');

    if (images.length > 0) {
	slider = '';
	for (var i = 0; i < images.length; ++i) {
	    slider = slider + '<div class="item"><img src=' + images[i] + ' alt="" class="img-responsive"></div>';
	}
    }
    else {
	slider = '';
    }



    $('#detail-title').text(title);
    $('#detail-content').html(description);
    $('#detail-slider').html(slider);

    openReference();

});

function openReference() {

    $('#detail').addClass('open');
    $('#references-masonry').animate({opacity: 0}, 300);
    $('#detail').animate({opacity: 1}, 300);

    setTimeout(function () {
	$('#detail').slideDown();
	$('#references-masonry').slideUp();

	if ($('#detail-slider').html() !== '') {

	    $('#detail-slider').owlCarousel({
		slideSpeed: 300,
		paginationSpeed: 400,
		autoPlay: true,
		stopOnHover: true,
		singleItem: true,
		afterInit: ''
	    });
	}
    }, 300);

    setTimeout(function () {
	$('body').scrollTo($('#detail'), 1000, {offset: -80});
    }, 500);

}

function closeReference() {

    $('#detail').removeClass('open');
    $('#detail').animate({'opacity': 0}, 300);

    setTimeout(function () {
	$('#detail').slideUp();
	$('#detail-slider').data('owlCarousel').destroy();
	$('#references-masonry').slideDown().animate({'opacity': 1}, 300).masonry('reloadItems').masonry();

    }, 300);

    setTimeout(function () {
	$('body').scrollTo($('#filter'), 1000, {offset: -110});
    }, 500);


    setTimeout(function () {
	$('#references-masonry').masonry('reloadItems').masonry();
    }, 800);

}

$('#detail .close').click(function () {
    closeReference(true);
})

/* =========================================
 * full screen intro 
 *  =======================================*/

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    var screenHeight = '';
    if ($(window).height() > 500) {
	screenHeight = $(window).height() + "px";
    }
    else {
	screenHeight = "500px";
    }


    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}

/* =========================================
 *  map 
 *  =======================================*/

function map() {

    var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
    map = new GMaps({
	el: '#map',
	lat: 33.725033,
	lng: -117.789831,
	zoomControl: true,
	zoomControlOpt: {
	    style: 'SMALL',
	    position: 'TOP_LEFT'
	},
	panControl: false,
	streetViewControl: false,
	mapTypeControl: false,
	overviewMapControl: false,
	scrollwheel: false,
	draggable: false,
	styles: styles
    });

    var image = 'img/marker.png';

    map.addMarker({
	lat: 33.725033,
	lng: -117.789831,
	icon: image/* ,
	 title: '',
	 infoWindow: {
	 content: '<p>HTML Content</p>'
	 }*/
    });
}

/* =========================================
 *  UTILS
 *  =======================================*/

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* external links in new window*/

    $('.external').on('click', function (e) {

	e.preventDefault();
	window.open($(this).attr("href"));
    });
    /* animated scrolling */

}

$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

	var maxHeight = 0;
	var children = $(this).find('.same-height');
	children.height('auto');
	if ($(window).width() > 768) {
	    children.each(function () {
		if ($(this).innerHeight() > maxHeight) {
		    maxHeight = $(this).innerHeight();
		}
	    });
	    children.innerHeight(maxHeight);
	}

	maxHeight = 0;
	children = $(this).find('.same-height-always');
	children.height('auto');
	children.each(function () {
	    if ($(this).height() > maxHeight) {
		maxHeight = $(this).innerHeight();
	    }
	});
	children.innerHeight(maxHeight);
    });
}

/* refresh scrollspy */
function scrollSpyRefresh() {
    setTimeout(function () {
	$('body').scrollspy('refresh');
    }, 1000);
}

/* refresh waypoints */
function waypointsRefresh() {
    setTimeout(function () {
	$.waypoints('refresh');
    }, 1000);
}

/* ajax contact form */

function contactForm() {
    $("#contact-form").submit(function () {
        $('input[type="submit"]').attr('disabled', 'disabled');

        $('.loadingVisible').removeClass('hideLoader');
	var url = "../mail_handler.php"; // the script where you handle the form input.

	$.ajax({
	    type: "POST",
	    url: url,
	    data: $(this).serialize(), // serializes the form's elements.
	    success: function (data) {
            $('.loadingVisible').addClass('hideLoader');
	    	$('.formSubmit').closest('form').find('input[type=text], textarea').val('');
	    	var messageAlert = 'alert-success';
			var messageText = 'Success, information was sent';
			var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
			if (messageAlert && messageText) {
				$('#contact-form').find('.messages').html(alertBox);
			}
	    },
		error: function(){
            $('.loadingVisible').addClass('hideLoader');
            $('input[type="submit"]').removeAttr('disabled');
            var messageAlert = 'alert-danger';
            var messageText = 'Failure, information was not sent';
            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            if (messageAlert && messageText) {
                $('#contact-form').find('.messages').html(alertBox);
            }
		}
	});
	return false; // avoid to execute the actual submit of the form.
    });
}


// additional functionality

$(document).on('click','.navbar-collapse.in',function(e) {
	console.log(e);
    if( $(e.target).is('a') && $(e.target).attr('class') != 'navbar-toggle' ) {
        $(this).collapse('hide');
    }
});

$(document).click(function (event) {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");
    var _opened = $navbar.hasClass("in");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $navbar.collapse('hide');
    }
});

var footerDate = (function() {
    var today = new Date(),
        year = today.getFullYear(),
        el = document.getElementById('date');
    el.innerHTML = year

}());

$(document).ready(function() {
    var email = 'mailto:';
    email += 'erik.';
    email += 'nuber@';
    email += 'yahoo.com';
    $("#forEmail").attr('href', email);
});

/*** validation ***/

$('input[name="name"]').blur(function() {
    var firstName = $('input[name="name"]').val();
    var messageText = 'Please enter your name.';
    if (firstName.length < 2 || !(/\S/.test(firstName)) || !(/^[a-z ,.'-]+$/i.test(firstName)) ) {
        $('.nameCheck').html(messageText);
        $('input[name=name]').css('border-color', '#e41919');
    } else {
        $('.nameCheck').html('');
        $('input[name=name]').css('border-color', 'none');
    }
});

$('input[name="surname"]').blur(function() {
    var lastName = $('input[name="surname"]').val();
    var messageText = 'Please enter your last name.';
    if (lastName.length < 2 || !(/\S/.test(lastName)) || !(/^[a-z ,.'-]+$/i.test(lastName)) ) {
        $('.lastNameCheck').html(messageText);
        $('input[name=surname]').css('border-color', '#e41919');
    } else {
        $('.lastNameCheck').html('');
        $('input[name=surname]').css('border-color', 'none');
    }
});

$('input[name="email"]').blur(function(){
	var isAlert = null;
    var email= $('input[name="email"]').val();
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        isAlert=true;
    } else {
        isAlert = false
	}
    var messageText = 'Please enter a valid email address.';
    if (isAlert) {
        $('input[name=email]').css('border-color', '#e41919');
        $('.emailCheck').html(messageText);
    } else {
        $('input[name=email]').css('border-color', 'none');
        $('.emailCheck').html('');
	}
});

$('input[name="phone"]').blur(function(){
	var phone = $('input[name="phone"]').val();
	var phoneExp = new RegExp(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/);
	var result = phoneExp.test(phone);
    var messageText = 'Please enter a valid phone number.';
    if (!result || !(/\S/.test(phone))) {
        $('.phoneCheck').html(messageText);
        $('input[name=phone]').css('border-color', '#e41919');
	} else {
        $('.phoneCheck').html('');
        $('input[name=phone]').css('border-color', 'none');
	}
});

$('textarea').blur(function() {
    var note = $('textarea').val();
    var messageText = 'Please enter at least 10 characters.';
    if (note.length < 10 || !(/\S/.test(note))) {
        $('.messageCheck').html(messageText);
        $('textarea').css('border-color', '#e41919');
    } else {
        $('.messageCheck').html('');
        $('textarea').css('border-color', 'none');
    }
});

(function() {
    $('.controls input[type=text], textarea').on('keyup blur', function() {
		var allClear = false;
        var empty = true;
        if ($('.nameCheck').html() === '' && $('.lastNameCheck').html() === '' && $('.phoneCheck').html() === '' &&
			$('.emailCheck').html()=== '' && $('.messageCheck').html() === '') {
            allClear = true;
		}
        $('.controls input[type=text], textarea').each(function() {
            if (($(this).val() !== '') && allClear) {
                empty = false;
            } else {
                empty = true;
            }
        });
        if (!empty) {
            $('input[type="submit"]').removeAttr('disabled');
        } else {
            $('input[type="submit"]').attr('disabled', 'disabled');
        }
    });
})();
