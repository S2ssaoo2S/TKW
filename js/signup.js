// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const inputConfirmpassword =document.querySelector(".input-signup-Confirmpw")
const inputname =document.querySelector(".input-signup-name")
const random = Math.floor(Math.random() * 6) + 1; // Số ngẫu nhiên từ 1 đến 10

const btnRegister = document.querySelector(".signup__signInButton");

// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputname.value===" " ||
    inputUsernameRegister.value === "" ||
    inputPasswordRegister.value === "" ||
    inputConfirmpassword.value=== ""
  )
  {
    alert("Vui lòng không để trống");
  }
  else if (inputPasswordRegister.value!==inputConfirmpassword.value){
     alert("nhập lại mật khẩu sai")
  }
  else {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const maxId = getMaxId(users);
    const user = {
      name:inputname.value,
      username: inputUsernameRegister.value,
      password: inputPasswordRegister.value,
      role:"",
      id: maxId + 1 ,
      idimg:random,
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng Ký Thành Công");
    window.location.href = "login.html";
  }
});
function getMaxId(users) {
  let maxId = 0;
  users.forEach(user => {
      if (user.id > maxId) {
          maxId = user.id;
      }
  });
  return maxId;
}
