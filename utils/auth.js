import Router from "next/router";

import nextCookie from "next-cookies";

import React from "react";

import callApi from "./callApi";

export const auth = async (ctx) => {
	const { token } = nextCookie(ctx);
	const { match } = await callApi("http://localhost:3000/auth/tokencheck", {
		method: "post",
		body: JSON.stringify({ token }),
		headers: { "content-type": "application/json" }
	});
	if (ctx.req && (!token || !match)) {
		ctx.res.status(302);
		ctx.res.redirect("/login");
		ctx.res.end();
		return;
	}
	if (!token || !match) {
		Router.push("/login");
		return;
	}
	return token;
};

export const withAuthSync = (PageComponent) => {
	const WithAuthSync = function({ ...props }) {
		return <PageComponent {...props} />;
	};

	const getDisplayName = (Component) =>
		Component.displayName || Component.name || "Component";

	WithAuthSync.displayName = `withAuthSync${getDisplayName(PageComponent)}`;

	WithAuthSync.getInitialProps = async function(ctx) {
		const token = await auth(ctx);
		ctx.token = token;
		const pageProps =
			typeof PageComponent.getInitialProps === "function"
				? await PageComponent.getInitialProps(ctx)
				: {};
		return { ...pageProps };
	};
	return WithAuthSync;
};
