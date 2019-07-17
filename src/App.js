import React, { Component } from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import FaceRecognition from "./components/FaceRecognition";
import Clarifai from "clarifai";
import "./App.scss";

const app = new Clarifai.App({
	apiKey: process.env.REACT_APP_API_KEY
});
class App extends Component {
	state = {
		input: "",
		imageUrl: ""
	};

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	onSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL,
				// URL for image gathered from user's input
				this.state.input
			)
			.then(
				function (response) {
					// do something with response
					console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
				},
				function (err) {
					console.log(err);
				}
			);
	};

	render () {
		return (
			<div className="App">
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
				<FaceRecognition imageUrl={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
