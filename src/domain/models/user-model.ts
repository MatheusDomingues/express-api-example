import { User } from '@prisma/client'
import { BookingModel } from './booking-model'

export interface UserModel extends User {
  bookings?: BookingModel[]
}
