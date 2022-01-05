import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
  @Get(':id')
  @Roles(Role.Admin)
  show(@Param('id') id: string) {
    return this.usersService.showById(id)
  }
}
