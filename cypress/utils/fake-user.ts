import { faker } from '@faker-js/faker'

export interface FakeUser {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
}

export function generateFakeUser(): FakeUser {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const username = faker.internet.userName({ firstName, lastName })
  const password = faker.internet.password({ length: 10 })
  const email = faker.internet.email({ firstName, lastName })

  return {
    firstName,
    lastName,
    username,
    password,
    email,
  }
}