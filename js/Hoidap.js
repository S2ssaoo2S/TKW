document.addEventListener("DOMContentLoaded", function () {
  var currentUser = JSON.parse(localStorage.getItem("current user"));

  if (currentUser) {
    document.getElementById("add-question-form").classList.remove("hidden");
  } else {
    document.getElementById("not-logged-in").classList.remove("hidden");
  }
});

function load(questionid) {
  var currentUser = JSON.parse(localStorage.getItem("current user"));

  if (currentUser) {
    submit = document.getElementById("submitButton");
    Element = document.createElement("div");
    Element.innerHTML = ` <textarea id="answer-input" placeholder="Nhập câu trả lời của bạn"></textarea>
  <button onclick="submitAnswer(${questionid})">Gửi</button></div>`;
    submit.appendChild(Element);
  }
}

function addQuestion() {
  var questionname = document.getElementById("question-name").value;
  var questioninput = document.getElementById("question-input").value;
  var currentDate = new Date();
  if (localStorage.getItem("current user") === null) {
    current_user = "";
  } else {
    current_user = JSON.parse(localStorage.getItem("current user"));
  }

  if (questionname.trim() !== "") {
    var newQuestion = {
      idsender: current_user.id,
      id: Date.now(),
      senderName: current_user.name,
      questionname: questionname,
      question: questioninput,
      answer: [],
      time: currentDate,
      idimg: current_user.idimg,
    };

    const dateTime = new Date(newQuestion.time);

    // Lấy ngày, tháng và thời gian
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    // Lưu câu hỏi mới vào Local Storage
    var questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(questions));

    // Hiển thị câu hỏi trên trang web
    var questionList = document.getElementById("question-list");
    var questionElement = document.createElement("div");
    questionElement.className = "question";

    // Câu hỏi mới
    var questionInput = document.getElementById("question-input").value;
    questionElement.innerHTML = `<div class="box_botss">
    <div  class="topic_name flex" >
        <div >
            <img class="avatar-img" src="/images/avatar/${newQuestion.idimg}.png" alt="avatar">
        </div>
        <div>
            <a class="question_name">${newQuestion.questionname}</a>
            <div > bởi <a class="name" href="#">${newQuestion.senderName}</a>
                <span style="color:red"></span>
                <i ></i>
            </div>
        </div>
            <div>Ngày: ${day}/${month}/${year}<br> Thời gian: ${hours}:${minutes}:${seconds}</div>

    </div>
    </div>
    <button class="delete" onclick='deleteQuestion(this)'>Xóa</button>`;
    questionList.appendChild(questionElement);

    document.getElementById("question-input").value = "";
  } else {
    alert("Vui lòng nhập nội dung câu hỏi!");
  }
}

// Hàm xóa câu hỏi
function deleteQuestion(buttonElement) {
  var questionElement = buttonElement.parentNode;
  var questionId = questionElement.getAttribute("data-id");
  // Kiểm tra quyền của người dùng
  var questions = JSON.parse(localStorage.getItem("questions")) || [];
  questions = questions.filter((question) => question.id != questionId);
  localStorage.setItem("questions", JSON.stringify(questions));

  questionElement.remove();
}
// Hàm load câu hỏi từ Local Storage
window.onload = function loadQuestions() {
  var questions = JSON.parse(localStorage.getItem("questions")) || [];
  var currentUser = JSON.parse(localStorage.getItem("current user"));

  var questionList = document.getElementById("question-list");
  questionList.innerHTML = "";

  questions.forEach(function (question) {
    var questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.dataset.id = question.id;
    const dateTime = new Date(question.time);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    questionElement.innerHTML = `<div class="box_botss">
    <div class="topic_name flex" >
        <div >
            <img class="avatar-img" src="/images/avatar/${question.idimg}.png" alt="avatar">
        </div>
        <div >
            <a class="question_name" id="${question.id}" ">${question.questionname}</a>
            <div > bởi <a class="name" href="#">${question.senderName}</a>
                <span style="color:red"></span>
                <i ></i>
            </div>

        </div>
            <div>Ngày: ${day}/${month}/${year}<br> Thời gian: ${hours}:${minutes}:${seconds}</div>


    </div>
    </div>
          `;
    if (currentUser)
      if (currentUser.id == question.idsender || currentUser.role == "admin") {
        questionElement.innerHTML += `<button class="delete"  onclick='deleteQuestion(this)'>Xóa</button>`;
      }
    questionList.appendChild(questionElement);
  });
};
// Thêm sự kiện click cho phần tử
document.addEventListener("click", function (event) {
  back = document.getElementById("back");
  back.classList.remove("back");
  if (event.target.classList.contains("question_name")) {
    var listquestion = document.getElementById("question-list");
    var addQuestion = document.getElementById("add-question-form");

    var questionname = event.target.innerText;
    var questionid = event.target.id;
    var questions = JSON.parse(localStorage.getItem("questions")) || [];
    questiontext = "";
    questions.forEach(function (question) {
      if (question.id == questionid) {
        questiontext = question.question;
      }
    });
    listquestion.innerHTML = "";
    addQuestion.innerHTML = "";

    // Tạo phần tử div
    var answerForm = document.createElement("div");
    answerForm.className = "question";

    answerForm.innerHTML = `
      <p class="question_text">${questionname}</p>
      <p class="question_name">${questiontext}</p>
    `;

    listquestion.appendChild(answerForm);
    loadAnswer(questionid);
    load(questionid);
  }
});

function submitAnswer(questionid) {
  var answerInputValue = document.getElementById("answer-input").value.trim();
  if (answerInputValue != "") {
    var currentQuestionId = questionid;
    current_user = localStorage.getItem("current user")
      ? JSON.parse(localStorage.getItem("current user"))
      : "";
    var currentDate = new Date();
    var answer = {
      responderName: current_user.name,
      time: currentDate,
      idimg: current_user.idimg,
      answer: answerInputValue,
    };
    var questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.forEach(function (question) {
      if (question.id == currentQuestionId) {
        console.log(question.id);
        question.answer.push(answer);
      }
    });

    localStorage.setItem("questions", JSON.stringify(questions));

    const answers = answer.answer;
    const answersContainer = document.getElementById("answerContainer");

    const date = new Date(answer.time);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("answer_question");
    answerDiv.innerHTML = `
        <div>
            <img class="avatar-img" src="/images/avatar/${answer.idimg}.png" alt="avatar">
        </div>
        <div class="answer">
            <a href="#">${answer.responderName}</a>
            <p>${answer.answer}</p>
        </div>
        <div class="time">Thời gian: ${hours}: ${minutes}:${seconds}</div>
    `;

    answersContainer.appendChild(answerDiv);
  } else {
    alert("Vui lòng nhập nội dung câu trả lời!");
  }
}
function loadAnswer(idquestion) {
  var questions = JSON.parse(localStorage.getItem("questions")) || [];

  questions.forEach(function (question) {
    if (question.id == idquestion) {
      const answers = question.answer;
      const answersContainer = document.getElementById("answerContainer");
      console.log(answersContainer);

      answers.forEach((answer, index) => {
        const date = new Date(answer.time);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer_question");
        answerDiv.innerHTML = `
        <div>
            <img class="avatar-img" src="/images/avatar/${question.idimg}.png" alt="avatar">
        </div>
        <div class="answer">
            <a href="#">${answer.responderName}</a>
            <p>${answer.answer}</p>
        </div>
        <div class="time">Thời gian: ${hours}: ${minutes}:${seconds}</div>
    `;

        answersContainer.appendChild(answerDiv);
      });
    }
  });
}
