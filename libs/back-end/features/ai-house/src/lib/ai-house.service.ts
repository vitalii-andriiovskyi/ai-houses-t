import { Injectable } from '@nestjs/common';
import { CreateAiHouseDto } from './dto/create-ai-house.dto';
import { UpdateAiHouseDto } from './dto/update-ai-house.dto';

@Injectable()
export class AiHouseService {
  create(createAiHouseDto: CreateAiHouseDto) {
    return 'This action adds a new aiHouse';
  }

  findAll() {
    return `This action returns all aiHouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiHouse`;
  }

  update(id: number, updateAiHouseDto: UpdateAiHouseDto) {
    return `This action updates a #${id} aiHouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiHouse`;
  }
}
