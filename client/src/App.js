import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Button, Form, Card, CardGroup } from "react-bootstrap";

const App = () => {
	const [movies, setMovies] = useState([
		{
			_id: "",
			title: "",
			genre: "",
			year: "",
		},
	]);
	const [movie, setMovie] = useState({
		_id: "",
		title: "",
		genre: "",
		year: "",
	});
	const [isPut, setisPut] = useState(false);
	const [updatedItem, setupdatedItem] = useState({
		title: "",
		genre: "",
		year: "",
		id: "",
	});

	const [updateTitle, setUpdateTitle] = useState("");
	const [updateGenre, setUpdateGenre] = useState("");
	const [updateYear, setUpdateYear] = useState("");
	useEffect(() => {
		fetch("/movies")
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((jsonRes) => setMovies(jsonRes));
	});
	function handleChange(e) {
		const { name, value } = e.target;
		setMovie((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	}
	function reset() {
		movie.title = "";
		movie.genre = "";
		movie.year = "";
	}
	function reset2() {
		updatedItem.title = "";
		updatedItem.genre = "";
		updatedItem.year = "";
	}
	function addMovie(e) {
		e.preventDefault();
		if (movie.title === "" || movie.genre === "" || movie.year === "") {
			alert("You can't leave any field empty!!");
			return;
		}
		console.log("Movie added");
		const newMovie = {
			_id: movie._id,
			title: movie.title,
			genre: movie.genre,
			year: movie.year,
		};
		axios.post("/newmovie", newMovie);
		alert("Movie Successfully added🎉");
		reset();
	}
	function deleteMovie(id) {
		axios.delete(`/delete/${id}`);
		alert("Movie deleted!");
	}

	function openUpdate(movie) {
		setUpdateTitle(movie.title);
		setUpdateGenre(movie.genre);
		setUpdateYear(movie.year);
		console.log(movie.title);
		setisPut(true);
		setupdatedItem((prevInput) => {
			return {
				...prevInput,
				id: movie._id,
			};
		});
	}

	function updateItem(id) {
		if (
			updatedItem.title === "" ||
			updateItem.genre === "" ||
			updateItem.year === ""
		) {
			alert("You can't leave any field empty!!");
			return;
		}
		axios.put(`/put/${id}`, updatedItem);
		alert("Movie updated");
		reset2();
		setisPut(false);
	}
	function handleUpdate(event) {
		const { name, value } = event.target;
		setupdatedItem((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			};
		});
	}
	return (
		<div className="App">
			{!isPut ? (
				<div className="addForm">
					<h1
						style={{
							fontFamily: "'Maven Pro', sans-serif",
							fontWeight: "bold",
						}}
					>
						Add new Movie
					</h1>
					<br />

					<Form>
						<Form.Group style={{ textAlign: "left" }} className="mb-3">
							<Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="title"
								value={movie.title}
								type="text"
								placeholder="Title"
							/>
						</Form.Group>

						<Form.Group style={{ textAlign: "left" }} className="mb-3">
							<Form.Label style={{ fontWeight: "bold" }}>Genre</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="genre"
								value={movie.genre}
								type="text"
								placeholder="Genre"
							/>
						</Form.Group>
						<Form.Group style={{ textAlign: "left" }} className="mb-3">
							<Form.Label style={{ fontWeight: "bold" }}>Year</Form.Label>
							<Form.Control
								onChange={handleChange}
								name="year"
								value={movie.year}
								type="text"
								placeholder="Year"
							/>
						</Form.Group>
						<br />

						<Button variant="primary" size="lg" onClick={addMovie}>
							Submit
						</Button>
					</Form>
				</div>
			) : (
				<div className="addForm">
					<h1
						style={{
							fontFamily: "'Maven Pro', sans-serif",
							fontWeight: "bold",
						}}
					>
						Update {updateTitle}
					</h1>
					<br />

					<Form>
						<Form.Group style={{ textAlign: "left" }} className="mb-3">
							<Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
							<Form.Control
								onChange={handleUpdate}
								name="title"
								value={updatedItem.title}
								type="text"
								placeholder={updateTitle}
							/>
						</Form.Group>

						<Form.Group style={{ textAlign: "left" }} className="mb-3">
							<Form.Label style={{ fontWeight: "bold" }}>Genre</Form.Label>
							<Form.Control
								onChange={handleUpdate}
								name="genre"
								value={updatedItem.genre}
								type="text"
								placeholder={updateGenre}
							/>
						</Form.Group>
						<Form.Group style={{ textAlign: "left" }} className="mb-3">
							<Form.Label style={{ fontWeight: "bold" }}>Year</Form.Label>
							<Form.Control
								onChange={handleUpdate}
								name="year"
								value={updatedItem.year}
								type="text"
								placeholder={updateYear}
							/>
						</Form.Group>
						<br />

						<Button
							variant="primary"
							size="lg"
							onClick={() => updateItem(updatedItem.id)}
						>
							Update
						</Button>
					</Form>
				</div>
			)}

			<CardGroup style={{ justifyContent: "center" }} className="text-center">
				{movies.map((movie) => {
					return (
						<Card
							key={movie._id}
							className="cardshadow"
							style={{
								minWidth: "500px",
								maxWidth: "500px",
								margin: "1%",
								borderRadius: "10px",
								backgroundColor: "#EEEEEE",
							}}
						>
							<Card.Body>
								<Card.Title
									style={{
										fontSize: "2.4rem",
										fontWeight: "bold",
										fontFamily: "'Zen Tokyo Zoo', cursive",
									}}
								>
									{movie.title}
								</Card.Title>
								<Card.Text
									style={{
										fontFamily: "'Maven Pro', sans-serif",
										fontWeight: "bold",
										fontSize: "1.3rem",
									}}
								>
									{movie.genre}
								</Card.Text>
								<Card.Text
									style={{
										fontFamily: "'Maven Pro', sans-serif",
										fontWeight: "bold",
										fontSize: "1.3rem",
									}}
								>
									{movie.year}
								</Card.Text>
								<Button
									onClick={() => openUpdate(movie)}
									style={{ margin: "0 2px 0 2px" }}
									variant="primary"
								>
									Edit
								</Button>
								<Button
									style={{ margin: "0 2px 0 2px" }}
									variant="danger"
									onClick={() => deleteMovie(movie._id)}
								>
									Delete
								</Button>
							</Card.Body>
						</Card>
					);
				})}
			</CardGroup>
		</div>
	);
};

export default App;
