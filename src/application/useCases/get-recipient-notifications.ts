import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from '@nestjs/common';
import { Notification } from "@application/entities/notification";



interface GetRecipientNotificationRequest {
  recipientId: string;
}

@Injectable()
export class GetRecipientNotification {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}
  
  async execute(request: GetRecipientNotificationRequest): Promise<Notification[]> {
    const {recipientId} = request

    const notifications = await this.notificationsRepository.findManyByRecipientId(
      recipientId 
    )

    return notifications
    
  }
}