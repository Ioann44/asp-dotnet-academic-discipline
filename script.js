let form;

window.onload = () => {
	form = document.getElementsByTagName("form")[0];

	form.addEventListener("submit", event => {
		event.preventDefault();

		const inputs = form.querySelectorAll("input")
		// name
		const name = inputs[0].value.trim();
		if (name.length < 2) {
			alert("Имя не может быть короче 2 букв");
			return;
		}
		// phone
		const phone = inputs[1].value;
		const phoneRe = /^(\+7|8)[-\s]?(?:\((\d{3})\)|(\d{3}))[-\s]?(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})$/;
		if (!phone.match(phoneRe)) {
			alert("Номер введён неверно");
			return;
		}
		// mail
		const mail = inputs[2].value.trim();
		const mailRe = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
		if (!mail.match(mailRe)) {
			alert("E-mail введён неверно");
			return;
		}
		// adress
		const adress = inputs[3].value.trim();
		if (adress.length < 10) {
			alert("Длина адреса слишком короткая");
			return;
		}
		// bonus
		const bonus = inputs[4].value;
		const bonusRe = /^(?:\d{9}$|)$/;
		if (!bonus.match(bonusRe)) {
			alert("Наши промокоды состоят из 9 цифр");
			return;
		}
		// comment
		const comment = inputs[5].value;

		alert("Все данные введены верно");
		// form.reset();
	})
}