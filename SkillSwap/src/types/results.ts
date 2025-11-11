/// Result types for handling success and error cases
export type ResultData<T> = {
    success: true; data: T;
}

export type ResultError = {
    success: false; error: { message: string; code?: number; };
}

// Union type for result which can be either success or error
export type Result<T> = ResultData<T> | ResultError;