export default interface Product {
	id: string;
	name: string;
	category: Categories;
	image: string;
	description: string;
	likes?: number;
	dislikes?: number;
}

export type Categories =
	| "Books"
	| "HomeAppliances"
	| "HealthAndBeauty"
	| "Cars"
	| "Fashion"
	| "Digital";
