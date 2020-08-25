import { Api } from '../shared/api';
import { ObjectLiteral } from '../shared/objectLiteral';

export class JsonReq implements Api {
    private baseURL: string;
    private window: Window;

    constructor(baseUrl: string, window: Window) {
        this.baseURL = baseUrl;
        this.window = window;
    }

    toFullUrl = (url: string) => `${this.baseURL}${url}`

    get = async <T>(url: string): Promise<T> => {
        const self = this;
        let response = await self.window.fetch(self.toFullUrl(url));
        return response.json()
    }

    post = async <T>(url: string, body: ObjectLiteral): Promise<T> => {
        const self = this;
        const response = await self.window.fetch(self.toFullUrl(url), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return await response.json();
    }

    put = async <T>(url: string, body: ObjectLiteral): Promise<T> => {
        const self = this;
        const response = await self.window.fetch(self.toFullUrl(url), {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return await response.json();
    }

    patch = async <T>(url: string, body: ObjectLiteral): Promise<T> => {
        const self = this;
        const response = await self.window.fetch(self.toFullUrl(url), {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return await response.json();
    }

    del = async <T>(url: string): Promise<T> => {
        const self = this;
        const response = await self.window.fetch(self.toFullUrl(url), {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }
}