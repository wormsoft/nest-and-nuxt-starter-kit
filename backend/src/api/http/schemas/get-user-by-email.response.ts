import { UserSchema } from '@api/http/schemas/user.schema';

export interface GetUserByEmailResponse {
  user: UserSchema;
}
