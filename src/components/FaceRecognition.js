import React from "react";

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				{imageUrl !== "" ? (
					<img id="inputimage" src={imageUrl} alt="Recognize face(s) here" width="500px" height="auto" />
				) : (
						<p>Please input an image URL for facial recognition</p>
					)}
				<div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} />
			</div>
		</div>
	);
};

export default FaceRecognition;


