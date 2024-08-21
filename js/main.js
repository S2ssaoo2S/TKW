var light_color = "#1d2a35";

window.onload = function () {
  var rootStyle = document.documentElement.style;
  let lightMode = document.querySelector(".light-mode");

  lightMode.addEventListener("click", function (event) {
    let light = document.querySelector(".light-mode i");
let br_header = document.querySelector(".header-top");
   
    if (light.className == "fa fa-toggle-on") {
      light.className = "fa fa-toggle-off";
      rootStyle.setProperty("--main-header-color", "#1d2a35");
      rootStyle.setProperty("--bg-lesson_sub", "#1d2a35");
      rootStyle.setProperty("--bg-sub_code", "rgb(21, 32, 43)");
      rootStyle.setProperty("--main-text-color", "#fff");

    } else{
      light.className = "fa fa-toggle-on";
      rootStyle.removeProperty("--main-header-color");
      rootStyle.removeProperty("--bg-lesson_sub");
      rootStyle.removeProperty("--bg-sub_code");
      rootStyle.removeProperty("--main-text-color");

    };
  });
};

