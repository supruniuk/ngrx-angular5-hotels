export class Group {
  id: number;
  name: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  img: string;
  groups?: Group[];
}
