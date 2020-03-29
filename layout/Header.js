import NavBar from "./NavBar";

const list = [
	{
		title: "logu",
		href: "/logu"
	},
	{
		title: "login",
		href: "/login"
	},
	{
		title: "register",
		href: "/register"
	},
	{
		title: "shop",
		href: "/shop"
	}
];

const Header = function() {
	return (
		<header>
			<NavBar list={list} />
		</header>
	);
};

export default Header;
