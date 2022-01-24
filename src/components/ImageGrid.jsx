import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ImageView from "./ImageView";

const ImageGrid = ({ query, review }) => {
	return (
		<Row className="grid-row" xs={1} md={2}>
			{query &&
				query.map((img) => (
					<Col key={img._id}>
						<ImageView img={img} review={review} />
					</Col>
				))}
		</Row>
	);
};

export default ImageGrid;
