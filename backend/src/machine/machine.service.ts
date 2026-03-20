import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machine, MachineDocument } from './schemas/machine.schema';

@Injectable()
export class MachinesService {
  constructor(
    @InjectModel(Machine.name) private model: Model<MachineDocument>,
  ) {}

  getAll() {
    return this.model.find();
  }

  async findOne(id: string) {
    return this.model.findById(id) || this.notFound();
  }

  async findByMachineId(machineId: string) {
    return this.model.findOne({ machineId }) || this.notFound();
  }

  create(data: Partial<Machine>) {
    return this.model.create(data);
  }

  async update(machineId: string, data: Partial<Machine>) {
    return (
      (await this.model.findOneAndUpdate({ machineId }, data, { new: true })) ||
      this.notFound()
    );
  }

  private notFound(): never {
    throw new NotFoundException('Machine not found');
  }
}