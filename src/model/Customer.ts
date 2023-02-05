export default interface Customer {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	phoneNumber: String;
	email: string;
	profileImage?: string;
	birthDate: string;
	restricted?: boolean;
	address: string;
	balance: number;
}
