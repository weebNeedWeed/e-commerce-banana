import { Fragment } from "react";

import Header from "./../layout/Header";

import "./../styles/sass/main.scss";
import Footer from "../layout/Footer";

const MyApp = function({ Component, pageProps }) {
	return (
		<Fragment>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</Fragment>
	);
};

export default MyApp;
