const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/+$/, "");

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
  signal?: AbortSignal;
};

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body:
        options.body === undefined
          ? undefined
          : JSON.stringify(options.body),
      signal: options.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }

    throw new ApiClientError(
      "서버에 연결할 수 없어. 백엔드 실행 상태를 확인해 줘.",
      0,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  const data: unknown = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `요청에 실패했어. (${response.status})`;

    throw new ApiClientError(message, response.status);
  }

  return data as T;
}

export const api = {
  health: () => apiRequest<{ status: string }>("/health"),

  products: (query = "") =>
    apiRequest<{ items: import("../types").Product[]; total: number }>(
      `/products${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    ),

  product: (id: string) =>
    apiRequest<{ product: import("../types").Product }>(
      `/products/${encodeURIComponent(id)}`,
    ),

  createProduct: (
    input: Omit<
      import("../types").Product,
      "id" | "sellerId" | "sellerName" | "createdAt" | "likes" | "status"
    >,
    token: string,
  ) =>
    apiRequest<{ product: import("../types").Product }>("/products", {
      method: "POST",
      body: input,
      token,
    }),

  createOrder: (productId: string, token: string) =>
    apiRequest<{ order: import("../types").Order }>("/orders", {
      method: "POST",
      body: { productId },
      token,
    }),

  createReport: (
    input: {
      productId: string;
      reason: import("../types").ReportReason;
      detail: string;
    },
    token: string,
  ) =>
    apiRequest<{ report: import("../types").Report }>("/reports", {
      method: "POST",
      body: input,
      token,
    }),
};
