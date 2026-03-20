import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MachinesService } from './machine.service';
import { MachineController } from './machine.controller';
import { Machine, MachineSchema } from './schemas/machine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Machine.name, schema: MachineSchema }]),
  ],
  controllers: [MachineController],
  providers: [MachinesService],
  exports: [MachinesService],
})
export class MachineModule {}
