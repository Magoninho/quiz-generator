let quiz = new Quiz();
			
// Shuffling options enabled
quiz.setShuffle(true);

/* Adding a question to the quiz
Args: 
- Question name (string);
- Options (array of strings)
- Right answer index (number): that's the index of the right answer in the options array
*/
quiz.addQuestion(
	"Question 1 (Shuffled)", [
		"Alternative 1",
		"Alternative 2",
		"Alternative 3 (correct answer)",
		"Alternative 4"
	],
	2 // Right Answer Index (Alternative 3)
);

// Shuffling options disabled
quiz.setShuffle(false);

quiz.addQuestion(
	"Question 2 (Not shuffled)", [
		"Alternative 1",
		"Alternative 2",
		"Alternative 3",
		"Alternative 4",
		"Alternative 5"
	],
	0
);

// Adding sounds
quiz.addSounds(
	document.getElementById("audio-win"),
	document.getElementById("audio-wrong")
);


// Selecting a div to place the quiz in
let myDiv = document.getElementById("myQuizDiv");

// Starting the quiz

function startQuiz() {
	quiz.start(myDiv);
}