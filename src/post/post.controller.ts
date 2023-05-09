import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import PostsService from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import Posts from './entities/post-entity';
import { UpdatePostDto } from './dtos/update-post.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';

@Controller('post')
export class PostController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  async getPosts(): Promise<Posts[]> {
    return await this.postsService.findAll();
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
