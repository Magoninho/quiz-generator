# Quiz Generator

## Table of Contents
1. [Getting Started](#getting-started)
	1. [Installation](#installation)
	2. [Creating a Project](#creating-a-project)
		1. [Steps](#steps)

# Getting started
## Installation
Include this line in your html:
```html
<script src="https://cdn.jsdelivr.net/gh/Magoninho/quiz-generator@master/quiz-generator-lib/dist/Quiz.js"></script>
```

## Creating a project
### Steps
1. [Install](#installation)

2. Create a div that you want to insert the quiz

```html
<div id="myQuizDiv">
</div>
```

3. Create a script for setting up the quiz
```html
<script>
let quiz = new Quiz();
</script>
```
Create a new quiz by instanciating a Quiz object somewhere.

4. Add questions to your Quiz
```js
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
```

5. Start the quiz on a selected div

```js
// Selecting a div to place the quiz in
let myDiv = document.getElementById("myQuizDiv");

// Starting the quiz
// Tip: you can use this in a function so you can start the quiz by pressing a button for example
quiz.start(myDiv);
```