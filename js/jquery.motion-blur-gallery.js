;(function($) {
	$.fn.motionBlurGallery = function(args) {
		args = args || {};

		var lastPos = { x: 0 },
			galleryPos = { x: 0 },
			lastDragPos = { x: 0 },
			dragPos = { x: 0 },
			currentImage = -1,
			minBlur = 2,
			maxBlur = 200,
			lastBlur = 0,
			blurMultiplier = 0.25,
			dragging = false,
			totalDistance = 0,
			distThreshold = 10,
			distLog = [],
			distLogLimit = 10,
			momentumTween = null;

		var self = this;
		var $self = $(self);
		var $galleryPicture = $self.find("li");
		var imageTotalWidth = $galleryPicture.outerWidth(true);
		var itemCount = $galleryPicture.length;

		var displayPagination = !args.hidePagination;

		function setBlur (value) {
			if (value < minBlur) value = 0;
			if (value > maxBlur) value = maxBlur;
			if (value !== lastBlur) $("#blur").get(0).firstElementChild.setAttribute("stdDeviation", value + ",0");
			lastBlur = value;
		}

		function setGalleryPos (value, animating) {
			if (value < 0) value = 0;
			if (value > itemCount - 1) value = itemCount - 1;
			if (typeof animating === "undefined") animating = true;

			stopMomentum();

			TweenMax.to(galleryPos, animating ? 0.8 : 0, {
				x: -value * imageTotalWidth,
				ease: Quint.easeOut,
				onUpdate: updateGalleryPos,
				onComplete: updateGalleryPos
			});
		}

		function updateGalleryPosLoop () {
			if (dragging) {
				updateGalleryPos();
				var distance = dragPos.x - lastDragPos.x;

				lastDragPos.x = dragPos.x;
				totalDistance += distance;
				distLog.push(distance);

				while (distLog.length > distLogLimit) distLog.splice(0, 1);

				galleryPos.x += distance;
				requestAnimationFrame(updateGalleryPosLoop);
			}
		}

		function stopMomentum () {
			if (momentumTween !== null) {
				momentumTween.kill();
				momentumTween = null;
				updateGalleryPos();
			}
		}

		function updateGalleryPos () {
			TweenMax.set($(".motion-blur-gallery ul"), {
				x: galleryPos.x + (($(window).width() - imageTotalWidth) / 2),
				force3D: true,
				lazy: true
			});

			var speed = lastPos.x - galleryPos.x;
			var blur = Math.abs(Math.round(speed * blurMultiplier));

			setBlur(blur);
			lastPos.x = galleryPos.x;

			var _currentImage = Math.round(-galleryPos.x / imageTotalWidth);

			if (_currentImage !== currentImage) {
				currentImage = _currentImage;
				if (displayPagination) {
					$self.find(".motion-blur-gallery-pagination-dot.selected").removeClass('selected');
					$self.find(".motion-blur-gallery-pagination-dot").eq(currentImage).addClass('selected');
				}
			}
		}

		function mouseDownFunction (event) {
			event.preventDefault();
			dragging = true;
			dragPos.x = event.pageX;
			lastDragPos.x = dragPos.x;
			totalDistance = 0;
			distLog = [];

			stopMomentum();
			updateGalleryPosLoop();
		}

		function mouseMoveFunction (event) {
			if (dragging) dragPos.x = event.pageX;
		}

		function mouseUpFunction (event) {
			if (!dragging) return;

			dragging = false;
			var releaseSpeed = 0;

			for (var i = 0; i < distLog.length; i++) {
				releaseSpeed += distLog[i];
			}

			releaseSpeed /= distLog.length;

			var targetX = galleryPos.x + (releaseSpeed * 20);

			targetX = Math.round(targetX / imageTotalWidth) * imageTotalWidth;

			var targetImage = -targetX / imageTotalWidth;
			var excess = 0;

			if (targetImage < 0) {
				excess = targetImage;
				targetImage = 0;
			} else if (targetImage >= $galleryPicture.length) {
				excess = targetImage - ($galleryPicture.length - 1);
				targetImage = $galleryPicture.length - 1;
			}

			if (excess !== 0) targetX = -targetImage * imageTotalWidth;

			momentumTween = TweenMax.to(galleryPos, 1 - (Math.abs(excess) / 20), {
				x: targetX,
				ease: Quint.easeOut,
				onUpdate: updateGalleryPos,
				onComplete: updateGalleryPos
			});

			if (Math.abs(totalDistance) >= distThreshold) {
				event.preventDefault();
				event.stopPropagation();
			}
		}

		function init () {
			$self.mousedown(mouseDownFunction);
			$self.mousemove(mouseMoveFunction);
			$(window).mouseup(mouseUpFunction);

			var $body = $('body');
			$(self).addClass("motion-blur-gallery");

			$body.keydown(function (e) {
				if(e.which === 37) setGalleryPos(--currentImage);
				if(e.which === 39) setGalleryPos(++currentImage);
			});

			if (!$('svg.filters-hidden').length)
				$body.prepend('<svg class="filters-hidden"><defs><filter id="blur"><feGaussianBlur in="SourceGraphic" stdDeviation="0,0"></filter></defs></svg>');

			if (displayPagination) {
				$self.append('<div class="motion-blur-gallery-pagination"></div>');
				for (var i = 0; i < itemCount; i++) $self.find('.motion-blur-gallery-pagination').append('<button class="motion-blur-gallery-pagination-dot"></button>');

				$(self).find('.motion-blur-gallery-pagination button').first().addClass('selected');
			}

			$self.find("ul").css({
				webkitFilter: "url('#blur')",
				filter: "url('#blur')"
			});

			$galleryPicture.each(function (i) {
				$(this).click(function () {
					if (Math.abs(totalDistance) < distThreshold) setGalleryPos(i);
				});
				if (displayPagination) {
					$self.find(".motion-blur-gallery-pagination-dot").eq(i).click(function () {
						setGalleryPos(i);
					});
				}
			});

			var initialImageOffset = args.initialImageOffset || 0;
			setGalleryPos(initialImageOffset, false);
		}

		init();
		return this;
	}
})(jQuery);