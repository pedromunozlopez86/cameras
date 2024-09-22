import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Login' })
  async signIn(@Body() body: LoginDto) {
    return await this.authService.signIn(body);
  }
}
