import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreateSalesDto } from './dtos';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Roles(Role.StoreKeeper)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSalesDto: CreateSalesDto) {
    return this.salesService.create(createSalesDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.salesService.findAll()
  }

  @Roles(Role.INVESTOR)
  @UseGuards(JwtAuthGuard)
  @Get('approved')
  approved() {
    return this.salesService.approvedSales()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id)
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string) {
    return this.salesService.update(id)
  }

}
