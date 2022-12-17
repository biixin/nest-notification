
import { notificationsRepositoryInMemory } from './../../../test/repositories/notifications-repository-in-memory';
import { CountRecipientNotification } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

let notificationRepository: notificationsRepositoryInMemory
let getRecipientNotification: GetRecipientNotification

describe("Get Recipients Notifications", () => {
  beforeEach(async() => {
    notificationRepository = new notificationsRepositoryInMemory()
    getRecipientNotification = new GetRecipientNotification(
      notificationRepository
    )
  })
  it("should be able to get recipient notifications", async () => {
  
    notificationRepository.create(makeNotification({
      recipientId: '1'
    }))
    notificationRepository.create(makeNotification({
      recipientId: '1'
    }))
    notificationRepository.create(makeNotification({
      recipientId: '2'
    }))
    
    const notifications = await getRecipientNotification.execute({
      recipientId: '1'
    })
    
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({recipientId: '1'}),
      expect.objectContaining({recipientId: '1'})
    ]))
  
  })
  
})