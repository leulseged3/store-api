import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSalesDto } from './dtos';
import { Sales } from './interfaces/sales.interface';

@Injectable()
export class SalesService {
  constructor(@InjectModel('Sales') private readonly salesModel: Model<Sales>) { }

  async create(createSalesDto: CreateSalesDto) {
    const newSales = new this.salesModel(createSalesDto)
    await newSales.save()
    return newSales
  }

  async findAll() {
    return this.salesModel.find()
  }

  async findOne(id: string) {
    const findRecord = await this.salesModel.findById(id)
    if (!findRecord) {
      throw new HttpException('No record found with this id', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string) {
    const record = await this.salesModel.findById(id);

    if (!record) {
      throw new HttpException('No record found with this id', HttpStatus.NOT_FOUND)
    }

    await record.updateOne({
      isApproved: !record.isApproved
    });

    return await this.salesModel.findById(id);
  }

  async approvedSales() {
    const approvedSales = await this.salesModel.find({
      isApproved: true
    })

    return approvedSales
  }
}
