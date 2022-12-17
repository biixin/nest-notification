import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from '@nestjs/common';
import { AppError } from './../../errors/AppError';


interface UnreadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}
  
  async execute(request: UnreadNotificationRequest): Promise<void> {
    const {notificationId} = request

    const notification = await this.notificationsRepository.findById(
      notificationId
    )

    if(!notification) {
      throw new AppError('Notification not found.')
    }

    notification.unread();

    await this.notificationsRepository.update(notification)

  }
}