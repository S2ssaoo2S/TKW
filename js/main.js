document.addEventListener("DOMContentLoaded", function () {
  //Light mode
  var rootStyle = document.documentElement.style;
  let lightMode = document.querySelector(".light-mode");
  let light = document.querySelector(".light-mode i");
  let bg_footer = document.querySelector(".footer");

  if (localStorage.getItem("light mode") == "fa fa-toggle-on") {
    light.className = "fa fa-toggle-on";

    rootStyle.removeProperty("--main-header-color");
    rootStyle.removeProperty("--bg-lesson_sub");
    rootStyle.removeProperty("--bg-sub_code");
    rootStyle.removeProperty("--main-text-color");
    rootStyle.removeProperty("--bg-data");
    rootStyle.removeProperty("--sidebar_color");
    bg_footer.style.backgroundImage = "url(/images/main/bg_footer.png)";
  } else {
    light.className = "fa fa-toggle-off";

    rootStyle.setProperty("--main-header-color", "#1d2a35");
    rootStyle.setProperty("--bg-lesson_sub", "#1d2a35");
    rootStyle.setProperty("--bg-sub_code", "rgb(21, 32, 43)");
    rootStyle.setProperty("--main-text-color", "#fff");
    rootStyle.setProperty("--bg-data", "#38444d");
    rootStyle.setProperty("--sidebar_color", "#1d2a35");
    bg_footer.style.backgroundImage =
      "url(/images/main/bg_footer_sky_darker.gif)";
  }

  lightMode.addEventListener("click", function (event) {
    if (light.className == "fa fa-toggle-on") {
      light.className = "fa fa-toggle-off";
      rootStyle.setProperty("--main-header-color", "#1d2a35");
      rootStyle.setProperty("--bg-lesson_sub", "#1d2a35");
      rootStyle.setProperty("--bg-sub_code", "rgb(21, 32, 43)");
      rootStyle.setProperty("--main-text-color", "#fff");
      rootStyle.setProperty("--bg-data", "#38444d");
      rootStyle.setProperty("--sidebar_color", "#1d2a35");
      bg_footer.style.backgroundImage =
        "url(/images/main/bg_footer_sky_darker.gif)";
      localStorage.setItem("light mode", light.className);
    } else {
      light.className = "fa fa-toggle-on";
      rootStyle.removeProperty("--main-header-color");
      rootStyle.removeProperty("--bg-lesson_sub");
      rootStyle.removeProperty("--bg-sub_code");
      rootStyle.removeProperty("--main-text-color");
      rootStyle.removeProperty("--bg-data");
      rootStyle.removeProperty("--sidebar_color");
      bg_footer.style.backgroundImage = "url(/images/main/bg_footer.png)";
      localStorage.setItem("light mode", light.className);
    }
  });
  ///// tim kiem
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResult = document.getElementById("searchResult");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn gửi form mặc định

    const searchTerm = searchInput.value.toLowerCase();
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];

    const foundItem = storedData.find((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    if (foundItem) {
      window.location.href = foundItem.href;
    } else {
      alert("không có kết quả");
    }
  });
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const storedData = JSON.parse(localStorage.getItem("myData")) || [];

    const foundItems = storedData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    if (foundItems.length > 0) {
      const resultHTML = foundItems
        .map((item) => `<a href="${item.href}">${item.name}</a>`)
        .join("");
      searchResult.innerHTML = resultHTML;
      searchResult.style.display = "block";
    }
  });
  searchInput.addEventListener("focusout", function () {
    searchResult.style.display = "none";
  });

  if (localStorage.getItem("current user") === null) {
    current_user = "";
  } else {
    current_user = JSON.parse(localStorage.getItem("current user"));
  }

  form_no = document.querySelector(".chua_dang_nhap");
  form_yes = document.querySelector(".da_dang_nhap");
  if (current_user === "") {
    form_no.style.display = "flex";
    form_yes.style.visibility = "hidden";
  } else {
    user_name = document.querySelector(".user-name");
    const name = document.getElementById("name");
    const username = document.getElementById("username");
    const avatar = document.getElementById("avatar");
      avatar.src = `/images/avatar/${current_user.idimg}.png`;
    name.textContent = `Tên:${current_user.name}`;
    username.textContent = `Username:${current_user.username}`;
    user_name.textContent = current_user.name;
    form_yes.style.visibility = "visible";
    form_no.style.display = "none";
  }
  //avatar
  

  const userInfo = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout-btn");

  avatar.addEventListener("click", function () {
    if (userInfo.style.display === "block") {
      userInfo.style.display = "none";
    } else {
      userInfo.style.display = "block";
    }
  });

  document.addEventListener("click", function (event) {
    if (!avatar.contains(event.target) && !userInfo.contains(event.target)) {
      userInfo.style.display = "none";
    }
  });
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("current user");

    window.location.href = "/html/index.html";
  });
  ///
});

window.onload = function () {
  // Tạo một mảng chứa các đối tượng với 2 thuộc tính là "name" và "href"
  const arrayData = [
    { name: "Trang chủ", href: "index.html" },
    { name: "Sản phẩm", href: "products.html" },
    { name: "Dịch vụ", href: "services.html" },
    {
      name: "Giới thiệu html",
      href: "/html/learn/learn_html/1Gioit_thieu_html.html",
    },
    {
      name: "HTML Text Editor",
      href: "/html/learn/learn_html/2HTML_edit.html",
    },
  ];
  localStorage.setItem("myData", JSON.stringify(arrayData));
};
