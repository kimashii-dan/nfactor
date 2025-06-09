# 1. Базовый образ с Python
FROM python:3.12-slim

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем зависимости
COPY requirements.txt .

# 4. Устанавливаем зависимости
RUN pip install -r requirements.txt

# 5. Копируем код
COPY . .

# 6. Команда запуска сервера
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
