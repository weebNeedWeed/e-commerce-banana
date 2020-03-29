import React, { useState } from "react";

import { useRouter } from "next/router";

import callApi from "./../utils/callApi";

const CategoryItem = ({ category }) => {
	const router = useRouter();

	const [subCategory, fetchCategory] = useState([]);

	let openCategory = async (name) => {
		if (subCategory.length === 0) {
			try {
				let data = await callApi(
					`http://localhost:3000/api/category/${name}`
				);
				if (data !== null) {
					fetchCategory(data.subCategory);
				}
			} catch (error) {
				console.log(error);
			}
		} else fetchCategory([]);
	};

	const showProductByCategory = (categoryName) => {
		router.push(`/shop?category=${categoryName}`);
	};

	let displaySubCategory = subCategory.length > 0 ? subCategory : [];
	displaySubCategory = displaySubCategory.map((elm, i) => {
		return <CategoryItem category={elm} key={i} />;
	});

	return (
		<ul className="category__item">
			<li className="category__wrap">
				<button
					className="category__dropdown"
					onClick={() => openCategory(category.name)}
				>
					+
				</button>
				<a
					className="category__link"
					onClick={() => showProductByCategory(category.name)}
				>
					{category.name}
				</a>
				{displaySubCategory}
			</li>
		</ul>
	);
};

const Category = ({ list }) => {
	let categoryDisplayItem = list.map((elm, i) => {
		return <CategoryItem category={elm} key={i} />;
	});
	return (
		<div className="category">
			<p className="category__heading">category</p>
			<div className="category__list"></div>
			{categoryDisplayItem}
		</div>
	);
};
export default Category;
