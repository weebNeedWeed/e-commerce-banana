import { useRouter } from "next/router";

import React, { useState } from "react";

const Search = () => {
	const router = useRouter();

	const [keyWord, setKeyWord] = useState("");

	const onChange = (event) => {
		let target = event.target;
		setKeyWord(target.value);
	};

	const keyWordValidate = (event) => {
		if (!keyWord) {
			event.preventDefault();
		}
	};

	return (
		<div className="search">
			<input
				type="text"
				className="search__input"
				placeholder="tim kiem"
				onChange={onChange.bind(this)}
				value={keyWord}
			/>

			<a
				onClick={keyWordValidate}
				href={`/shop?${
					router.query.category
						? "category=" + router.query.category + "&"
						: ""
				}${keyWord ? "keyword=" + keyWord : ""}`}
				className="search__button"
			>
				<i className="fas fa-search search__icon"></i>
			</a>
		</div>
	);
};
export default Search;
