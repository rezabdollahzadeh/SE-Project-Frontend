import axios, { AxiosError, AxiosResponse } from "axios";
import { DataOrError } from "model/DataOrError";
import { useState } from "react";

interface Props {
	path: string;
	onError?: () => any;
	onSuccess?: () => any;
	data?: any;
}

function useApi<T>(
	onSuccess?: (res: T) => any,
	onError?: (error: AxiosError) => any
): [DataOrError<T>, (promise: Promise<AxiosResponse<T, any>>) => void] {
	const [doe, setDoe] = useState<DataOrError<T>>(
		// { loading: true }
		{ loading: false, error: new Error() }
	);

	const callApi = (promise: Promise<AxiosResponse<T, any>>) => {
		setDoe({ loading: true });

		promise
			.then((res) => {
				// console.log("Result", res.data);
				setDoe({
					data: res.data,
					loading: false,
				});
				onSuccess && onSuccess(res.data);
			})
			.catch((err) => {
				// console.log("Error", err.response.status);
				setDoe({
					error: err,
					loading: false,
				});
				onError && onError(err);
			});
	};

	return [doe, callApi];
}

export function useGetApi<T>(
	path: string,
	onSuccess?: (res: T) => any,
	onError?: (error: AxiosError) => any
): [DataOrError<T>, (params?: any) => void] {
	const [doe, callBase] = useApi<T>(onSuccess, onError);

	// subPath?: string
	const callApi = (params?: any) =>
		callBase(
			axios.get<T>(path, {
				params: params,
				withCredentials: true,
			})
		);

	return [doe, callApi];
}

export function usePostApi<T>(
	path: string,
	onSuccess?: (res: T) => any,
	onError?: (error: AxiosError) => any
): [DataOrError<T>, (data: any, params?: any) => void] {
	const [doe, callBase] = useApi<T>(onSuccess, onError);

	const callApi = (data: any, params?: any) =>
		callBase(
			axios.post<T>(path, data, {
				params: params,
				withCredentials: true,
			})
		);

	return [doe, callApi];
}

export function usePutApi<T>(
	path: string,
	onSuccess?: (res: T) => any,
	onError?: (error: AxiosError) => any
): [DataOrError<T>, (data: any, params?: any) => void] {
	const [doe, callBase] = useApi<T>(onSuccess, onError);

	const callApi = (data: any, params?: any) =>
		callBase(
			axios.put<T>(path, data, {
				params: params,
				withCredentials: true,
			})
		);

	return [doe, callApi];
}

export function useDeleteApi<T>(
	path: string,
	onSuccess?: (res: T) => any,
	onError?: (error: AxiosError) => any
): [DataOrError<T>, (params?: any) => void] {
	const [doe, callBase] = useApi<T>(onSuccess, onError);

	const callApi = (params?: any) =>
		callBase(
			axios.delete<T>(path, {
				params: params,
				withCredentials: true,
			})
		);

	return [doe, callApi];
}
