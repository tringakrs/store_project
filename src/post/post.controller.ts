import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PostsService from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import Posts from './entities/post-entity';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  async getPosts(): Promise<Posts[]> {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Put('/:id')
  updatePost(@Param('id') id: number, @Body() body: UpdatePostDto) {
    return this.postsService.update(id, body);
  }

  @Delete('/:id')
  async removePost(@Param('id') id: string) {
    return await this.postsService.remove(id);
  }
}
