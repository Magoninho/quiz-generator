class Question {
    constructor(questionText, answers, rightAnswerIndex) {
        this.questionText = questionText;
        this.answers = answers;
        this.rightAnswerIndex = rightAnswerIndex;
        this.visible = false;
    }
    isRightAnswer(index) {
        return index == this.rightAnswerIndex;
    }
    render(div) {
        this.answerButtons = [];
        div.appendChild(this.heading);
        for (let a = 0; a < this.answers.length; a++) {
            const answer = this.answers[a];
            let btn = document.createElement("button");
            btn.innerHTML = answer;
            this.answerButtons.push(btn);
            div.appendChild(btn);
        }
    }
}
class Quiz {
    // TODO: style manager
    constructor() {
        this.questions = [];
        this.questionIndex = 0;
        this.questionDivs = [];
        this.finished = false;
        this.score = 0;
    }
    /**
     *
     * @param {string} questionText - Enter the question text
     * @param {string[]} answers - enter an array of strings
     * @param {number} rightAnswerIndex - The index of the right answer inside the answers array
     */
    addQuestion(questionText, answers, rightAnswerIndex) {
        this.questions.push(new Question(questionText, answers, rightAnswerIndex));
    }
    addImage(src, width, height) {
        return `<img src='${src}' width='${width}' height='${height}'>`;
    }
    popup(message) {
        let modal = document.createElement("div");
        modal.classList.add("modal");
        let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modal.appendChild(modalContent);
        let closeSpan = document.createElement("span");
        closeSpan.classList.add("close");
        closeSpan.innerHTML = "&times;";
        modalContent.appendChild(closeSpan);
        let p = document.createElement("p");
        p.style.color = "black";
        p.innerHTML = message;
        modalContent.appendChild(p);
        modal.style.display = "block";
        modal.style.textAlign = "center";
        closeSpan.onclick = function () {
            modal.style.display = "none";
        };
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        document.body.appendChild(modal);
    }
    render(questionIndex) {
        let question = this.questions[questionIndex];
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        let answerButtons = [];
        let title = document.createElement("h1");
        title.innerHTML = questionIndex + 1 + ". " + question.questionText;
        questionDiv.appendChild(title);
        for (let a = 0; a < question.answers.length; a++) {
            const answer = question.answers[a];
            let btn = document.createElement("button");
            // button attributes
            btn.addEventListener("click", () => {
                if (question.isRightAnswer(a)) {
                    if (this.canPlaySound)
                        this.sounds[0].play();
                    this.popup("<h2 style='color: green;'>right!</h2>");
                    this.score++;
                }
                else {
                    if (this.canPlaySound)
                        this.sounds[1].play();
                    this.popup("<h2 style='color: red;'>wrong!</h2><br><br><br>correct answer: <br>" + question.answers[question.rightAnswerIndex]);
                }
                this.next();
            });
            btn.innerHTML = answer;
            answerButtons.push(btn);
            questionDiv.appendChild(btn);
        }
        this.quizDiv.appendChild(questionDiv);
        document.body.appendChild(this.quizDiv);
    }
    results() {
        this.quizDiv.style.display = "none";
        let resultsDiv = document.createElement("div");
        resultsDiv.innerHTML = `
		<h1>Results:</h1>
		<p>Correct Answers: ${this.score}/${this.questions.length}</p>

		<h2>Answers:</h2>
		`;
        for (let q = 0; q < this.questions.length; q++) {
            const question = this.questions[q];
            const p = document.createElement("p");
            p.innerHTML = `
			${q + 1}. ${question.answers[question.rightAnswerIndex]}`;
            resultsDiv.appendChild(p);
        }
        document.body.appendChild(resultsDiv);
    }
    start(div) {
        this.quizDiv = div; // TODO: change this to be parameter
        this.quizDiv.innerHTML = "";
        this.render(this.questionIndex);
    }
    next() {
        // before going to the next question, make the previous invisible
        let oldQuestion = document.getElementsByClassName("question")[this.questionIndex];
        oldQuestion.style.display = "none";
        if (this.questions[this.questionIndex + 1] != undefined) {
            this.questionIndex++;
            this.render(this.questionIndex);
        }
        else {
            this.results();
        }
    }
    addSounds(soundRight, soundWrong) {
        this.canPlaySound = true;
        let audioRight = soundRight;
        let audioWrong = soundWrong;
        this.sounds = [audioRight, audioWrong];
    }
}
