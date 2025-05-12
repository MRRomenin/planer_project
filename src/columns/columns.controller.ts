import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/create-column.dto';
import { AuthGuard } from '../users/authentication/auth.guard';
import { OwnershipGuard } from '../users/ownership.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('users/:userId/columns')  // Указываем, что все эндпоинты будут работать с userId и колонками

@UseGuards(AuthGuard, OwnershipGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  
  // POST метод для создания колонки

  @Post()
  create(
    @Param('userId') userId: number,     // Получаем userId из URL
    @Body() createColumnDto: CreateColumnsDto  // Получаем данные колонки из тела запроса
  ) {
    return this.columnsService.create(userId, createColumnDto);  // Передаем оба параметра в сервис
  }

  // GET метод для получения всех колонок пользователя

  @Get()
  findAll(@Param('userId') userId: number, @Request() request) {
    console.log('User in ColumnsController:', request.user);
    return this.columnsService.findAll(userId);  // Получаем все колонки для пользователя
  }

  // GET метод для получения одной колонки по userId и columnId


  @Get(':columnId')
  findOne(
    @Param('userId') userId: number,      // Извлекаем userId из URL
    @Param('columnId') columnId: number   // Извлекаем columnId из URL
  ) {
    return this.columnsService.findOne(userId, columnId);  // Передаем параметры в сервис
  }

  // PUT метод для обновления колонки
  @Put(':columnId')
  update(
    @Param('userId') userId: number,      // Извлекаем userId из URL
    @Param('columnId') columnId: number,  // Извлекаем columnId из URL
    @Body() createColumnDto: CreateColumnsDto  // Данные для обновления колонки из тела запроса
  ) {
    return this.columnsService.update(userId, columnId, createColumnDto);  // Передаем параметры в сервис
  }

  // DELETE метод для удаления колонки
  @Delete(':columnId')
  remove(
    @Param('userId') userId: number,      // Извлекаем userId из URL
    @Param('columnId') columnId: number   // Извлекаем columnId из URL
  ) {
    return this.columnsService.remove(userId, columnId);  // Передаем параметры в сервис
  }
}