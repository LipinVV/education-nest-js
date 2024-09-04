import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BookCommentsService } from '../book-comments/book-comments.service';

@WebSocketGateway()
export class CommentsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('getAllComments')
  async handleGetAllComments(@MessageBody() bookId: number): Promise<void> {
    const comments = await this.bookCommentsService.findAllBookComment(bookId);
    this.server.emit('commentsList', comments);
  }

  @SubscribeMessage('addComment')
  async handleAddComment(
    @MessageBody() { bookId, comment }: { bookId: number; comment: string },
  ): Promise<void> {
    const newComment = await this.bookCommentsService.create({
      bookId,
      comment,
    });
    this.server.emit('commentAdded', newComment);
  }
}
