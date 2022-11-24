import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModel, AdminSchema } from './schemas/admin.schema';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AdminModel.name, schema: AdminSchema }]),
    JwtModule.registerAsync(jwtConfig),
    PassportModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, LocalStrategy, JwtStrategy],
})
export class AdminModule {}
