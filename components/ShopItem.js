import React from "react";

import Router from "next/router";

const ShopItem = ({ product }) => {
	let handleOnBuy = function(url) {
		let path = `/product/${url}`;
		Router.push(path);
	};

	return (
		<div className="shop-item">
			<div className="shop-item__image"></div>
			<h4 className="shop-item__title">{product.description}</h4>
			<p className="shop-item__price">{product.price}</p>
			<button
				className="shop-item__buy"
				onClick={() => handleOnBuy(product.url)}
			>
				buy
			</button>
			<style jsx>{`
				.shop-item__image {
					background-image: url("${"data:image/png;base64," + product.image}");
				}
			`}</style>
		</div>
	);
};

export default ShopItem;
