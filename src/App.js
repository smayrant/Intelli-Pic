import React, { Component } from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import FaceRecognition from "./components/FaceRecognition";
import Login from "./components/Login";
import Register from "./components/Register";
import Clarifai from "clarifai";
import "./App.scss";

const app = new Clarifai.App({
	apiKey: process.env.REACT_APP_API_KEY
});
class App extends Component {
	constructor () {
		super();
		this.state = {
			input: "",
			imageUrl: "",
			box: {},
			route: "signin",
			isSignedIn: false
		};
	}

	calculateFaceLocation = data => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		};
	};

	displayFaceBox = box => {
		this.setState({ box });
	};

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL,
				// URL for image gathered from user's input
				this.state.input
			)
			// the calculations returned by calculateFaceLocation is placed as an argument into the displayFaceBox function
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)).catch(err => console.log(err)));
	};

	onRouteChange = route => {
		if (route === "signout") {
			this.setState({ isSignedIn: false });
		} else if (route === "home") {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render () {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className="App">
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{route === "home" ? (
					<div>
						<Logo />
						<Rank />
						<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === "login" ? (
					<Login onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
