import React from "react";

import callApi from "../../utils/callApi";

const Page = function({ data }) {
	return (
		<div className="container">
			<div className="product">
				<div
					className="product__image"
					style={{ backgroundImage: `url("${data.image}")` }}
				></div>
				<h1 className="product__name">{data.name}</h1>
				<button className="product__price">buy</button>
			</div>
		</div>
	);
};

Page.getInitialProps = async function(ctx) {
	const { url } = ctx.query;
	try {
		let path = `http://localhost:3000/api/product/${url}`;
		const data = await callApi(path);
		return { data };
	} catch (err) {
		ctx.res.end("bug");
		console.log(err);
	}
	return {};
};

export default Page;
