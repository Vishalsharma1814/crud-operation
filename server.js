import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import EventEmitter from "events";
const PORT = 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

//mongoose connection
mongoose.connect(
	"mongodb+srv://vishal:vishal@cluster0.huv99.mongodb.net/mern-app?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

//schema and model
const movieSchema = {
	title: String,
	genre: String,
	year: String,
};

const Movie = mongoose.model("Movie", movieSchema);

//routes
app.get("/movies", function (req, res) {
	Movie.find().then((movies) => res.json(movies));
});

app.post("/newmovie", function (req, res) {
	const title = req.body.title;
	const genre = req.body.genre;
	const year = req.body.year;

	const newMovie = new Movie({
		title,
		genre,
		year,
	});

	newMovie.save();
});

app.delete("/delete/:id", function (req, res) {
	const id = req.params.id;
	Movie.findByIdAndDelete({ _id: id }, function (err) {
		if (!err) {
			console.log("Movie deleted!");
		} else {
			console.log(err);
		}
	});
});

app.put("/put/:id", (req, res) => {
	const updatedItem = {
		title: req.body.title,
		genre: req.body.genre,
		year: req.body.year,
	};
	Movie.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $set: updatedItem },
		(req, res, err) => {
			if (!err) {
				console.log("item updated");
			} else {
				console.log(err);
			}
		}
	);
});

app.listen(PORT, function () {
	console.log(`listening on port ${PORT}`);
});
