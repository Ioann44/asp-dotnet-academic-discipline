let form;
let carousel;

function showTemporaryNotification(message, duration = 3000) {
	const notification = document.createElement("div");
	notification.textContent = message;
	notification.classList.add("notification");

	notificationContainer.appendChild(notification);
	notification.style.animation = `slide-down 0.5s ease-in-out forwards, fade-out 0.5s ease-in-out ${duration}ms forwards`;

	setTimeout(() => {
		notification.remove()
	}, duration + 1000);
}

function carouselMove(diff) {
	const images = carousel.getElementsByTagName("img");
	let showedImgIndex = 0;
	for (let i = 0; i < images.length; i++) {
		if (images[i].style.display != "none") {
			showedImgIndex = i;
			images[i].style.display = "none";
			break;
		}
	}
	images[(images.length + showedImgIndex + diff) % images.length].style.display = "block";
}


window.onload = () => {
	const notificationContainer = document.getElementById("notificationContainer");
	carousel = document.getElementsByClassName("about-gallery")[0];
	form = document.getElementsByTagName("form")[0];

	try {
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
	} catch (error) { }

	// try {
	const expandableImages = document.querySelectorAll('.expandable-image');
	const modal = document.getElementById('modal');
	const modalImg = document.getElementById('modalImage');
	const closeBtn = document.getElementsByClassName('close')[0];
	closeBtn.addEventListener('click', function () {
		modal.style.display = 'none';
	});
	[...expandableImages].forEach(image => {
		expandableImages.forEach(image => {
			image.addEventListener('click', function () {
				modal.style.display = 'flex';
				modalImg.src = this.src;
			});
		});
	});
	// } catch (error) { }
}