import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Machine {
  @Prop({ required: true, unique: true })
  machineId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  energyConsumption: number;
}

export type MachineDocument = Machine & Document;
export const MachineSchema = SchemaFactory.createForClass(Machine);
