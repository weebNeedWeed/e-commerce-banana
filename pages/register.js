import Form from "./../components/Form";
import React from "react";

const Page = () => {
	const option = {
		action: "/api",
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
				name: "retype-password"
			}
		],
		button: {
			title: "register"
		}
	};
	return (
		<div className="container">
			<Form {...option} />
		</div>
	);
};

export default Page;
