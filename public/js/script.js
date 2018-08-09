$(window).on('load', function() {
    $(".page-loader").stop(true).delay(400).fadeOut("slow");
    $("body").delay(400).removeClass("no-js");
});

$(document).ready(function(){
	$('body.home').vegas({
		slides: [
			{src: "/images/landing-1.jpg"},
			{src: "/images/landing-2.jpg"},
			{src: "/images/landing-3.jpg"},
			{src: "/images/landing-4.jpg"},
			{src: "/images/landing-5.jpg"},
			{src: "/images/landing-6.jpg"},
			{src: "/images/landing-7.jpg"}
		],
		timer: true,
		autoplay: true,
		loop: true,
		shuffle: true,
		cover: true,
		delay: 12000,
		transitionDuration: 6000,
		animation: "random",
		transition: "fade"
	});
});

$(document).ready(function(){
	$('.carousel').carousel({
		interval: 5000
	});
});

$(document).ready(function(){
	$('.edit').on('click', function(e){
		e.preventDefault();
		var data = $(this).parent('.tool').siblings('p').text();
		$(this).parent('.tool').siblings('p').css('display', 'none');
		$('.user-text-edit').css('display', 'block');
    	$('#user-text-edit-area').val(data);
	});

	$('.cancel').on('click', function(e){
		e.preventDefault();
		$(this).parents('.user-text-edit').siblings('p').css('display', 'block');
		$('.user-text-edit').css('display', 'none');
		$('#user-text-edit-area').val('');
	})
});

$(document).ready(function(){
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('.img-preview').append('<div class="img-preview-single new-img-up"><figure><img class="edit-show" src="' + e.target.result + '"><figcaption><i class="fa fa-cloud-upload" aria-hidden="true"></i></figcaption></figure><p>Upload</p></div>');
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	function readURLMany(input) {
		if (input.files) {
			$('.new-img-up').remove();
			var filesAmount = input.files.length;
			for (i = 0; i < filesAmount; i++) {
				var reader = new FileReader();
				reader.onload = function(e) {
					$('.img-preview').append('<div class="img-preview-single new-img-up"><figure><img class="edit-show" src="' + e.target.result + '"><figcaption><i class="fa fa-cloud-upload" aria-hidden="true"></i></figcaption></figure><p>Upload</p></div>');
				}
				reader.readAsDataURL(input.files[i]);
			}
		}
	}

	$("#file-upload").change(function() {
		$('.img-preview').css('display', 'block');
		$('.toolbar-button .cancel').css('display', 'inline-block');
		readURL(this);
	});

	$("#file-upload-many").change(function() {
		$('.img-preview').css('display', 'block');
		$('.toolbar-button .cancel').css('display', 'inline-block');
		readURLMany(this);
	});

	$('.cancel').on("click", function(e){
		e.preventDefault();
		$('.new-img-up').remove();
		$('#file-upload').val("");
		if ($('.img-preview').has('.img-preview-single.edit-img-up')) {
			$('.toolbar-button .cancel').css('display', 'none');
		} else {
			$('.img-preview').css('display', 'none');
			$('.toolbar-button .cancel').css('display', 'none');
		}
	});

	function checkURLimage() {
		if ($('.img-preview').has('.img-preview-single')) {
			$('.img-preview').css('display', 'block');
		} else {
			$('.img-preview').css('display', 'none');
		}
	}

	checkURLimage();

	$('.edit-remove').on('click', function(e) {
		e.preventDefault();
		var text = $(this).text();
		$(this).siblings('figure').toggleClass('active-delete');
		text === 'Remove' ? RemoveInput($(this)) : UndoInput($(this));
	});

	function UndoInput(thisObj) {
		thisObj.text('Remove');
		thisObj.parent().append('<input type="hidden" name="images" value="' + thisObj.attr("data-href") + '">');
	}

	function RemoveInput(thisObj) {
		thisObj.text('Undo');
		thisObj.siblings('input').remove();
	}

	$('#features, #activities').multiSelect()
});

$(document).ready(function(){
	$('.datepicker').datepicker({
		format: 'dd MM yyyy',
    	viewMode: 'years',
    	minViewMode: 'days',
    	maxViewMode: 'years',
    	orientation: 'top auto',
    	startView: 'days',
    	autoclose: true,
    	clearBtn: true
	});
})