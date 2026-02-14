type SuccessType = {
    isSuccess: boolean,
    messages: string[],
}

export type ErrorType = {
    isError: boolean,
    messages: string[],
}

export interface IResponseApis<T> {
  status: number,
  result: T,
  success: SuccessType | null,
  error: ErrorType | null
}