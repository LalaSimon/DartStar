import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { SelfOnly } from './decorators/self-only.decorator';
import { SelfOnlyGuard } from './guard/selft-only.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @SelfOnly()
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'User not found' })
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.authService.updateUser(updateUserDto, id);
  }

  @SelfOnly()
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 400, description: 'User not found' })
  delete(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Post('logout/:id')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Param('id') id: string) {
    return this.authService.logout(id);
  }
}
