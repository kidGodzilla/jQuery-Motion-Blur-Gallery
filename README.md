# jQuery-Motion-Blur-Gallery
A jQuery image gallery utilizing an SVG motion-blur transition

# What does it do?

jQuery Motion Blur Gallery is a simple carousel utilizing the motion blur effect.


# What is *motion blur?*

Motion blur is the apparent streaking of rapidly moving objects in a still image or a sequence of images such as a movie or animation. It results when the image being recorded changes during the recording of a single frame, either due to rapid movement or long exposure.


# Demo

http://kidgodzilla.github.io/jQuery-Motion-Blur-Gallery


# Supported Browsers

Currently, this effect is only supported by *Google Chrome*.


# Usage

1. Include `motion-blur-gallery.css`, `jQuery`, `tweenMax.min.js` (from the GreenSock animation library), & `jquery.motion-blur-gallery.js` in your project. These files are all included in this repository.

2. Add your images to your page, nested inside an unordered list. For example:

        <div class="motion-blur-gallery">
        	<ul>
        		<li><img src="img/1.jpg"></li>
        		<li><img src="img/2.jpg"></li>
        		<li><img src="img/3.jpg"></li>
        		<li><img src="img/4.jpg"></li>
        		<li><img src="img/5.jpg"></li>
        		<li><img src="img/6.jpg"></li>
        		<li><img src="img/7.jpg"></li>
        		<li><img src="img/8.jpg"></li>
        		<li><img src="img/9.jpg"></li>
        	</ul>
        </div>

3. Call the plugin. For example:

        <script>
        	$(document).ready(function () {
        		$('.motion-blur-gallery').motionBlurGallery();
        	});
        </script>


# Credits

Plugin based on [this article](http://tympanus.net/codrops/?p=23824) by Lucas Bebber.

Images in this demo courtesy of *Joshua Earle*, http://www.joshuaearlephotography.com.