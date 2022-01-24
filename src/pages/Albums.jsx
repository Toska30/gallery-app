import React, { useRef, } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {collection,addDoc,serverTimestamp,orderBy,query,where,} from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import { firebaseTimestampToString } from "../helper/time";
import CreateAlbum from "../components/CreateAlbum";
import "../App.scss"


const Albums = () => {
	const { currentUser } = useAuthContext();
	const albumNameRef = useRef();
	const navigate = useNavigate();
	

	const handleClick = async (e) => {
		e.preventDefault();

		if (!albumNameRef.current.value.length) {
			return;
		}

		// Create album doc in firestore with refrence to user doc
		await addDoc(collection(db, "albums"), {
			title: albumNameRef.current.value,
			timestamp: serverTimestamp(),
			owner: currentUser.uid,
		})
			.then(function (docRef) {
				navigate(`/album/${docRef.id}`);
			})
			.catch(function (error) {
			
			});
	};

	//get albums from db
	const queryRef = query(
		collection(db, "albums"),
		where("owner", "==", `${currentUser.uid}`),
		orderBy("timestamp")
	);
	const { data } = useFirestoreQueryData(
		["albums"],
		queryRef,
		{
			idField: "id",
			subscribe: true,
		},
		{
			refetchOnMount: "always",
		}
	);

	return (
		<Container>			
			<h1 className="H1v">My Albums</h1>
			<Row xs={1} md={2} lg={4} xl={5}>
				{data && (
					<>
						{data.length ? (
							<>
								{data.map((album, index) => {
									const timestamp = firebaseTimestampToString(
										album.timestamp
									);

									return (
										<Col key={index}>
											<Card
												text="light"
												bg="dark"
												className="mb-2 text-center"
												as={Link}
												to={`/album/${album.id}`}>
												<Card.Body>
													<Card.Title>
														{album.title}
													</Card.Title>
													<Card.Text>
														{timestamp ?? "-"}
													</Card.Text>
												</Card.Body>
											</Card>
										</Col>
									);
								})}
							</>
						) : (
							<p>
								Sorry...no albums here...🧐
							</p>
						)}
					</>
				)}
			</Row>
			<CreateAlbum data={data} />
		</Container>
	);
};

export default Albums;
