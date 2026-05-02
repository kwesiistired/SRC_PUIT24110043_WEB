$(function () {
  var captchaAnswer = 7;

  $(".menu-toggle").on("click", function () {
    var expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!expanded));
    $("#" + $(this).attr("aria-controls")).toggleClass("open");
  });

  $("#site-search").on("input", function () {
    var query = $(this).val().toLowerCase().trim();

    $(".searchable").each(function () {
      var searchableText = ($(this).text() + " " + ($(this).data("search") || "")).toLowerCase();
      $(this).toggleClass("is-hidden", query.length > 0 && searchableText.indexOf(query) === -1);
    });
  });

  $(".captcha-form, .academy-form").on("submit", function (event) {
    event.preventDefault();

    var $form = $(this);
    var $message = $form.find(".form-message");
    var formName = $form.data("form-name") || "form";
    var $captcha = $form.find("input[name='captcha']");

    $message.removeClass("success error");

    if ($captcha.length && Number($captcha.val()) !== captchaAnswer) {
      $message.addClass("error").text("CAPTCHA failed. Please answer 4 + 3 correctly.");
      return;
    }

    if (!this.checkValidity()) {
      $message.addClass("error").text("Please complete all required fields correctly.");
      return;
    }

    this.reset();
    $message.addClass("success").text("Your " + formName + " has been received. A confirmation email would be sent in the full system.");
  });

  var $counter = $("#visitor-count");
  if ($counter.length) {
    var count = Number(localStorage.getItem("srcAcademyVisits") || "0") + 1;
    localStorage.setItem("srcAcademyVisits", String(count));
    $counter.text(count);
  }
});
