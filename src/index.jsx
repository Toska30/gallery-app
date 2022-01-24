import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./assets/scss/App.scss";
import AuthContext from "./contexts/AuthContext";
import SimpleReactLightbox from "simple-react-lightbox";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 1,
			cacheTime: 1000 * 60 * 60 * 2,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<SimpleReactLightbox>
			<QueryClientProvider client={queryClient}>
				<AuthContext>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AuthContext>
			</QueryClientProvider>
		</SimpleReactLightbox>
	</React.StrictMode>,
	document.getElementById("root")
);
