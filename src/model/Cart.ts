export default interface Cart {
	id: string;
	customerId?: string;
	products: ProductAmounts[];
	status: CartStatus;
	description?: string;
	updateDate?: string;
	totalprice?: number;
}

export interface ProductAmounts {
	productId: string; // This is productPriceId
	amount: number;
}

export type CartStatus =
	| "Filling"
	| "Pending"
	| "Accepted"
	| "Rejected"
	| "Sending"
	| "Received";
