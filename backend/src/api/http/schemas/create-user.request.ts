export interface CreateUserRequest {
  email: string;
  username: string;
  hashedPassword: string;
  fullName: string;
}
