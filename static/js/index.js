window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "https://storage.googleapis.com/nerfies-public/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})


//document.onkeydown = function(event) {
function keyHandler(event) {
	var key_code = event.keyCode;

	element = document.getElementById('viewer');

	switch( key_code ) {
	// case 48: // 0
	// 	replaceImage(img0,viewer);
	// 	break;
	case 49: // 1
		replaceImage(black,viewer);
		break;
	case 50: // 2
		replaceImage(pre,viewer);
		break;
	case 51: // 3
		replaceImage(avg,viewer);
		break;
	case 52: // 4
		replaceImage(bpn,viewer);
		break;
	case 53: // 5
		replaceImage(deeprep,viewer);
		break;
	case 54: // 6
		replaceImage(nan,viewer);
		break;
	}
}

function replaceImage(newimage,image)
{
	image.src               = newimage.src;
	image.parentNode.href   = newimage.src;
	image.style.borderColor = newimage.style.borderColor;

	// swap new image in for zoom
	var ez = $('#'+image.id).data('elevateZoom');
	ez.swaptheimage(newimage.src,newimage.src);
}


function setBorder(image)
{
	if(image.id === "black")
	{
		image.style.borderColor='#000000';
	}
	else if(image.id === "pre")
	{
		image.style.borderColor='#3388FF';
	}
	else if(image.id === "avg")
	{
		image.style.borderColor='#2244AA';
	}
	else if(image.id === "bpn")
	{
		image.style.borderColor='#FFDD00';
	}
	else if(image.id === "deeprep")
	{
		image.style.borderColor='#CC5C00';
	}
	else if(image.id === "nan")
	{
		image.style.borderColor='#009933';
	}
}