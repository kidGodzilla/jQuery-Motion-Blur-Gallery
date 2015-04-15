# jQuery-Motion-Blur-Gallery
A jQuery image gallery utilizing an SVG motion-blur transition

# What does it do?

# Demo

# Supported Browsers

Currently, this effect is only supported by *Google Chrome*.

# Usage

1. Include `motion-blur-gallery.css`, `jQuery`, `tweenMax.min.js` (from the GreenSock animation library), & `jquery.motion-blur-gallery.js` in your project. These files are all included in this repository.

2. Add your images to your page, nested inside an unordered list. For example:

        <div class="motion-blur-gallery">
        	<ul>
        		<li><img src="img/1.jpg" alt="img01"></li>
        		<li><img src="img/2.jpg" alt="img02"></li>
        		<li><img src="img/3.jpg" alt="img03"></li>
        		<li><img src="img/4.jpg" alt="img04"></li>
        		<li><img src="img/5.jpg" alt="img05"></li>
        		<li><img src="img/6.jpg" alt="img06"></li>
        		<li><img src="img/7.jpg" alt="img07"></li>
        		<li><img src="img/8.jpg" alt="img08"></li>
        		<li><img src="img/9.jpg" alt="img09"></li>
        	</ul>
        </div>

3. Call the plugin. For example:

        <script>
        	$(document).ready(function () {
        		$('.motion-blur-gallery').motionBlurGallery();
        	});
        </script>

# Credits

This plugin was created by James Futhey, based on [this article on Codrops](http://tympanus.net/codrops/?p=23824) by Lucas Bebber.

Images in this demo courtesy of *Joshua Earle*, http://www.joshuaearlephotography.com.