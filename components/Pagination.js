import React from "react";

const Pagination = ({ listPage, page, count, redirectToPage }) => {
	const onRedirectToPage = (page, elm) => {
		if (page !== elm) redirectToPage(elm);
	};
	const listPageItem = listPage.map((elm, i) => {
		return (
			<div
				className={
					"pagination__item" +
					` ${page === elm ? "pagination__item--active" : ""}`
				}
				onClick={() => onRedirectToPage(page, elm)}
				key={i}
			>
				{elm}
			</div>
		);
	});
	const displayLeftArrow = () => {
		if (page > 1)
			return (
				<div className="pagination__item pagination__item--arrow">
					{"<-"}
				</div>
			);
		return null;
	};
	const displayRightArrow = () => {
		if (page < count)
			return (
				<div className="pagination__item pagination__item--arrow">
					{"->"}
				</div>
			);
		return null;
	};

	return (
		<div className="pagination">
			{displayLeftArrow()}
			{listPageItem}
			{displayRightArrow()}
		</div>
	);
};

export default Pagination;
