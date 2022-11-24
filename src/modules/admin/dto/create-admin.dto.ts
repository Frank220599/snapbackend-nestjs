import { IsNotEmpty } from 'class-validator';
import { AdminRoles } from '../schemas/admin.schema';

export class CreateAdminDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: AdminRoles;
}
