let films = []

function validateForm() {
	let title = document.forms["myForm"]["movieName"].value;
	let year = document.forms["myForm"]["year"].value;
	let rating = document.forms["myForm"]["rating"].value;
	if (title == "") {
		alert("Title must be filled out");
	} else if (year == "") {
		alert("Year must be filled out");
	} else if (rating == "" || !(rating<=5)) {
		alert("Rating must be filled out or not greater than 5");
	} else {
		addMovie(title, rating);
		console.log("entering the data");
	}
}

function addMovie(title, rating) {
	let film = {
		"title": title,
		"value": rating
	}
	films.unshift(film);
}

function showMovie() {
	films.sort(function (a, b) {
	  return a.value - b.value;
	});
	films.reverse();
	console.log(films); 
	var e = "";
	for (var y=0; y<films.length; y++)
	{
		e += "<tr><td>" + films[y].title + "</td><td>" + films[y].value + "</td></tr>";
	}
	document.getElementById("moviesTable").innerHTML += e;
	document.getElementById("moviesTable").style.display = "block";
}