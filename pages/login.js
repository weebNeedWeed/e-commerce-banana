import React from "react";
import Form from "./../components/Form";

const Page = () => {
	const option = {
		action: "/api",
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
		</div>
	);
};

export default Page;
