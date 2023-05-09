import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostInterface } from './interface/post.interface';
import { UpdatePostDto } from './dtos/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Posts from './entities/post-entity';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    const data = { ...createPostDto };
    return await this.postsRepository.save(this.postsRepository.create(data));
  }

  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOneBy({ id });
  }

  async update(postId: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    const posts = await this.postsRepository.findOneBy({ id: postId });
    await this.postsRepository.update((await posts).id, updatePostDto);
    return await this.postsRepository.findOneBy({ id: postId });
  }

  async remove(id: string) {
    const posts = await this.postsRepository.findOneBy({ id: parseInt(id) });
    if (!posts) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return await this.postsRepository.remove(posts);
  }
}
