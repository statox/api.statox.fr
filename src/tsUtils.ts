export type CallbackErrorOnly = (error?: Error) => void;
export type Callback<T> = (error: Error | null | undefined, data?: T) => void;
