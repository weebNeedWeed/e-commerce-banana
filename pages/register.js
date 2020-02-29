import Form from "./../components/Form";
import React, { useState } from "react";
import Dialog from "./../components/Dialog";

const Page = ({ error }) => {
	const option = {
		action: "/auth/register",
		title: "register",
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
			},
			{
				label: "retype-password:",
				type: "password",
				name: "retypePassword"
			}
		],
		button: {
			title: "register"
		},
		btn_2_title: "Login",
		btn_2_href: "/login"
	};
	const [isDisplayDialog, setDisplayStatus] = useState(error.length > 0);
	let onCloseForm = () => setDisplayStatus(false);
	let messages = error.map((elm, i) => {
		return <p key={i}>{elm}</p>;
	});
	let dialog = isDisplayDialog ? (
		<Dialog messages={messages} onCloseForm={onCloseForm} />
	) : null;
	return (
		<div className="container">
			<Form {...option} />
			{dialog}
		</div>
	);
};

Page.getInitialProps = async ({ req }) => {
	let error = [];
	if (req && req.flash) error = [...req.flash("error")] || [];
	return { error };
};

export default Page;
