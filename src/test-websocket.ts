// eslint-disable-next-line @typescript-eslint/no-require-imports
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Запрос всех комментариев для книги с id 2
  socket.emit('getAllComments', 2);

  // Добавление нового комментария к книге с id 2
  socket.emit('addComment', { bookId: 2, comment: 'Interesting book!' });
});

socket.on('commentsList', (comments) => {
  console.log('полученные комментарии:', comments);
});

socket.on('commentAdded', (newComment) => {
  console.log('добавлен новый комментарий:', newComment);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});
