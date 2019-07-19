import React from "react";

const Rank = ({ name, entries }) => {
	return (
		<div className="center">
			<div className="white f2">{`${name}, your current entry count is... ${entries}`}</div>
			<div className="white f2">4</div>
		</div>
	);
};

export default Rank;
