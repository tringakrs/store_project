import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  SerializeOptions,
  Param,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dtos/register.dto';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import RequestWithUser from './interface/requestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

@Controller('authentication')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    console.log(cookie);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
