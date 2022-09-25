import { User } from './user'
export type Ticket = {
	id: string;
	userId: number;
	number: string;
	status: string;
	user?: User;
}
