$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      var target = $(this.hash);
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - $("#nav").height() - 20
          },
          1000
        );
      }
    });
  });
  