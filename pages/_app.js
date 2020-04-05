import Header from "./../layout/Header";
import Footer from "../layout/Footer";
import "./../styles/sass/main.scss";
import React from "react";
import NextNProgress from "nextjs-progressbar";

const MyApp = function({ Component, pageProps }) {
	return (
		<div>
			<NextNProgress
				color="#1cff37"
				startPosition={0.3}
				stopDelayMs={100}
				height="4"
			/>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
};

export default MyApp;
