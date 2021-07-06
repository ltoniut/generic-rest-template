import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authrize } from 'northwind-rest-commons/dist/typeorm/entities';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(Authrize)
    private repoAuthrize: Repository<Authrize>,
  ) {
    this.users = [
      // flevel 1
      {
        userId: 101,
        finitials: 'LC1',
        fpassword: 'h>y5w(K:',
        fname: 'Levvel',
        fmenu: 'MMENU',
        flevel: '1',
        email: 'levvel_connect_1@lineagelogistics.com',
      },
      // flevel 2
      {
        userId: 102,
        finitials: 'LC2',
        fpassword: '3(sVr[(8',
        fname: 'Levvel',
        fmenu: 'MMENU',
        flevel: '2',
        email: 'levvel_connect_2@lineagelogistics.com',
      },
      // flevel 3
      {
        userId: 103,
        finitials: 'LC3',
        fpassword: "4z'UzB+y",
        fname: 'Levvel',
        fmenu: 'MMENU',
        flevel: '3',
        email: 'levvel_connect_3@lineagelogistics.com',
      },
      // flevel 5
      {
        userId: 105,
        finitials: 'LC5',
        fpassword: 'k47%~-K5',
        fname: 'Levvel',
        fmenu: 'MMENU',
        flevel: '5',
        email: 'levvel_connect_5@lineagelogistics.com',
      },
      // flevel 5
      {
        userId: 4,
        finitials: 'ERA',
        fpassword: 'FUDGE',
        fname: 'EILEEN ROSE',
        fmenu: 'MMENU',
        flevel: '5',
        email: 'levvel-test-user@lineagelogistics.com',
      },
      // flevel 4
      {
        userId: 3,
        finitials: 'LCW',
        fpassword: 'BETTY',
        fname: 'LEAH CULVER',
        fmenu: 'MMENU',
        flevel: '4',
        email: 'levvel-lcw-user@lineagelogistics.com',
      },
      // flevel 3
      {
        userId: 9,
        finitials: 'CAF',
        fpassword: 'CARRIE',
        fname: 'CARRIE FRANKS-CORP',
        fmenu: 'MMENU',
        flevel: '3',
        email: 'levvel-caf-user@lineagelogistics.com',
      },
      // flevel 2
      {
        userId: 60,
        finitials: 'RWH',
        fpassword: 'RRRRR',
        fname: 'RYAN HENRICHS',
        fmenu: 'MMENU',
        flevel: '2',
        email: 'levvel-rwh-user@lineagelogistics.com',
      },
      // flevel 1
      {
        userId: 2,
        finitials: 'EDI',
        fpassword: 'EDIEDI',
        fname: 'EDI USER (JERIK)',
        fmenu: 'EMENU',
        flevel: '1',
        email: 'levvel-edi-user@lineagelogistics.com',
      },
      // flevel 0
      {
        userId: 1857,
        finitials: 'MP4655',
        fpassword: '4655',
        fname: '4655',
        fmenu: 'MMENU',
        flevel: '0',
        email: 'levvel-mp4-user@lineagelogistics.com',
      },
    ];
  }

  async findOne(regex: string): Promise<User | undefined> {
    const userEmail = regex ? regex.split('|')[2] : '';
    const userFname = userEmail ? userEmail.split('@')[0] : '';

    const userAuthrize = await this.repoAuthrize.findOne({
      fname: userFname,
    });

    if (userAuthrize) {
      return userAuthrize;
    }

    return this.users.find(user => {
      const regexp = new RegExp(regex);
      return regexp.test(user.email);
    });
  }
}
