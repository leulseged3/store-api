import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSalesDto } from './dtos';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post()
  create(@Body() createSalesDto: CreateSalesDto) {
    return this.salesService.create(createSalesDto)
  }

  @Get()
  findAll() {
    return this.salesService.findAll()
  }

  @Get('approved')
  approved() {
    return this.salesService.approvedSales()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.salesService.update(id)
  }

}
