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
import { FindOneParams } from 'src/utils/findOneParams';

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
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.findOne(parseInt(id));
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
