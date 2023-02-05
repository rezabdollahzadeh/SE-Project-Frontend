export default interface Pagination<T> {
	page: number;
	perPage: number;
	totalPages: number;
	data: T[];
}
