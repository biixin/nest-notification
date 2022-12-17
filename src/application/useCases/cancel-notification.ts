import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from '@nestjs/common';
import { AppError } from './../../errors/AppError';


interface CancelNotificationRequest {
  notificationId: string;
}

@Injectable()
export class CancelNotification {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}
  
  async execute(request: CancelNotificationRequest): Promise<void> {
    const {notificationId} = request

    const notification = await this.notificationsRepository.findById(
      notificationId
    )

    if(!notification) {
      throw new AppError('Notification not found.')
    }

    notification.cancel();

    await this.notificationsRepository.update(notification)

  }
}