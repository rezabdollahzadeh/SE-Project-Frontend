export default interface Comment {
	id: string;
	username: string;
	userImage?: string;
	productId: string;
	sendDate: string;
	text: string;
	likes?: number;
	dislikes?: number;
}
