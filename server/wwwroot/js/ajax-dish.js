function submitRating() {
	const ratingInput = document.getElementById('ratingInput');
	const dishId = 'уникальный_идентификатор_блюда'; // Замените на реальный идентификатор блюда

	if (!isValidRating(ratingInput.value)) {
		alert('Пожалуйста, введите корректную оценку от 1 до 10.');
		return;
	}

	const ratingData = {
		dishId: dishId,
		rating: parseInt(ratingInput.value, 10)
	};

	// Отправка AJAX-запроса на сервер
	fetch('/api/Rating', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(ratingData)
	})
		.then(response => response.json())
		.then(data => {
			// Обновление текста с рейтингом
			const ratingElement = document.getElementById('dishRating');
			ratingElement.textContent = `Рейтинг: ${data.averageRating.toFixed(1)}/10`;
		})
		.catch(error => {
			// Обработка ошибки при запросе
			console.error('Ошибка при отправке оценки:', error);
			alert('Произошла ошибка при отправке оценки. Пожалуйста, повторите попытку.');
		});
}

function isValidRating(value) {
	const parsedValue = parseInt(value, 10);
	return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10;
}