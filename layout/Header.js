import NavBar from "./NavBar";

const list = [
	{
		title: "login",
		href: "/login"
	},
	{
		title: "register",
		href: "/register"
	},
	{
		title: "home",
		href: "/"
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
