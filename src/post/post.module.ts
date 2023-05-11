import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import PostsService from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Posts from './entities/post-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostController],
  providers: [PostsService],
})
export class PostModule {}
