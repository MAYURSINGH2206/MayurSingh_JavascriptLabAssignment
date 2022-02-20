function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    var Result = (quiz.score/5)*100;
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2> <h2 id='score'> Percentage: " + Result + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML=gameOverHTML;
};


// create questions here
var questions = [
    new Question("What is the HTML tag under which one can write the JavaScript code?", ["javascript", "script","scripted", "js"], "script"),
    new Question("Which built-in method sorts the elements of an array?", ["changeOrder(order)", "Order()", "Sort()", "None Of The Above"], "Sort()"),
    new Question("Which is not a JavaScript Framework?", ["Django", "JQuery","Python Script", "NodeJS"], "Django"),
    new Question(" Which of the following is not a reserved word in JavaScript?", ["short", "throws", "program", " interface"], "program"),
    new Question("Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?", ["pop()", "join()", "map()", "push()"], "push()")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();