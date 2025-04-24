let question, input, radio, submitButton, result;
let questions;
let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function preload() {
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() { //這是一個設定函數
  createCanvas(windowWidth, windowHeight);
  background("#a2d2ff");

  // 顯示第一題
  displayQuestion();
}

function draw() {
  background("#a2d2ff");
  fill("#ffc8dd");
  rect(windowWidth / 4, windowHeight / 8, windowWidth / 2, windowHeight * 3 / 4); // 在視窗中間畫一個寬為視窗寬度一半、高為視窗高度的3/4的矩形
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (question) question.position(windowWidth / 2 - 50, windowHeight / 4 - 70);
  if (input) input.position(windowWidth / 2 - 50, windowHeight / 4 + 40);
  if (radio) radio.position(windowWidth / 2 - 50, windowHeight / 4 + 40);
  if (submitButton) submitButton.position(windowWidth / 2 - 50, windowHeight / 4 + 120);
  if (result) result.position(windowWidth / 2 - 50, windowHeight / 4 + 170);
  draw(); // 重新繪製矩形
}

function displayQuestion() {
  if (currentQuestion < questions.getRowCount()) {
    let questionText = questions.getString(currentQuestion, 'question');
    let option1 = questions.getString(currentQuestion, 'option1');
    let option2 = questions.getString(currentQuestion, 'option2');
    let option3 = questions.getString(currentQuestion, 'option3');
    let option4 = questions.getString(currentQuestion, 'option4');

    // 題目
    if (question) question.remove();
    question = createP(questionText);
    question.position(windowWidth / 2 - 50, windowHeight / 4 - 70);
    question.style('font-size', '35px');
    question.style('color', '#000000');

    // 移除舊的選項或填答框
    if (input) input.remove();
    if (radio) radio.remove();

    // 根據是否有選項來決定顯示填答框或選擇題
    if (option1 && option2 && option3 && option4) {
      radio = createRadio();
      radio.option(option1, option1);
      radio.option(option2, option2);
      radio.option(option3, option3);
      radio.option(option4, option4);
      radio.style('font-size', '35px');
      radio.style('color', '#023047');
      radio.position(windowWidth / 2 - 50, windowHeight / 4 + 40);
    } else {
      input = createInput();
      input.position(windowWidth / 2 - 50, windowHeight / 4 + 40);
      input.style('font-size', '35px');
    }

    // 送出按鈕
    if (submitButton) submitButton.remove();
    submitButton = createButton('下一題');
    submitButton.position(windowWidth / 2 - 50, windowHeight / 4 + 120);
    submitButton.mousePressed(checkAnswer);

    // 結果
    if (result) result.remove();
    result = createP('');
    result.position(windowWidth / 2 - 50, windowHeight / 4 + 170);
    result.style('font-size', '35px');
  } else {
    // 顯示結果
    if (question) question.remove();
    if (input) input.remove();
    if (radio) radio.remove();
    if (submitButton) submitButton.remove();
    result.html(`答對了 ${correctAnswers} 題，答錯了 ${incorrectAnswers} 題`);
    submitButton = createButton('再試一次');
    submitButton.position(windowWidth / 2 - 50, windowHeight / 4 + 60);
    submitButton.mousePressed(resetQuiz);
  }
}

function checkAnswer() {
  let answer;
  if (radio) {
    answer = radio.value();
  } else if (input) {
    answer = input.value();
  }
  const correctAnswer = questions.getString(currentQuestion, 'answer');
  if (answer === correctAnswer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
  currentQuestion++;
  displayQuestion();
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  displayQuestion();
}