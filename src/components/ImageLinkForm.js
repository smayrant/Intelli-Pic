import React from "react";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return (
		<div>
			<p className="center f3">Let's detect some faces</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input onChange={onInputChange} className="f4 pa2 w-70 center" type="tex" />
					<button onClick={onSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
