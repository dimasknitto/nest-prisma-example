import { User as Users } from '@prisma/client'

export class User implements Users {
    id: number;
    email: string;
    name: string;
    password: string;
}
