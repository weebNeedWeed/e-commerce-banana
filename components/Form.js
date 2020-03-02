import React from "react";
import Reaptcha from "reaptcha";
import Link from "next/link";
const FormInput = ({ label, type, name }) => {
	return (
		<div className="form__group">
			<label className="form__label">{label}</label>
			<input type={type} className="form__text-input" name={name} />
		</div>
	);
};

const FormButton = ({ title, onClick }) => {
	return (
		<div className="form__group">
			<button className="form__submit-btn" type="submit">
				{title}
			</button>
		</div>
	);
};

const FormRedirect = ({ btn_2_title, btn_2_href, btn_1_title, btn_1_href }) => {
	return (
		<ul className="form__redirect">
			<li className="form__redirect-item">
				<Link href={btn_1_href ? btn_1_href : "/forgotpassword"}>
					<a className="form__link">
						{btn_1_title ? btn_1_title : "Forgot password ?"}
					</a>
				</Link>
			</li>
			<li className="form__redirect-item">
				<Link href={btn_2_href}>
					<a className="form__link">{btn_2_title}</a>
				</Link>
			</li>
		</ul>
	);
};

const recaptcharef = React.createRef();
const form = React.createRef();
const Form = ({
	title,
	listItems,
	button,
	action,
	btn_2_title,
	btn_2_href,
	btn_1_title,
	btn_1_href
}) => {
	let elms = listItems.map((elm, i) => {
		return <FormInput key={i} {...elm} />;
	});

	const onTriggerCaptcha = (event) => {
		event.preventDefault();
		recaptcharef.current.execute();
	};

	const onVerify = () => {
		form.current.submit();
	};

	return (
		<form
			action={action}
			className="form"
			method="post"
			ref={form}
			onSubmit={onTriggerCaptcha}
		>
			<div className="u-center-text">
				<h3 className="form__title">{title}</h3>
			</div>
			{elms}
			<Reaptcha
				ref={recaptcharef}
				sitekey={process.env.GOOGLE_SITE_KEY}
				onVerify={onVerify}
				size="invisible"
			/>
			<FormRedirect
				btn_2_href={btn_2_href}
				btn_2_title={btn_2_title}
				btn_1_href={btn_1_href}
				btn_1_title={btn_1_title}
			/>
			<FormButton {...button} />
		</form>
	);
};
export default Form;
