import { User } from '@app/core/models/user';


export interface Authenticate {
  email: string;
  password: string;
}

export interface SignUp extends Authenticate {
  authType: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const CUSTOMER_TYPE = 'customer';
export const HOTEL_TYPE = 'hotel';

export class Auth {
  constructor(
    public token: string,
    public type: string
  ) { }
}
