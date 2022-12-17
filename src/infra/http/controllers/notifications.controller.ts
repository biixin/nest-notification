import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
// import { Body } from '@nestjs/common/decorators';
import { CreateNotificationBody } from './../DTOs/create-notification-body';
import { SendNotification } from './../../../application/useCases/send-notification-UseCase';
import { NotificationViewModel } from './../view-models/notification-view-model';
import { CancelNotification } from '@application/useCases/cancel-notification';
import { ReadNotification } from '@application/useCases/read-notification';
import { UnreadNotification } from '@application/useCases/unread-notification';
import { CountRecipientNotification } from '@application/useCases/count-recipient-notifications';
import { GetRecipientNotification } from '@application/useCases/get-recipient-notifications';

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotification
    
  ) {}
  
  @Patch('/cancel/:id')
  async cancel( @Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('/count/:recipientId')
  async countFromRecipient( @Param('recipientId') recipientId: string): Promise<number> {
    const count = await this.countRecipientNotifications.execute({
      recipientId
    })

    return count
  }

  @Get('/from/:recipientId')
  async getFromRecipient( @Param('recipientId') recipientId: string) {
    const notifications = await this.getRecipientNotifications.execute({
      recipientId
    })

    return {notifications: notifications.map(NotificationViewModel.toHTTP)}
  }

  @Patch('/read/:id')
  async read( @Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch('/unread/:id')
  async unread( @Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }
  
  @Post("")
  async create(@Body() body: CreateNotificationBody) {
    const {recipientId, content, category} = body

    const notification = await this.sendNotification.execute({
      recipientId, content, category
    }) 
 
    return {
      notification: NotificationViewModel.toHTTP(notification)
    }
    
  }

}
