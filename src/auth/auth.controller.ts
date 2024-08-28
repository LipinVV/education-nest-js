import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { JwtAuthGuard } from './strategy/user.guard';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard) // <- для проверки работоспособности работы роута (например curl -X GET http://localhost:3000/users/1) закомментировать
  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.authService.getProfile(id);
  }

  @Post('signup')
  async signup(@Body() createUserDto: UserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
