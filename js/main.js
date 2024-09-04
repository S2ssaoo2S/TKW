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
  const arrayData = [
    { name: "Trang chủ", href: "index.html" },
    {
      name: "Giới thiệu html",
      href: "/html/learn/learn_html/1Gioit_thieu_html.html",
    },
    {
      name: "HTML Text Editor",
      href: "/html/learn/learn_html/2HTML_edit.html",
    },
    {
      name: "HTML Cơ Bản",
      href: "/html/learn/learn_html/3HTML_co_ban.html",
    },
    {
      name: "HTML Thẻ",
      href: "/html/learn/learn_html/4HTML_the.html",
    },
    {
      name: "HTML Phần Tử",
      href: "/html/learn/learn_html/5HTML Phần Tử.html",
    },
    {
      name: "Thuộc Tính HTML",
      href: "/html/learn/learn_html/6HTML-Thuoc-Tinh.html",
    },
    {
      name: "HTML Đề Mục",
      href: "/html/learn/learn_html/7HTML-De-Muc.html",
    },
    {
      name: "HTML Đoạn Văn",
      href: "/html/learn/learn_html/8HTML-Doan-Van.html",
    },
    {
      name: "HTML Thuộc Tính Style",
      href: "/html/learn/learn_html/9HTML-Thuoc-Tinh-Style.html",
    },
    {
      name: "Định Dạng Chữ trong HTML",
      href: "/html/learn/learn_html/10Dinh_dang_chu.html",
    },
    {
      name: "HTML Comment",
      href: "/html/learn/learn_html/11Trich_dan.html",
    },
    {
      name: "Màu chữ trong HTML",
      href: "/html/learn/learn_html/12Mau_sac.html",
    },
    {
      name: "Giới thiệu về Ngôn ngữ lập trình C++",
      href: "/html/learn/learn_c++/1GThtml.html",
    },
    {
      name: "Viết Chương Trình Đầu Tiên",
      href: "1viet truong trinh.HTML",
    },
    {
      name: "Cấu Trúc Cơ Bản Của Một Chương Trình C++",
      href: "2Cấu trúc cơ bản của một chương trình C++.HTML",
    },
    {
      name: "Lệnh,Khối Lệnh,Từ Khóa",
      href: "3Lệnh, khối lệnh, từ khóa.HTML",
    },
    {
      name: "Dùng lệnh liên quan tới xuất dữ liệu",
      href: "4dung lqdxdl.HTML",
    },
    {
      name: "Biến và dữ liệu trong C++",
      href: "5Biến và các kiểu dữ liệu trong C++.HTML",
    },
    {
      name: "Nhập Và Xuất Dữ Liệu",
      href: "6nhập và xuất dữ liệu.HTML",
    },
    {
      name: "Hằng Số",
      href: "7Hằng số.HTML",
    },
    {
      name: "Phạm Vi Biến",
      href: "8 pham vi cua bien.HTML",
    },
    {
      name: "Các phép toán cơ bản",
      href: "9cac phep toan co ban.HTML",
    },
    {
      name: "Toán tử tăng giảm",
      href: "10toan tu tăng giam.HTML",
    },
    {
      name: "CSS Là Gì, Phân Biệt CSS và HTML - CSS Cơ Bản",
      href: "css1.GT.html",
    },
    {
      name: "Chèn Mã CSS vào Trang Web HTML - CSS Cơ Bản",
      href: "css.2mã chèn.html",
    },
    {
      name: "Cú Pháp CSS - CSS Cơ Bản",
      href: "css.3cu phap.html",
    },
    {
      name: "Bộ Chọn CSS Là Gì, Cú Pháp Các Loại Bộ Chọn CSS - CSS Cơ Bản",
      href: "css.4bo chon.html",
    },
    {
      name: "Phông Chữ trong CSS - Học CSS Cơ Bản",
      href: "css.5phong chu.html",
    },
    {
      name: "Màu Sắc trong CSS: Tên Màu, Màu RGB, Màu HEX và Màu HSL - CSS Cơ Bản",
      href: "css.6mau sac.html",
    },
    {
      name: "CSS Box Model - CSS Cơ Bản",
      href: "css.7box model.html",
    },
    {
      name: "Căn Lề trong CSS - CSS Cơ Bản",
      href: "css.8can le.html",
    },
    {
      name: "Đường Viền trong CSS",
      href: "css.9duong vien.html",
    },
    {
      name: "CSS Là Gì, Phân Biệt CSS và HTML - CSS Cơ Bản",
      href: "css.10van ban.html",
    },
    {
      name: "Phông Nền trong CSS - Học CSS Cơ Bản",
      href: "css.11phong nen.html",
    },
    {
      name: "Khoảng Đệm (Padding) trong CSS",
      href: "css.12khoang dem.html",
    },
    {
      name: "Giới Thiệu JavaScript Là Gì",
      href: "js.1gioithieu.html",
    },
    {
      name: "Comment trong Javascript",
      href: "js.2comment.html",
    },
    {
      name: "Biến trong Javascript",
      href: "js.3 biến.html",
    },
    {
      name: "Giới Thiệu JavaScript Là Gì",
      href: "js.4 phéptoan.html",
    },
    {
      name: "Các Kiểu Dữ Liệu trong Javascript",
      href: "js.5 dữ liệu.html",
    },
    {
      name: "Các Hàm thường gặp trong Javascript",
      href: "js.6ham.html",
    },
    {
      name: "Phạm Vi Của Biến trong Javascript",
      href: "js.7pham vi.html",
    },
    {
      name: "Cấu Trúc Điều Khiển if, else và elseif trong Javascript",
      href: "js.8cau trúc.html",
    },
    {
      name: "Vòng Lặp trong Javascriptì",
      href: "js.9 vòng lặp.html",
    },
    {
      name: "Break và Continue trong Javascript",
      href: "js.10 Break và Continue.html",
    },
    
    
    ];
  localStorage.setItem("myData", JSON.stringify(arrayData));
};
