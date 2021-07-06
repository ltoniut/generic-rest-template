import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { CreateLinkDto } from './dto/create-link.dto';
import { LinksService } from './links.service';
import { Link } from './link.entity';

@Controller('link')
export class LinkController {
  constructor(private linksService: LinksService) {}

  @Get()
  async getLinks(): Promise<Link[]> {
    return this.linksService.getLinks();
  }

  @Get(':linkId')
  async getLink(@Param('linkId') linkId: number): Promise<Link | undefined> {
    return this.linksService.getLink(linkId);
  }

  @Post()
  async addLink(
    @Body()
    createLinkDto: CreateLinkDto,
  ): Promise<Link> {
    return this.linksService.createLink(createLinkDto);
  }
}
