import React from "react";

import ReCAPTCHA from "react-google-recaptcha";

const recaptcharef = React.createRef();

const FormInput = ({ label, type, name }) => {
	return (
		<div className="form__group">
			<label className="form__label">{label}</label>
			<input type={type} className="form__text-input" name={name} />
		</div>
	);
};

const FormButton = ({ title }) => {
	return (
		<div className="form__group">
			<button className="form__submit-btn" type="submit">
				{title}
			</button>
		</div>
	);
};

const Form = ({ title, listItems, button, action }) => {
	let elms = listItems.map((elm, i) => {
		return <FormInput key={i} {...elm} />;
	});
	return (
		<form
			action={action}
			className="form"
			onSubmit={() => recaptcharef.current.execute()}
			method="get"
		>
			<div className="u-center-text">
				<h3 className="form__title">{title}</h3>
			</div>
			{elms}
			<ReCAPTCHA
				ref={recaptcharef}
				size="invisible"
				sitekey={"6LdywtsUAAAAAK4wZAkQFEjmJdgbEekzWXi2rEqa"}
			/>
			<FormButton {...button} />
		</form>
	);
};
export default Form;
