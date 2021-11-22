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
	// TODO: style manager
	// TODO: score

	// TODO: quiz name
	constructor() {
		this.questions = [];
		this.questionIndex = 0;
		this.questionDivs = [];
		this.finished = false;
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
					alert("acertou");
				} else {
					alert("errou");
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

	start(div) {
		this.quizDiv = div; // TODO: change this to be parameter
		this.quizDiv.innerHTML = "";
		this.render(this.questionIndex);
	}

	next() {
		if (this.questions[this.questionIndex + 1] != undefined) {
			// before going to the next question, make the previous invisible
			let oldQuestion = document.getElementsByClassName("question")[this.questionIndex] as HTMLDivElement;
			oldQuestion.style.display = "none";
			this.questionIndex++;

			this.render(this.questionIndex);
		} else {
			// TODO: show results function
		}
	}
}