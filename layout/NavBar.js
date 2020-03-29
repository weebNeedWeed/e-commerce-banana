import React from "react";

import Link from "next/link";

import { useRouter } from "next/router";

const NavBarItem = ({ href, title, reload }) => {
	const router = useRouter();
	let str = "";
	if (router.pathname === href) str = " navbar__link--active";
	const link = reload ? (
		<a href={href} className={"navbar__link" + str}>
			{title.toLowerCase()}
		</a>
	) : (
		<Link href={href}>
			<a className={"navbar__link" + str}>{title.toLowerCase()}</a>
		</Link>
	);
	return <li className="navbar__item">{link}</li>;
};

const NavBar = ({ list }) => {
	const elms = list.map((elm, i) => {
		return <NavBarItem {...elm} key={i} />;
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
