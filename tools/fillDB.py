import requests
import os
from base64 import b64encode

api_url = "https://localhost:3000/api/dishes"

dishes_data = [
    {
        "Name": "Борщ",
        "Description": "Описание борща",
        "Ingredients": "Капуста, мясо",
        "Rating": 4.5,
        "RatingCount": 20,
        "Price": 250,
        "Type": "first",
        "meatAvailability": "meat",
    },
    {
        "Name": "Пельмени с мясом",
        "Description": "Описание пельменей",
        "Ingredients": "Мясо, тесто",
        "Rating": 4.0,
        "RatingCount": 15,
        "Price": 180,
        "Type": "second",
        "meatAvailability": "meat",
    },
    {
        "Name": "Цезарь-салат",
        "Description": "Описание салата",
        "Ingredients": "Курица, салат",
        "Rating": 4.7,
        "RatingCount": 25,
        "Price": 320,
        "Type": "other",
        "meatAvailability": "meat",
    },
    {
        "Name": "Пицца 'Маргарита'",
        "Description": "Описание пиццы",
        "Ingredients": "Тесто, помидоры, сыр",
        "Rating": 4.8,
        "RatingCount": 30,
        "Price": 400,
        "Type": "second",
        "meatAvailability": "meat",
    },
    {
        "Name": "Суши ролл 'Филадельфия'",
        "Description": "Описание суши",
        "Ingredients": "Рыба, рис, огурец",
        "Rating": 4.9,
        "RatingCount": 40,
        "Price": 550,
        "Type": "second",
        "meatAvailability": "fish",
    },
    {
        "Name": "Стейк из говядины",
        "Description": "Описание стейка",
        "Ingredients": "Говядина, приправы",
        "Rating": 4.6,
        "RatingCount": 18,
        "Price": 700,
        "Type": "meat",
        "meatAvailability": "meat",
    },
    {
        "Name": "Лобстер с маслом",
        "Description": "Описание лобстера",
        "Ingredients": "Лобстер, масло",
        "Rating": 4.2,
        "RatingCount": 12,
        "Price": 1200,
        "Type": "meat",
        "meatAvailability": "seafood",
    },
    {
        "Name": "Тирамису",
        "Description": "Описание тирамису",
        "Ingredients": "Маскарпоне, бисквит",
        "Rating": 4.4,
        "RatingCount": 22,
        "Price": 220,
        "Type": "dessert",
        "meatAvailability": "vegetarian",
    },
    {
        "Name": "Фруктовый коктейль",
        "Description": "Описание коктейля",
        "Ingredients": "Фрукты, сок",
        "Rating": 4.3,
        "RatingCount": 17,
        "Price": 150,
        "Type": "drinks",
        "meatAvailability": "vegetarian",
    },
]

# Предполагаем, что изображения находятся в директории с теми же именами, что и блюда
image_dir = "../server/wwwroot/images"

for dish_data in dishes_data:
    # Чтение изображения
    image_path = os.path.join(image_dir, f"{dish_data['Name'].lower()}.jpg")
    with open(image_path, "rb") as image_file:
        image_data = b64encode(image_file.read()).decode("utf-8")

    # Подготовка данных для запроса
    dish_data["Image1"] = image_data
    dish_data["Image2"] = image_data
    dish_data["Image3"] = image_data

    # Отправка POST-запроса для создания блюда
    response = requests.post(api_url, json=dish_data)

    if response.status_code == 201:
        print(f"Блюдо '{dish_data['Name']}' успешно добавлено.")
    else:
        print(f"Ошибка при добавлении блюда '{dish_data['Name']}': {response.status_code}, {response.text}")
