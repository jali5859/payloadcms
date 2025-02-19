import type { Payload } from 'payload'

import { eventsOne, eventsTwo } from './events'
import { locationOne, locationTwo } from './locations'
import { staffOne, staffTwo } from './staff'

export async function seedData(payload: Payload) {
  await payload.create({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      password: 'test',
    },
  })

  const { id: locationOneID } = await payload.create({
    collection: 'locations',
    data: locationOne,
  })

  const { id: locationTwoID } = await payload.create({
    collection: 'locations',
    data: locationTwo,
  })

  await payload.create({
    collection: 'staff',
    data: {
      ...staffOne,
      location: [locationOneID],
    },
  })

  await payload.create({
    collection: 'staff',
    data: {
      ...staffTwo,
      location: [locationTwoID],
    },
  })

  eventsOne.map((event) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    payload.create({
      collection: 'events',
      data: {
        ...event,
        location: locationOneID,
      },
    })

    return null
  })

  eventsTwo.map((event) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    payload.create({
      collection: 'events',
      data: {
        ...event,
        location: locationTwoID,
      },
    })

    return null
  })
}
