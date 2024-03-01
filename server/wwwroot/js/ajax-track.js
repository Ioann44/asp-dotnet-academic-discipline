document.addEventListener('DOMContentLoaded', function () {
	const orderIdInput = document.getElementById('order-id-value');
	const trackOrderButton = document.getElementById('track-order-button');
	const orderTable = document.getElementById('order-table');

	trackOrderButton.addEventListener('click', function () {
		const orderId = orderIdInput.value;

		if (orderId.trim() === '') {
			orderTable.innerHTML = '';
			console.error('ID заказа не указан.');
			return;
		}

		fetch(`/api/Order/${orderId}`)
			.then(response => response.json())
			.then(data => {
				const expectedDeliveryTime = new Date(data.expectedDeliveryTime);

				orderTable.innerHTML = `
					<tr>
						<th>Статус:</th>
						<td>${data.status}</td>
					</tr>
					<tr>
						<th>Адрес:</th>
						<td>${data.address}</td>
					</tr>
					<tr>
						<th>Ожидаемое время доставки:</th>
						<td>${formatDate(expectedDeliveryTime)}</td>
					</tr>
				`;
			})
			.catch(error => console.error('Ошибка при получении данных заказа:', error));
	});

	function formatDate(date) {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	}
});