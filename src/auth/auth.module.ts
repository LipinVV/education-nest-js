import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Подключаем ConfigModule для работы с .env
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      // registerAsync позволяет загружать конфигурацию асинхронно, например, из переменных окружения или других внешних источников.
      // Это особенно важно, когда конфигурация зависит от значений, которые становятся доступны только во время выполнения (например, из .env).
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // useFactory позволяет использовать ConfigService для получения конфигурационных значений, таких как секретный ключ JWT, из .env.
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
