import Document, { Html, Head, Main, NextScript } from "next/document";

export default class extends Document {
	render() {
		return (
			<Html lang="vi">
				<Head>
					<meta charSet="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link
						rel="stylesheet"
						href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
					/>

					<link
						href="https://fonts.googleapis.com/css?family=Lacquer|Lato:300,300i,400,400i,700&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="shortcut icon"
						type="image/png"
						href="/images/banana_icon.png"
					/>
					<script
						src="https://kit.fontawesome.com/86fe697766.js"
						crossOrigin="anonymous"
					></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
