import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import Navigation from "./pages/partials/Navigation";
import Preview from "./pages/Preview";
import Review from "./pages/Review";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Albums from "./pages/Albums";
import Album from "./pages/Album";
import CreateAlbumPage from "./pages/CreateAlbumPage";
import Logout from "./pages/Logout";
import "./App.scss"



function App() {
	return (
		<div className="pb-5" id="App">
			<Navigation />
		
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/album/:id/preview/"element={<Preview />}/>
					<Route path="/LogIn" element={<Login />} />
					<Route path="/SignUp" element={<SignUp />} />
					<Route path="/review/:id/" element={<Review />}/>
					<Route path="/LogOut" element={<Logout />} />
					<Route path="/albums" element={
							<RequireAuth>
								<Albums />
							</RequireAuth>
						}
					/>
	                 <Route
						path="/create-album"
						element={
							<RequireAuth redirectTo="/LogIn">
								<CreateAlbumPage/>
							</RequireAuth>
						}
					/>
					<Route
						path="/album/:id"
						element={
							<RequireAuth redirectTo="/LogIn">
								<Album />
							</RequireAuth>
						}
					/>
				
				</Routes>

				<ReactQueryDevtools
					initialIsOpen={false}
					position="bottom-right"
				/>
		
			</div>
	);
}

export default App;
