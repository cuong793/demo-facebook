import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateComment } from './dtos/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  async create(@Body() data: CreateComment) {
    return this.commentService.create(data);
  }
}
