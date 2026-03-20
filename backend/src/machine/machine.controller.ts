import { Body, Controller, Get, Param, Patch, Post, NotFoundException } from '@nestjs/common';
import { MachinesService } from './machine.service';

@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachinesService) {}

  @Post()
  create(@Body() body: any) {
    return this.machineService.create(body);
  }

  @Patch(':machineId')
  update(@Param('machineId') machineId: string, @Body() body: any) {
    return this.machineService.update(machineId, body);
  }

  @Get()
  getAll() {
    return this.machineService.getAll();
  }

  @Get(':machineId')
  async findOne(@Param('machineId') machineId: string) {
    const machine =
      (await this.machineService.findByMachineId(machineId).catch(() => null)) ||
      (await this.machineService.findOne(machineId));

      if (!machine) {
        throw new NotFoundException('Machine not found');
      }
    return {
      ...machine.toObject?.() || machine,
      history: this.getHistory(machine.temperature),
    };
  }

  private getHistory(temp: number) {
    return [
      { time: '-2m', temp: temp - 4 },
      { time: '-1m', temp: temp - 1 },
      { time: 'now', temp },
    ];
  }
}