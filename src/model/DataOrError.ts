import { AxiosError } from "axios";

export type DataOrError<T> =
	| {
			loading: true;
	  }
	| {
			data: T;
			loading: false;
	  }
	| {
			loading: false;
			error: AxiosError | Error;
	  };
