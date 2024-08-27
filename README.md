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

-X (или --request)
-H (или --header)
-d (или --data)

## Получение всех книг

curl -X GET http://localhost:3000/books

## Получение книги по id

curl -X GET http://localhost:3000/books/1

## Создание книги

curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{
"id": "3",
"title": "The third book",
"author": "Somebody, who can write a book"
}'

## Обновление книги по id

curl -X PUT http://localhost:3000/books/1 \
-H "Content-Type: application/json" \
-d '{
"id": "3",
"title": "Now - Updated",
"author": "Developer #23"
}'

## Удаление книги по id

curl -X DELETE http://localhost:3000/books/1

## Запрос через RxJs к github
curl -X GET http://localhost:3000/rxjs/github?q=nodejs

## Запрос через RxJs к gitlab
curl -X GET http://localhost:3000/rxjs/gitlab?q=nodejs
