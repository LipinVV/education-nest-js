# NestJS шпаргалка:

```bash
nest generate service books
```

```bash
nest generate controller books
```

```bash
nest generate module books
```

## примеры запросов:

-X (или --request)
-H (или --header)
-d (или --data)

## получение всех книг

curl -X GET http://localhost:3000/books

## получение книги по id

curl -X GET http://localhost:3000/books/1

## создание книги

curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{
"id": "3",
"title": "The third book",
"author": "Somebody, who can write a book"
}'

## обновление книги по id

curl -X PUT http://localhost:3000/books/1 \
-H "Content-Type: application/json" \
-d '{
"id": "3",
"title": "Now - Updated",
"author": "Developer #23"
}'

## удаление книги по id

curl -X DELETE http://localhost:3000/books/1
