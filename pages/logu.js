import React, { useState } from "react";

import Form from "./../components/Form";

import Dialog from "./../components/Dialog";

import { withAuthSync } from "./../utils/auth";

const Page = ({ error }) => {
	const option = {
		action: "/auth/login",
		title: "login",
		listItems: [
			{
				label: "email:",
				type: "email",
				name: "email",
			},
			{
				label: "password:",
				type: "password",
				name: "password",
			},
		],
		button: {
			title: "login",
		},
		btn_2_title: "Register",
		btn_2_href: "/register",
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

Page.getInitialProps = async function(ctx) {
	let error = [];
	if (ctx.req && ctx.req.flash) error = [...ctx.req.flash("error")] || [];
	return { error, token: ctx.token };
};

export default withAuthSync(Page);
