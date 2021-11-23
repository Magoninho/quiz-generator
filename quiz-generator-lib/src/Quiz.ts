// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}


class Question {

	heading: HTMLHeadingElement;
	answerButtons: HTMLButtonElement[];
	questionText: string;
	answers: string[];
	rightAnswerIndex: number;

	constructor(questionText: string, answers: string[], rightAnswerIndex: number) {
		this.questionText = questionText;
		this.answers = answers;
		this.rightAnswerIndex = rightAnswerIndex;
	}

	/**
	 * returns if the index is equal to the right answer index
	 * @param index - question index
	 */
	isRightAnswer(index: number): boolean {
		return index == this.rightAnswerIndex;
	}

}


class Quiz {
	questions: Question[];
	currentQuestion: Question;
	questionIndex: number;
	quizDiv: HTMLDivElement;
	finished: boolean;
	score: number;
	canPlaySound: boolean;
	sounds: HTMLAudioElement[];
	shuffleAnswers: boolean;

	constructor() {
		this.questions = [];
		this.questionIndex = 0;
		this.finished = false;
		this.score = 0;
		this.shuffleAnswers = false;
	}

	/**
	 * Adds a new question to the Quiz.
	 * @param questionText - Enter the question text
	 * @param answers - enter an array of strings
	 * @param rightAnswerIndex - The index of the right answer inside the answers array
	 */
	addQuestion(questionText: string, answers: string[], rightAnswerIndex: number) {
		if (this.shuffleAnswers) {
			// store the answer
			let answer = answers[rightAnswerIndex];
			// shuffle
			let shuffled = shuffleArray(answers);
			// generates a new index
			let newRightAnswerIndex = shuffled.indexOf(answer);
			this.questions.push(new Question(questionText, shuffled, newRightAnswerIndex));
		} else {
			this.questions.push(new Question(questionText, answers, rightAnswerIndex));
		}
	}

	/**
	 * An utility function that returns an image tag.
	 * @param src - image source
	 * @param width - image width
	 * @param height - image height
	 * @returns - image tag
	 */
	addImage(src: string, width: number, height: number): string {
		return `<img src='${src}' width='${width}' height='${height}'>`;
	}

	/**
	 * Creates a pop up with a message
	 * @param message 
	 */
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

	/**
	 * Renders a question based on the question index.
	 * @param questionIndex 
	 */
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

				// checks if the user clicked on the right answer
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

	/**
	 * Renders the results
	 */
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

	/**
	 * Starts the quiz on an HTML div
	 * @param div 
	 */
	start(div: HTMLDivElement) {
		this.quizDiv = div;
		this.quizDiv.innerHTML = "";
		this.render(this.questionIndex);
		this.applyStyles();
	}

	applyStyles() {
		var styles = `
		/* The Modal (background) */
		.modal {
		  display: none; /* Hidden by default */
		  position: fixed; /* Stay in place */
		  z-index: 1; /* Sit on top */
		  padding-top: 100px; /* Location of the box */
		  left: 0;
		  top: 0;
		  width: 100%; /* Full width */
		  height: 100%; /* Full height */
		  overflow: auto; /* Enable scroll if needed */
		  background-color: rgb(0,0,0); /* Fallback color */
		  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
		}
		
		/* Modal Content */
		.modal-content {
		  background-color: #fefefe;
		  margin: auto;
		  padding: 20px;
		  border: 1px solid #888;
		  width: 60%;
		}
		
		/* The Close Button */
		.close {
		  color: #aaaaaa;
		  float: right;
		  font-size: 28px;
		  font-weight: bold;
		}
		
		.close:hover,
		.close:focus {
		  color: #000;
		  text-decoration: none;
		  cursor: pointer;
		}
		`;

		var styleSheet = document.createElement("style");
		styleSheet.innerText = styles;
		document.head.appendChild(styleSheet);
	}

	/**
	 * Goes to the next question
	 */
	next() {
		// before going to the next question, make the previous invisible
		let oldQuestion = document.getElementsByClassName("question")[this.questionIndex] as HTMLDivElement;
		oldQuestion.style.display = "none";
		if (this.questions[this.questionIndex + 1] != undefined) {
			this.questionIndex++;
			this.render(this.questionIndex);
		} else {
			this.finished = true;
			this.results();
		}
	}

	/**
	 * Add sounds to be played.
	 * @param soundRight Sound that will be played when the user answers correctly
	 * @param soundWrong Sount that will be played when the user answers wrongly
	 */
	addSounds(soundRight: HTMLAudioElement, soundWrong: HTMLAudioElement): void {
		this.canPlaySound = true;
		let audioRight = soundRight;
		let audioWrong = soundWrong;
		this.sounds = [audioRight, audioWrong];
	}

	setShuffle(enabled: boolean): void {
		this.shuffleAnswers = enabled;
	}
}