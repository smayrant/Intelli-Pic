import React from "react";
import Tilt from "react-tilt";
import face from "../img/smile.svg";

const Navigation = () => {
	return (
		<div>
			<Tilt className="Tilt" options={{ max: 65 }} style={{ height: 150, width: 150 }}>
				<div className="Tilt-inner">
					<img src={face} alt="logo" />
				</div>
			</Tilt>
		</div>
	);
};

export default Navigation;
