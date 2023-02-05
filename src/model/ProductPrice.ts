import Seller from "./Seller";

export default interface ProductPrice {
	id: string;
	seller: Seller;
	productId: string;
	amount: number;
	price: number;
	priceHistory?: number[];
	discount: string;
}
