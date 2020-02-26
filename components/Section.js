const Section = ({ children, color }) => {
	return (
		<section className={"section section--" + color}>{children}</section>
	);
};
export default Section;
