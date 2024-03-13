$(function () {
  let s_title = $(".select_box span");
  let s_select = $(".select_box li");
  s_title.click(function (e) {
    $(this).addClass("span_aa");
    $(this).next("ul").show();
    e.stopPropagation();
  });
  s_select.click(function () {
    let s_text = $(this).html();
    let s_title_2 = $(this).parent("ul").prev("span");
    s_title_2.html(s_text).removeClass("span_aa");
    $(this).parent("ul").hide();
  });
  $(document).click(function () {
    s_title.removeClass("span_aa");
    $(".select_box ul").hide();
  });
});
