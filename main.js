let quiz = new Quiz();

quiz.setShuffle(true);

quiz.addQuestion("Quem criou a teoria da relatividade?", [
	"isaac newton", 
	"albert einstein", 
	"nikola tesla", 
	"sócrates", 
	"ednaldo pereira"], 4);


quiz.addQuestion("04/04?", [
	quiz.addImage("https://super.abril.com.br/wp-content/uploads/2017/12/a-verdadeira-histc3b3ria-de-natal.png?w=1024", 100, 100),
	quiz.addImage("https://maristalab.com.br/wp-content/uploads/2021/03/postsmaristalab_pascoa.png", 100, 100), 
	quiz.addImage("https://upload.wikimedia.org/wikipedia/commons/a/a2/Jack-o%27-Lantern_2003-10-31.jpg", 100, 100),
], 1);


quiz.addQuestion(
	quiz.addImage("https://static.clubedaanamariabraga.com.br/wp-content/uploads/2020/08/pizza-margherita.jpg", 200, 100), [
		"portuguesa",
		"marguerita",
		"mussarela",
		"calabresa",
		"peperoni",
], 1);


quiz.addSounds(
	document.getElementById("audio-win"),
	document.getElementById("audio-wrong")
);


document.getElementById("btn-start").addEventListener("click", () => {
	quiz.start(document.getElementsByClassName("main-quiz")[0]);
})