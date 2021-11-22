class Question {

	heading: HTMLHeadingElement;
	answerButtons: HTMLButtonElement[];
	questionText: string;
	answers: string[];
	rightAnswerIndex: number;
	visible: boolean;
	


	constructor(questionText: string, answers: string[], rightAnswerIndex: number) {
		this.questionText = questionText;
		this.answers = answers;
		this.rightAnswerIndex = rightAnswerIndex;
		this.visible = false;
	}

	isRightAnswer(index: number): boolean {
		return index == this.rightAnswerIndex;
	}

	render(div: HTMLDivElement): void {
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
	questions: Question[];
	currentQuestion: Question;
	questionIndex: number;
	questionDivs: HTMLDivElement[];
	quizDiv: HTMLDivElement;
	finished: boolean;
	score: number;
	name: string;
	canPlaySound: boolean;
	sounds: HTMLAudioElement[];
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
	addQuestion(questionText: string, answers: string[], rightAnswerIndex: number) {
		this.questions.push(new Question(questionText, answers, rightAnswerIndex));
	}

	addImage(src: string, width, height): string {
		return `<img src='${src}' width='${width}' height='${height}'>`;
	}

	popup(message?: any) {
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
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

		document.body.appendChild(modal);

	}

	render(questionIndex: number) {
		let question = this.questions[questionIndex];
		let questionDiv: HTMLDivElement = document.createElement("div");
		questionDiv.classList.add("question");
		let answerButtons: HTMLButtonElement[] = [];
		let title: HTMLHeadingElement = document.createElement("h1");
		title.innerHTML = questionIndex + 1 + ". " + question.questionText;
		questionDiv.appendChild(title);

		for (let a = 0; a < question.answers.length; a++) {
			const answer = question.answers[a];
			let btn = document.createElement("button");
			// button attributes
			btn.addEventListener("click", () => {

				if (question.isRightAnswer(a)) {
					if (this.canPlaySound) this.sounds[0].play();
					this.popup("<h2 style='color: green;'>right!</h2>");
					this.score++;
				} else {
					if (this.canPlaySound) this.sounds[1].play();
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

		let resultsDiv: HTMLDivElement = document.createElement("div");
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


	start(div: HTMLDivElement) {
		this.quizDiv = div; // TODO: change this to be parameter
		this.quizDiv.innerHTML = "";
		this.render(this.questionIndex);
	}

	next() {
		// before going to the next question, make the previous invisible
		let oldQuestion = document.getElementsByClassName("question")[this.questionIndex] as HTMLDivElement;
		oldQuestion.style.display = "none";
		if (this.questions[this.questionIndex + 1] != undefined) {
			this.questionIndex++;
			this.render(this.questionIndex);
		} else {
			this.results();
		}
	}

	addSounds(soundRight: HTMLAudioElement, soundWrong: HTMLAudioElement): void {
		this.canPlaySound = true;
		let audioRight = soundRight;
		let audioWrong = soundWrong;
		this.sounds = [audioRight, audioWrong];
	}
}