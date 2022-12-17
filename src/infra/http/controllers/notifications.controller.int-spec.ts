import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from './../../../app.module';

// let notificationRepository: PrismaNotificationsRepository
// let readNotification: ReadNotification

// const client = new PrismaClient()
let prisma: PrismaService

describe("Authenticate one User Controller", () => {
  
  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    await prisma.cleanDatabase();
   
  })

  it("should be able to authenticate byself", async () => {
    console.log('foi')
  })


})