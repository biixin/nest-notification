
import { notificationsRepositoryInMemory } from './../../../test/repositories/notifications-repository-in-memory';
import { CancelNotification } from './cancel-notification';
import { AppError } from './../../errors/AppError';
import { makeNotification } from '@test/factories/notification-factory';

let notificationRepository: notificationsRepositoryInMemory
let cancelNotification: CancelNotification

describe("Cancel Notification", () => {
  beforeEach(async() => {
    notificationRepository = new notificationsRepositoryInMemory()
    cancelNotification = new CancelNotification(notificationRepository)
  })
  it("should be able to cancel a notification", async () => {
    
    const notification = makeNotification()

    notificationRepository.create(notification)
    
    await cancelNotification.execute({
      notificationId: notification.id
    })
    
    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  
  })

  it("should not be able to cancel a notification when it does not exists", async () => {
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  
})