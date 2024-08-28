import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { JwtAuthGuard } from './strategy/user.guard';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfile(@Param('id') id: string) {
    console.log('id', id);
    return this.authService.getProfile(id);
  }

  @Post('signup')
  async signup(@Body() createUserDto: UserDto) {
    return (await this.authService.signup(createUserDto)).access_token;
  }
}
