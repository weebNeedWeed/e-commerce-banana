import React from "react";
import Dialog from "./../components/Dialog";
import Form from "../components/Form";

const Page = () => {
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
		}
	};
	return (
		<div className="container">
			<Form {...option} />
			<Dialog />
		</div>
	);
};
export default Page;
