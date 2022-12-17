import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";

export class notificationsRepositoryInMemory implements NotificationsRepository {
  
  public notifications: Notification[] = []
  
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find((i) => i.id === notificationId)
    if(!notification) {
      return null
    }
    return notification
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(i => i.recipientId === recipientId)
  }

  async create(notification: Notification) {
    this.notifications.push(notification)
  }
  
  async update(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (i) => i.id === notification.id
    )

    if(notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(i => i.recipientId === recipientId).length
  }
}