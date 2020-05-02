$('.button-login').on('click', function () {
  $(this).hide();
  $('#login').addClass('is-active');
});

$(document).mouseup(function (e) {
  let form = $('#login');
  if (!form.is(e.target)
    && form.has(e.target).length === 0) {
    form.removeClass('is-active');
    $('.button-login').show();
  }
});
