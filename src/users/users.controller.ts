import {Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, ValidationPipe
  ,UsePipes} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
// import { UpdateUserDto } from './update-user.dto';
import { ColumnsService } from '../columns/columns.service';
import { CreateColumnsDto } from '../columns/dto/create-column.dto';
// import { User } from './user.entity';

import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly columService: ColumnsService,) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.update(id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // Other endpoints
}

