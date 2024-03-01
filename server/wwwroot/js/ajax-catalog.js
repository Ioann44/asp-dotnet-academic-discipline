document.addEventListener('DOMContentLoaded', function () {
	// Функция для выполнения AJAX-запроса
	function fetchData() {
		fetch('/api/Dish') // URL вашего контроллера API
			.then(response => response.json())
			.then(data => {
				// Обработка данных, например, вставка их на страницу
				const dishContainer = document.querySelector('.dish-catalog-container');
				data.forEach(dish => {
					const dishBlock = document.createElement('div');
					dishBlock.className = 'dish-preview';
					dishBlock.innerHTML = `
						<div class="image-wrapper">
							<img src="../images/${dish.name}.jpg" alt="Dish image">
						</div>
						<div class="dish-preview-text">
							<p>${dish.name}</p>
							<p>${dish.price} руб</p>
						</div>
					`;
					dishContainer.appendChild(dishBlock);
				});
			})
			.catch(error => console.error('Ошибка при получении данных:', error));
	}

	// Вызываем функцию для получения данных после загрузки страницы
	fetchData();
});

document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('dishSearch');
	const suggestionsContainer = document.getElementById('suggestionsContainer');

	searchInput.addEventListener('input', function () {
		const query = searchInput.value.trim();

		if (query.length === 0) {
			suggestionsContainer.innerHTML = '';
			return;
		}

		fetch(`/api/Dish/search?query=${query}`)
			.then(response => response.json())
			.then(data => {
				suggestionsContainer.innerHTML = '';

				data.forEach((suggestion, index) => {
					const suggestionItem = document.createElement('div');
					suggestionItem.textContent = suggestion;
					suggestionItem.classList.add('suggestion');
					suggestionItem.addEventListener('click', function () {
						searchInput.value = suggestion;
						suggestionsContainer.innerHTML = '';
					});
					suggestionItem.addEventListener('mouseover', function () {
						setActiveSuggestion(index);
					});
					suggestionsContainer.appendChild(suggestionItem);
				});
			})
			.catch(error => console.error('Ошибка при получении предложений:', error));
	});

	searchInput.addEventListener('keydown', function (event) {
		const suggestions = document.querySelectorAll('.suggestion');
		let activeIndex = Array.from(suggestions).findIndex(s => s.classList.contains('active'));

		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault();
				setActiveSuggestion(Math.max(activeIndex - 1, 0));
				break;
			case 'ArrowDown':
				event.preventDefault();
				setActiveSuggestion(Math.min(activeIndex + 1, suggestions.length - 1));
				break;
			case 'Enter':
				const activeSuggestion = document.querySelector('.suggestion.active');
				if (activeSuggestion) {
					searchInput.value = activeSuggestion.textContent;
					suggestionsContainer.innerHTML = '';
				}
				break;
		}
	});

	function setActiveSuggestion(index) {
		const suggestions = document.querySelectorAll('.suggestion');
		suggestions.forEach((suggestion, i) => {
			suggestion.classList.toggle('active', i === index);
		});
	}
});