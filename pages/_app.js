import Header from "./../layout/Header";
import Footer from "../layout/Footer";
import "./../styles/sass/main.scss";
import React from "react";
const MyApp = function({ Component, pageProps }) {
	return (
		<div>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
};

export default MyApp;
