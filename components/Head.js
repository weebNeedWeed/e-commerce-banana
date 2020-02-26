import NextHead from "next/head";

const Head = ({ title, description }) => {
	title = title || "banana-shop".toUpperCase();
	description =
		description || "banana-shop - online selling banana".toUpperCase();
	return (
		<NextHead>
			<title>{title}</title>
			<meta name="description" content={description}></meta>
		</NextHead>
	);
};
export default Head;
