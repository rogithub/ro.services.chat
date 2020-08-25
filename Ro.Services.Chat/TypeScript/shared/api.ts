import { ObjectLiteral } from './objectLiteral';

export interface Api {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, body: ObjectLiteral): Promise<T>;
    put<T>(url: string, body: ObjectLiteral): Promise<T>;
    patch<T>(url: string, body: ObjectLiteral): Promise<T>;
    del<T>(url: string): Promise<T>;
}