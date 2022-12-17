import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';

// let notificationRepository: PrismaNotificationsRepository
// let readNotification: ReadNotification

const client = new PrismaClient()

describe("Authenticate one User Controller", () => {
  let prisma: PrismaService
  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

  })

  it("should be able to authenticate byself", async () => {
    console.log('foi')
  })


})