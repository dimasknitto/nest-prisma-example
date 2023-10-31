import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/configs/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    loginService(email: string, password: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const checkUser = await this.prisma.user.findFirst({
                where: { email }
            })
            
            if (!checkUser) return reject('user cannto be found')

            const checkPassword = await bcrypt.compare(password, checkUser.password)

            if (!checkPassword) return reject('password is incorrect')

            const createToken = await this.jwtService.signAsync({
                id: checkUser.id,
                email: checkUser.email,
                agent: 'user agent'
            })

            return resolve({
                token: createToken,
                user: {
                    name: checkUser.name,
                    email: checkUser.email
                }
            })
        })

    }

     checkUser(request:Request)  {
        return request['user'] 
      }
}
