import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Link } from './link.entity';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly LinkRepository: Repository<Link>,
  ) {}

  async createLink(data: CreateLinkDto): Promise<Link> {
    const link = new Link();
    link.subject = data.subject;
    link.linkType = data.linkType;
    link.object = data.object;

    await this.LinkRepository.save(link);

    return link;
  }

  async getLinks(): Promise<Link[]> {
    return this.LinkRepository.find();
  }

  async getLink(id: number): Promise<Link | undefined> {
    return this.LinkRepository.findOne(id);
  }
}
