import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminDocument, AdminModel } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminLoginDTO } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import appConfig from '../../config/app.config';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminModel.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { login, password, role, fullName } = createAdminDto;

    const user = await this.adminModel.findOne({ login });

    if (user) {
      throw new BadRequestException(`Login ${login} has already been taken`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.adminModel.create({
      role,
      login,
      fullName,
      password: hashedPassword,
    });

    delete admin.password;

    return admin;
  }

  async validateUser(login, password) {
    const user = await this.adminModel.findOne({ login });

    const inValidCredentials = new BadRequestException(
      'Incorrect login or password!',
    );

    if (!user) {
      throw inValidCredentials;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw inValidCredentials;
    }

    return user;
  }

  generateToken(admin: AdminDocument) {
    const accessToken = this.jwtService.sign(
      {
        sub: admin._id,
        name: admin.fulName,
      },
      { secret: appConfig().jwtSecret },
    );

    return { accessToken };
  }
}
