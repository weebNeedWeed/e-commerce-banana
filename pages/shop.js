import React, { useState } from "react";

import Search from "./../components/Search";

import Category from "./../components/Category";

import ShopItem from "./../components/ShopItem";

import Pagination from "./../components/Pagination";

import callApi from "./../utils/callApi";

import { useRouter } from "next/router";

const Page = function(props) {
	const router = useRouter();
	const count = props.pageCount;

	const pageCount = (7 - 1) / 2;
	let page = router.query.page
		? typeof parseInt(router.query.page, 10) == "number" &&
		  !isNaN(parseInt(router.query.page, 10))
			? parseInt(router.query.page, 10)
			: 1
		: 1;

	if (page > count) page = count;

	const redirectToPage = function(pageNum) {
		let routerCateQuery = router.query.category
			? "category=" + router.query.category + "&"
			: "";
		let routerKeyWordQuery = router.query.keyword
			? "keyword=" + router.query.keyword + "&"
			: "";
		let routerPageNumQuery = "page=" + pageNum;

		let path = `/shop?${routerCateQuery +
			routerKeyWordQuery +
			routerPageNumQuery}`;

		// const pathAs = `/shop/${
		// 	routerCateQuery ? routerCateQuery + "/" : ""
		// }${pageNum}`;
		router.push(path);
	};

	const listPaging = function() {
		let pagingArray = [];
		for (let i = page - pageCount; i <= page + pageCount; ++i) {
			if (i > 0 && i <= count) pagingArray.push(i);
		}
		return pagingArray;
	};

	const cateDisplay =
		props.cateDisplay !== null ? (
			<Category list={props.cateDisplay} />
		) : null;

	const emptyListProduct = (
		<div className="empty-list-product">khong co sp de hien thi</div>
	);

	let displayShopItem =
		props.listProduct.length > 0
			? props.listProduct.map((elm, i) => {
					return <ShopItem product={elm} key={i} />;
			  })
			: emptyListProduct;

	return (
		<div className="container">
			<div className="shop-container">
				<Search />
				<div className="shop-buying">
					{cateDisplay}
					<div className="list-items">{displayShopItem}</div>
				</div>
				<div className="u-margin-top-4rem">
					<Pagination
						listPage={listPaging()}
						page={page}
						count={count}
						redirectToPage={redirectToPage.bind(this)}
					/>
				</div>
			</div>
		</div>
	);
};

Page.getInitialProps = async (ctx) => {
	const query = ctx.query;
	let cateDisplay, listProduct, pageCount;
	const page = query.page
		? typeof parseInt(query.page, 10) == "number" &&
		  !isNaN(parseInt(query.page, 10))
			? parseInt(query.page, 10)
			: 1
		: 1;
	const cateQuery = query.category;
	const keywordQuery = query.keyword;
	try {
		cateDisplay = await callApi("http://localhost:3000/api/category", {
			method: "GET"
		});
		cateDisplay = cateDisplay.filter((elm) => {
			return elm.level === 0;
		});

		let pageUrl = "page=" + page;
		let cateUrl = cateQuery ? "&category=" + cateQuery : "";
		let keywordUrl = keywordQuery ? "&keyword=" + keywordQuery : "";

		listProduct = await callApi(
			`http://localhost:3000/api/product?${pageUrl}${cateUrl}${keywordUrl}`,
			{
				method: "GET"
			}
		);

		pageCount = await callApi(
			"http://localhost:3000/api/product?pagecount=true"
		);
		pageCount = parseInt(pageCount.count, 10);
	} catch (err) {
		console.log(err);
		cateDisplay = null;
		listProduct = null;
		listProduct = 0;
	}
	return {
		cateDisplay,
		listProduct,
		pageCount
	};
};

export default Page;
