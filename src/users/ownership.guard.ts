import {
   CanActivate,
   ExecutionContext,
   Injectable,
   NotFoundException,
   ForbiddenException,
 } from '@nestjs/common';
 import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
 import { ColumnEntity } from '../columns/columns.entity';
 import { CardEntity } from '../cards/cards.entity';
 import { CommentEntity } from '../comments/comments.entity';
 import { Request } from 'express';
 
 @Injectable()
 export class OwnershipGuard implements CanActivate {
   constructor(
     @InjectRepository(ColumnEntity)
     private readonly columnRepo: Repository<ColumnEntity>,
     @InjectRepository(CardEntity)
     private readonly cardRepo: Repository<CardEntity>,
     @InjectRepository(CommentEntity)
     private readonly commentRepo: Repository<CommentEntity>,
   ) {}
 
   async canActivate(context: ExecutionContext): Promise<boolean> {
     const request: Request = context.switchToHttp().getRequest();

    //  console.log('User in OwnershipGuard:', request.user);

     const user = request.user as { id: number; email: string };
   //   const user = request.user;
    // console.log('User in OwnershipGuard_user:', user);
    // console.log('User in OwnershipGuard_user_id:', user.id);

     if (!user || user.id === undefined) {
       throw new ForbiddenException('User not authenticated');
     }
     
 
     const { columnId, cardId, commentId, id } = request.params;
 

    if (id && +id !== user.id) {
        throw new ForbiddenException('Это другой пользователь');
    }
     // Проверка колонки
     if (columnId) {
       const column = await this.columnRepo.findOne({
         where: { id: +columnId },
         relations: ['user'],
       });
       if (!column) throw new NotFoundException('Column not found');
       if (column.user.id !== user.id) throw new ForbiddenException('Access denied to this column');
     }
     
 
     // Проверка карточки
    if (cardId) {
       const card = await this.cardRepo.findOne({
         where: { id: +cardId },
         relations: ['columns', 'columns.user'],
       });
       if (!card) throw new NotFoundException('Card not found');
       if (card.columns.user.id !== user.id) throw new ForbiddenException('Access denied to this card');
     }
 
     // Проверка комментария
    if (commentId) {
       const comment = await this.commentRepo.findOne({
         where: { id: +commentId },
         relations: ['card', 'card.columns', 'card.columns.user'],
       });
       if (!comment) throw new NotFoundException('Comment not found');
       if (comment.card.columns.user.id !== user.id)
         throw new ForbiddenException('Access denied to this comment');
     }

    // if (userId) {
    //   if (user.id !== +userId) {
    //     throw new ForbiddenException('You cannot modify other user data');
    //   }
    //  }
 
     return true;
   }
 }
 