'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Body,
  Post,
  Logger,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UsersPageDto } from './dto/UsersPageDto';
import { UserService } from './user.service';
import { ChangeRoleDto } from './dto/ChangeRoleDto';
import { EditUserDto } from './dto/EditUserDto';
import { UserDto } from './dto/UserDto';
import { of } from 'rxjs';
import { DeactivateAccountDto } from './dto/DeactivateAccountDto';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UserController {
  private readonly _logger = new Logger(UserController.name);
  constructor(private _userService: UserService) {}

  @Get('users')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UsersPageDto,
  })
  getUsers(): Promise<UserDto[]> {
    return this._userService.getUsers();
  }

  @Post('change-role')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status changed successfully',
    type: UserDto,
  })
  changeRole(@Body() changeRoleDto: ChangeRoleDto): Promise<UserDto> {
    this._logger.log('users/change-role:');
    this._logger.log(JSON.stringify(changeRoleDto));
    return this._userService.changeUserRole(changeRoleDto);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data changed successfully',
    type: UserDto,
  })
  editUser(@Body() editUserDto: EditUserDto): Promise<UserDto> {
    this._logger.log('users/edit:');
    this._logger.log(JSON.stringify(editUserDto));
    return this._userService.editUser(editUserDto);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully deleted',
  })
  async deleteUser(@Body() deactivateAccountDto: DeactivateAccountDto) {
    this._logger.log('users/delete:');
    this._logger.log(JSON.stringify(deactivateAccountDto));
    if (await this._userService.deactivateAccount(deactivateAccountDto.id)) {
      return Promise.call({ success: true });
    }
    return Promise.reject({ success: false });
  }
}
