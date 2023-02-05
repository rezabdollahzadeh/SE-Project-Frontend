export default interface DiscountToken {
	id: string;
	expirationDate: string;
	discount: string;
	isEvent?: boolean;
}
