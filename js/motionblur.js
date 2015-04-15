"use strict";

(function () {
	var isUpdatingBlur = false;
	var updateBlurStopTimeout = null;
        
	$.fn.toggleBlur = function (bool) {
		var blurId = $(this).data("blur-id");
		var value = bool ? "url(#" + blurId + ")" : "none";
		$(this).css({
			webkitFilter: value,
			filter: value
		});
	};

	$.fn.setBlur = function (value) {
		value = Math.round(value);

		if ($(this).data("blur-value") === value) return;

		if (value === 0) {
			$(this).toggleBlur(false);
		} else {
			$(this).toggleBlur(true);
			$(this).data("blur").firstElementChild.setAttribute("stdDeviation", value + ",0");
			$(this).data("blur-value", value);
		}
	};

	$.fn.initBlur = function () {

		$(this).each(function (i) {
			var blurClone = $("#blur")[0].cloneNode(true);
			var blurId = "blur" + i;

			blurClone.setAttribute("id", blurId);
			$(".filters defs")[0].appendChild(blurClone);

			$(this).data("blur", blurClone).data("blur-id", blurId).data("blur-value", 0).data("last-pos", $(this).offset());
		});
	};

	$.updateBlur = function () {
		$(".js-blur").each(function () {
			var pos = $(this).offset();
			var lastPos = $(this).data("last-pos");
			var v = Math.abs(pos.left - lastPos.left) * 0.25;
			$(this).data("last-pos", pos).setBlur(v);
		});

		if (isUpdatingBlur) requestAnimationFrame($.updateBlur);
	};

	$.startUpdatingBlur = function (stopDelay) {
		if (typeof stopDelay === "undefined") stopDelay =- 1;

		if (updateBlurStopTimeout !== null) {
			clearTimeout(updateBlurStopTimeout);
			updateBlurStopTimeout = null;
		}

		if (!isUpdatingBlur) {
			isUpdatingBlur = true;
			$.updateBlur();
		}

		if (stopDelay >- 1) updateBlurStopTimeout = setTimeout($.stopUpdatingBlur, stopDelay);
	};

	$.stopUpdatingBlur = function () {
		isUpdatingBlur=false;
	}
})();