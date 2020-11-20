import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    
    if(user){
      if(user.password === undefined) return {}
    }

  }

  async login(loginUserDto: LoginUserDto) : Promise<any> {


    try {
      const userDb = await
    } catch (error) {
      
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async ComparePassword(hashPassword: string, plainPassword: string) {
    const result = await bcrypt.compare(plainPassword, hashPassword);
    return result;
  }
}
