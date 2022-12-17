
import { notificationsRepositoryInMemory } from './../../../test/repositories/notifications-repository-in-memory';
import { CancelNotification } from './cancel-notification';
import { AppError } from './../../errors/AppError';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

let notificationRepository: notificationsRepositoryInMemory
let readNotification: ReadNotification

describe("Read Notification", () => {
  beforeEach(async() => {
    notificationRepository = new notificationsRepositoryInMemory()
    readNotification = new ReadNotification(notificationRepository)
  })

  it("should be able to read a notification", async () => {
    
    const notification = makeNotification()

    notificationRepository.create(notification)
    
    await readNotification.execute({
      notificationId: notification.id
    })
    
    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    );
  
  })

  it("should not be able to read a notification when it does not exists", async () => {
    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  
})