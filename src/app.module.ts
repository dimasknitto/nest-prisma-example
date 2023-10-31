import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PostModule } from './modules/post/post.module';
import { PrismaService } from './configs/prisma.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, PostModule, PrismaService, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
