let quiz = new Quiz();
quiz.addQuestion("teste", ["a1", "a2", "a3", "a4", "a5"], 1);
quiz.addQuestion("enunciado 2", ["b1", "b2", "b3", "b4", "b5"], 3);
quiz.start(document.getElementsByClassName("main-quiz")[0]);