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
	// TODO: style manager

	// TODO: quiz name
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

	render(questionIndex: number) {
		let question = this.questions[questionIndex];
		let questionDiv: HTMLDivElement = document.createElement("div");
		questionDiv.classList.add("question");
		let answerButtons: HTMLButtonElement[] = [];
		let title: HTMLHeadingElement = document.createElement("h1");
		title.innerHTML = question.questionText;
		questionDiv.appendChild(title);

		for (let a = 0; a < question.answers.length; a++) {
			const answer = question.answers[a];
			let btn = document.createElement("button");
			// button attributes
			btn.addEventListener("click", () => {

				if (question.isRightAnswer(a)) {
					alert("right!");
					this.score++;
				} else {
					alert("wrong! correct answer: " + question.answers[question.rightAnswerIndex]);
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
			${q+1}. ${question.answers[question.rightAnswerIndex]}`;
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
		let oldQuestion = document.getElementsByClassName("question")[this.questionIndex] as HTMLDivElement;
		oldQuestion.style.display = "none";
		if (this.questions[this.questionIndex + 1] != undefined) {
			this.questionIndex++;
			this.render(this.questionIndex);
		} else {
			this.results();
		}
	}
}