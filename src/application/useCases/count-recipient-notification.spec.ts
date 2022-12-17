
import { notificationsRepositoryInMemory } from './../../../test/repositories/notifications-repository-in-memory';
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { CountRecipientNotification } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

let notificationRepository: notificationsRepositoryInMemory
let countRecipientNotification: CountRecipientNotification

describe("Count Recipients Notifications", () => {
  beforeEach(async() => {
    notificationRepository = new notificationsRepositoryInMemory()
    countRecipientNotification = new CountRecipientNotification(
      notificationRepository
    )
  })
  it("should be able to count recipient notifications", async () => {
  
    notificationRepository.create(makeNotification({
      recipientId: '1'
    }))
    notificationRepository.create(makeNotification({
      recipientId: '1'
    }))
    notificationRepository.create(makeNotification({
      recipientId: '2'
    }))
    
    const count = await countRecipientNotification.execute({
      recipientId: '1'
    })
    
    expect(count).toEqual(2);
  
  })
  
})