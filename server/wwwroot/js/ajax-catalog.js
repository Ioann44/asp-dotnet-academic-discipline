document.addEventListener('DOMContentLoaded', function () {
    // Обработчик для изменений в секции упорядочивания
    const sortingRadios = document.querySelectorAll('input[name="sorting"]');
    sortingRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            fetchData(); // После изменения отправляем запрос на сервер
        });
    });


    // Обработчики для маркеров фильтров
    const filterButtons = document.querySelectorAll('.li-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Добавьте обработку изменения состояния маркера (пустое или с крестиком)
            button.classList.toggle('filter-active');
            button.classList.toggle('filter-passive');
            fetchData(); // После изменения состояния отправляйте запрос на сервер
        });
    });

    // Функция для выполнения AJAX-запроса с использованием текущих фильтров
    function fetchData() {
        const activeSorting = document.querySelector('input[name="sorting"]:checked').value;

        const activeFilters = {
            sortBy: activeSorting,
            dishTypes: [],
            meatAvailability: [],
        };

        // Обработка маркеров фильтров
        filterButtons.forEach(button => {
            if (button.classList.contains('filter-active')) {
                const filterType = button.getAttribute('data-filter-type');
                const filterValue = button.getAttribute('data-filter-value');
                
                // Добавление типа и значения фильтра в объект
                if (filterType === 'dishType') {
                    activeFilters.dishTypes.push(filterValue);
                } else if (filterType === 'meatAvailability') {
                    activeFilters.meatAvailability.push(filterValue);
                }
            }
        });

        // Отправка AJAX-запроса на сервер с активными фильтрами
        fetch(`/api/Dishes?sortBy=${activeFilters.sortBy}&dishTypes=${activeFilters.dishTypes.join(',')}&meatAvailability=${activeFilters.meatAvailability}`)
            .then(response => response.json())
            .then(data => {
                // Очистка текущего содержимого
                const dishCatalogContainer = document.getElementById('dishCatalogContainer');
                dishCatalogContainer.innerHTML = '';

                // Вставка нового содержимого
                data.forEach(dish => {
                    const dishBlock = document.createElement('div');
                    dishBlock.className = 'dish-preview';
                    dishBlock.innerHTML = `
                        <div class="image-wrapper">
                            <img src="data:image/jpeg;base64,${dish.image1}" alt="Dish image">
                        </div>
                        <div class="dish-preview-text">
                            <p>${dish.name}</p>
                            <p>${dish.price} руб</p>
                        </div>
                    `;
                    dishCatalogContainer.appendChild(dishBlock);
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