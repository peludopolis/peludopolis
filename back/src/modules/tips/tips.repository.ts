import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Tip } from './entities/tips.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipDto } from './dto/create-tips.dto';

@Injectable()
export class TipsRepository {
  constructor(
    @InjectRepository(Tip) private readonly tipsRepository: Repository<Tip>
  ) {}

  async createTip(dataTip: CreateTipDto, imgUrl: string): Promise<Tip> {
    const createdTip: Tip = this.tipsRepository.create({
      ...dataTip,
      image: imgUrl
    });
    const savedTip: Tip = await this.tipsRepository.save(createdTip);
    return savedTip;
  }

  async findAllTips(): Promise<Tip[]> {
    const createdTips: Tip[] = await this.tipsRepository.find();
    if (createdTips.length === 0) {
      throw new InternalServerErrorException('Aún no hay tips guardados');
    }
    return createdTips;
  }

  findByTitle(title: string) {
    return this.tipsRepository.findOne({
      where: {
        title: title
      }
    });
  }
}
