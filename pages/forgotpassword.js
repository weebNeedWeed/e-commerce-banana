import React, { useState } from "react";

import Form from "./../components/Form";

import Dialog from "./../components/Dialog";

const Page = ({ error, code, email, action, typedCode }) => {
	const option = {
		action: "/auth/forgotpassword",
		title: "forgot password",
		listItems: [
			{
				label: "your email:",
				type: "email",
				name: "email"
			}
		],
		button: {
			title: "send code"
		},
		btn_2_title: "Login",
		btn_2_href: "/login",
		btn_1_title: "Register",
		btn_1_href: "/register"
	};
	if (code && email) {
		option.listItems = [
			{
				label: "your code:",
				type: "text",
				name: "code"
			}
		];
		option.action = `/auth/codecheck?email=${email}&code=${code}`;
	}

	if (action === "createnewpassword") {
		option.listItems = [
			{
				label: "password:",
				type: "password",
				name: "password"
			},
			{
				label: "retype-password:",
				type: "password",
				name: "retypePassword"
			}
		];
		option.button = {
			title: "create new password"
		};
		option.action = `/auth/createnewpassword?code=${typedCode}&email=${email}`;
	}

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
	let action = req && req.query.action !== "" ? req.query.action : "";
	let code = req && req.query.code !== "" ? req.query.code : "";
	let email = req && req.query.email !== "" ? req.query.email : "";
	let typedCode =
		req && req.query.typedCode !== "" ? req.query.typedCode : "";
	return { error, code, email, action, typedCode };
};

export default Page;
