import Link from "next/link";

import { useRouter } from "next/router";

const _NavBarItem = ({ href, title }) => {
	const router = useRouter();
	let str = "";
	if (router.pathname === href) str = " navbar__link--active";
	return (
		<li className="navbar__item">
			<Link href={href}>
				<a className={"navbar__link" + str}>{title.toLowerCase()}</a>
			</Link>
		</li>
	);
};

const NavBar = ({ list }) => {
	const elms = list.map((elm, i) => {
		return <_NavBarItem {...elm} key={i} />;
	});
	return (
		<nav className="navbar">
			<a href="/" className="navbar__logo-link">
				<img
					src="/images/banana_logo.png"
					alt="banana shop logo"
					className="navbar__logo"
				/>
			</a>
			<ul className="navbar__list">{elms}</ul>
		</nav>
	);
};
export default NavBar;
