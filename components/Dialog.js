const Dialog = ({ onCloseForm, messages }) => {
	return (
		<div className="dialog">
			<div className="dialog__container">
				<div className="u-center-text">
					<h3 className="dialog__heading">THONG BAO</h3>
				</div>
				<div className="dialog__content">{messages}</div>
				<div className="dialog__close">
					<button className="dialog__close-btn" onClick={onCloseForm}>
						dong
					</button>
				</div>
			</div>
		</div>
	);
};
export default Dialog;
