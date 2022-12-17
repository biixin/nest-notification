import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from '@nestjs/common';
import { AppError } from './../../errors/AppError';


interface CountRecipientNotificationRequest {
  recipientId: string;
}

@Injectable()
export class CountRecipientNotification {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}
  
  async execute(request: CountRecipientNotificationRequest): Promise<number> {
    const {recipientId} = request

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId 
    )

    return count
    
  }
}