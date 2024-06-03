export class CommonResponse<T> {
  constructor(
    public data: T | null,
    public success: boolean,
    public message: string | string[],
    public statusCode?: number
  ) {}
}
