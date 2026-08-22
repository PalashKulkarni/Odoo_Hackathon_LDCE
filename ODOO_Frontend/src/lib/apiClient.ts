/* API Client — centralized HTTP layer */

const API_BASE = '/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${path}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options ?? {};
    const response = await fetch(this.buildUrl(path, params), {
      ...fetchOptions,
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
    });
    if (!response.ok) {
      throw new ApiError(response.status, await this.parseError(response));
    }
    return response.json();
  }

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options ?? {};
    const response = await fetch(this.buildUrl(path, params), {
      ...fetchOptions,
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new ApiError(response.status, await this.parseError(response));
    }
    return response.json();
  }

  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options ?? {};
    const response = await fetch(this.buildUrl(path, params), {
      ...fetchOptions,
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new ApiError(response.status, await this.parseError(response));
    }
    return response.json();
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const { params, ...fetchOptions } = options ?? {};
    const response = await fetch(this.buildUrl(path, params), {
      ...fetchOptions,
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
    });
    if (!response.ok) {
      throw new ApiError(response.status, await this.parseError(response));
    }
    return response.json();
  }

  private async parseError(response: Response): Promise<string> {
    try {
      const data = await response.json();
      return data.message ?? data.error ?? 'An unexpected error occurred';
    } catch {
      return response.statusText || 'An unexpected error occurred';
    }
  }
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export const apiClient = new ApiClient(API_BASE);
