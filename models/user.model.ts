export type User = {
   id: string
   username: string
   password: string
   createdAt: number
   updatedAt?: number
   deletedAt?: number
}

export type UserResponse = Pick<User, 'id' | 'username' | 'password' | 'createdAt'>;

export type CreateUser = Pick<User, 'username' | 'password'>;



