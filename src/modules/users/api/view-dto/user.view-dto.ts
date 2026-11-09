export class UserViewDto  {
  id: string;
  login: string;
  email: string;
  createdAt: string;
}

export class UserViewDtoWithPassword extends UserViewDto{
  password: string }
