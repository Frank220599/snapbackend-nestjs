import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminLoginDTO } from './dto/login-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req, @Body() body: AdminLoginDTO) {
    return this.adminService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getAdmin(@Request() req) {
    const user = req.user;

    delete user.password;

    return user;
  }

  @Post('create/admin')
  public async createAdmin(@Body() dto: CreateAdminDto) {
    return await this.adminService.create(dto);
  }
}
