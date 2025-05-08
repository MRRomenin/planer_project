import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './DTO/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;

    const user = await this.usersService.getByEmail(email);

    console.log('User from DB:', user);
    console.log('Email:', email);
    console.log('User password:', user.password);
    console.log('Provided password:', password);
    if (!user || !user.password || !password) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      console.log('Password mismatch');
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
