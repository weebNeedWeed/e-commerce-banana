import React, { useState } from "react";

import Form from "./../components/Form";

import Dialog from "./../components/Dialog";
const Page = ({ error }) => {
	const option = {
		action: "/auth/login",
		title: "login",
		listItems: [
			{
				label: "email:",
				type: "email",
				name: "email"
			},
			{
				label: "password:",
				type: "password",
				name: "password"
			}
		],
		button: {
			title: "login"
		},
		btn_2_title: "Register",
		btn_2_href: "/register"
	};

	const [isDisplayDialog, setDisplayStatus] = useState(error.length > 0);
	const onCloseForm = function() {
		setDisplayStatus(false);
	};
	let messages = error.map((elm, i) => {
		return <p key={i}>{elm}</p>;
	});
	let dialog = isDisplayDialog ? (
		<Dialog onCloseForm={onCloseForm} messages={messages} />
	) : null;
	return (
		<div className="container">
			<Form {...option} />
			{dialog}
		</div>
	);
};

Page.getInitialProps = async function({ req }) {
	let error = [];
	if (req && req.flash) error = [...req.flash("error")] || [];
	return { error };
};

export default Page;
