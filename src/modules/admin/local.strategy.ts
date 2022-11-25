import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDTO } from './dto/login-admin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminService: AdminService) {
    super();
  }

  async validate(login, password): Promise<any> {
    const user = await this.adminService.validateUser(login, password);
    console.log({ user });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
