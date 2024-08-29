# NestJS шпаргалка:

## Старт проекта
```bash
nest start --watch
```

## Генерации частей проекта
```bash
nest generate service books
```

```bash
nest generate controller books
```

```bash
nest generate module books
```

## Примеры запросов:
```bash
-X (или --request)
-H (или --header)
-d (или --data)
```

## Получение всех книг
```bash
curl -X GET http://localhost:3000/books
```

## Получение книги по id
```bash
curl -X GET http://localhost:3000/books/1
```

## Создание книги
```bash
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{
"id": "3",
"title": "The third book",
"author": "Somebody, who can write a book"
}'
```

## Обновление книги по id
```bash
curl -X PUT http://localhost:3000/books/1 \
-H "Content-Type: application/json" \
-d '{
"id": "3",
"title": "Now - Updated",
"author": "Developer #23"
}'
```

## Удаление книги по id
```bash
curl -X DELETE http://localhost:3000/books/1
```

## Запрос через RxJs к github
```bash
curl -X GET http://localhost:3000/rxjs/github?q=nodejs
```

## Запрос через RxJs к gitlab
```bash
curl -X GET http://localhost:3000/rxjs/gitlab?q=nodejs
```

## Регистрация пользователя
```bash
curl -X POST http://localhost:3000/users/signup \
-H "Content-Type: application/json" \
-d '{
"email": "test@example.com",
"password": "securepassword",
"firstName": "John",
"lastName": "Doe"
}'
```

## Логин пользователя
```bash
curl -X POST http://localhost:3000/users/signin \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "securepassword"
}'
```

## Найти пользователя по token (ID)
```bash
curl -X GET http://localhost:3000/users/1 "Authorization: Bearer <токен>"
```
