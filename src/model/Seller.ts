export default interface Seller {
	id: string;
	name: string;
	image?: string;
	information: string;
	address: string;
	likes?: number;
	dislikes?: number;
	restricted?: boolean;
}
