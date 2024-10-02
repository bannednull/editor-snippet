interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

type ErrorResponse = {
  error: string;
};

const fetchRequest = async <T>(
  url: string,
  options: FetchOptions,
): Promise<T | ErrorResponse> => {
  const { body, headers, ...restOptions } = options;

  const fetchOptions: RequestInit = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    return { error: `HTTP Error: ${response.status} - ${errorMessage}` };
  }

  return await response.json();
};

//GET
export const get = async <T>(
  url: string,
  options?: FetchOptions,
): Promise<T | ErrorResponse> =>
  fetchRequest<T>(url, { method: "GET", ...options });

//POST
export const post = async <T>(
  url: string,
  body: unknown,
  options?: FetchOptions,
): Promise<T | ErrorResponse> =>
  fetchRequest<T>(url, { method: "POST", body, ...options });

//PUT
export const put = async <T>(
  url: string,
  body: unknown,
  options?: FetchOptions,
): Promise<T | ErrorResponse> =>
  fetchRequest<T>(url, { method: "PUT", body, ...options });

//DELETE
export const del = async <T>(
  url: string,
  options?: FetchOptions,
): Promise<T | ErrorResponse> =>
  fetchRequest<T>(url, { method: "DELETE", ...options });
