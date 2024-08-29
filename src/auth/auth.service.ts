import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<unknown> {
    const user = await this.userService.findOneByEmail(email); // Пароль, который пользователь вводит при входе, не хранится в базе данных в открытом виде.
    // Вместо этого мы храним его хеш, созданный с помощью bcrypt
    if (user && (await bcrypt.compare(password, user.password))) {
      // если Вы это читаете - то теперь сравнение работает корректно, загвоздка была в том, что я сравнивал два зашифрованных пароля

      // bcrypt берёт введённый пароль, хеширует его, и сравнивает с хешем, который хранится в базе данных
      const { password, ...result } = user;
      // После того как мы убедились, что пароль верен, мы не хотим отправлять его обратно (например, на клиент).
      // Поэтому мы удаляем поле password из объекта, который будет возвращён.
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = {
      email: user.email,
      id: user._id,
      firstName: user.firstName,
      password: user.password,
      token: user.token,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: UserDto) {
    const user = await this.userService.create(createUserDto);

    const convertedUser = {
      email: user.email,
      password: createUserDto.password, // нам нужно отдавать НЕ ЗАШИФРОВАННЫЙ
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return this.login(convertedUser);
  }

  async getProfile(token: string) {
    const user = await this.userService.findOneById(token);
    const { password, ...result } = user;
    return result;
  }
}
