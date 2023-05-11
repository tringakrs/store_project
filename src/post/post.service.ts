import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Posts from './entities/post-entity';
import User from 'src/user/entities/user-entity';
import PostNotFoundException from './exceptions/postNotFound.exception';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  // async create(createPostDto: CreatePostDto): Promise<Posts> {
  //   const data = { ...createPostDto };
  //   return await this.postsRepository.save(this.postsRepository.create(data));
  // }

  async create(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  // async findAll(): Promise<Posts[]> {
  //   return await this.postsRepository.find();
  // }

  // findOne(id: number) {
  //   return this.postsRepository.findOneBy({ id });
  // }

  // async update(postId: number, updatePostDto: UpdatePostDto): Promise<Posts> {
  //   const posts = await this.postsRepository.findOneBy({ id: postId });
  //   await this.postsRepository.update((await posts).id, updatePostDto);
  //   return await this.postsRepository.findOneBy({ id: postId });
  // }

  findAll() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async update(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async remove(id: string) {
    const posts = await this.postsRepository.findOneBy({ id: parseInt(id) });
    if (!posts) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return await this.postsRepository.remove(posts);
  }
}
