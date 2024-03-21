document.addEventListener('DOMContentLoaded', function () {
	const addButton = document.querySelector('button[type="submit"]');
	addButton.addEventListener('click', addDish);

	function addDish() {
		const dishData = {
			Name: document.getElementById('dishName').value,
			Description: document.getElementById('dishDescription').value,
			Ingredients: document.getElementById('dishIngredients').value,
			Rating: parseFloat(document.getElementById('dishRating').value),
			Price: parseInt(document.getElementById('dishPrice').value),
			Type: document.getElementById('dishType').value,
			MeatAvailability: document.getElementById('meatAvailability').value,
		};

		// Получение изображения из input
		const imageInput = document.getElementById('dishImage');
		const imageFile = imageInput.files[0];

		if (imageFile) {
			const reader = new FileReader();
			reader.onload = function (e) {
				dishData.Image1 = e.target.result.split(",")[1];
				console.log(dishData);

				// Отправка данных на сервер
				fetch('http://localhost:3000/api/dishes', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(dishData),
				})
					.then(response => response.json())
					.then(data => {
						console.log('Success:', data);
						// Дополнительные действия после успешного добавления блюда
					})
					.catch((error) => {
						console.error('Error:', error);
					});
			};

			reader.readAsDataURL(imageFile);
		} else {
			alert('Выберите изображение блюда');
		}
	}
});