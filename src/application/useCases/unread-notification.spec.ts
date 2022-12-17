
import { notificationsRepositoryInMemory } from './../../../test/repositories/notifications-repository-in-memory';
import { CancelNotification } from './cancel-notification';
import { AppError } from './../../errors/AppError';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

let notificationRepository: notificationsRepositoryInMemory
let unreadNotification: UnreadNotification

describe("Unread Notification", () => {
  beforeEach(async() => {
    notificationRepository = new notificationsRepositoryInMemory()
    unreadNotification = new UnreadNotification(notificationRepository)
  })

  it("should be able to Unread a notification", async () => {
    
    const notification = makeNotification({
      readAt: new Date()
    })

    notificationRepository.create(notification)
    
    await unreadNotification.execute({
      notificationId: notification.id
    })
    
    expect(notificationRepository.notifications[0].readAt).toBeNull();
  
  })

  it("should not be able to Unread a notification when it does not exists", async () => {
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  
})