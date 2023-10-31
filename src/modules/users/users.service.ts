import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../configs/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8);
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password !== undefined) updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);

    return this.prisma.user.update({
      data: updateUserDto,
      where: {
        id
      }
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
