import React from "react";

import Head from "./../components/Head";

import { Fragment } from "react";

import Intro from "./../components/Intro";
import Section from "../components/Section";

const Page = function() {
	return (
		<Fragment>
			<Head />
			<Intro />
			<Section color="1">
				<div className="section__group">
					<h2 className="section__text">FREE BANANA</h2>
					<a href="" className="section__btn section__btn--1">
						GET NOW
					</a>
				</div>
				<img
					src="/images/banana-1.png"
					alt="banana-1"
					className="section__image"
				/>
			</Section>
			<Section color="1">
				<img
					src="/images/banana-1.png"
					alt="banana-1"
					className="section__image"
				/>
				<div className="section__group">
					<h2 className="section__text">50% off</h2>
					<a href="" className="section__btn section__btn--1">
						buy NOW
					</a>
				</div>
			</Section>
		</Fragment>
	);
};

export default Page;
