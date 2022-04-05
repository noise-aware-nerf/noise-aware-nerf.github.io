// const {bulmaSlider} = require("./bulma-slider");
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


document.onready = function() {
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

    document.getElementById('interpolation-slider').oninput = function(event) {
      setInterpolationImage(this.value);
    };
	setInterpolationImage(0);

    document.getElementById('interpolation-slider').prop = NUM_INTERP_FRAMES - 1;

    bulmaSlider.attach();

}


//document.onkeydown = function(event) {
function keyHandlerReal(event) {
	var key_code = event.keyCode;

	element = document.getElementById('viewer');

	switch( key_code ) {
	// case 48: // 0
	// 	replaceImage(img0,viewer);
	// 	break;
	case 49: // 1
		replaceImage(dark,viewer);
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


function keyHandlerSyn(event) {
	let key_code = event.keyCode;

	switch( key_code ) {
		// case 48: // 0
		// 	replaceImage(img0,viewer);
		// 	break;
		case 49: // 1
			replaceImage(noisy,main_syn);
			break;
		case 50: // 2
			replaceImage(gt,main_syn);
			break;
		case 51: // 3
			replaceImage(avg,main_syn);
			break;
		case 52: // 4
			replaceImage(bpn,main_syn);
			break;
		case 53: // 5
			replaceImage(deeprep,main_syn);
			break;
		case 54: // 6
			replaceImage(ibrnetn,main_syn);
			break;
		case 55: // 7
			replaceImage(nan,main_syn);
			break;
	}
}


function replaceImage(newimage,image)
{
	image.src               = newimage.src;
	image.parentNode.href   = newimage.src;
	image.style.borderColor = newimage.style.borderColor;

	// swap new image in for zoom

	// var ez = $('#'+image.id).data('elevateZoom');
	// let ez = document.getElementById(image.id).data('elevateZoom');12
	// ez.swaptheimage(newimage.src,newimage.src);
}


function setBorderReal(image)
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

function SynColors(id)
{
	if(id === "bpn")
	{
		return '#023047';
	}
	else if(id === "deeprep")
	{
		return '#126782';
	}
	else if(id === "ibrnetn")
	{
		return '#219EBC';
	}

	else if(id === "nan")
	{
		return '#8ECAE6';
	}
	else if(id === "noisy")
	{
		return '#FFB703';
	}
	else if(id === "gt")
	{
		return '#FD9E02';
	}
	else if(id === "avg")
	{
		return '#FB8500';
	}
}
function setBorderSyn(image)
{
	console.log("setBorderSyn " + image.id)
	image.style.borderColor = SynColors(image.id);
}
