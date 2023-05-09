import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/create-user.dto';
import User from './entities/user-entity';
import UpdateUserDto from './dtos/update-user.dto copy';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUsers(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
