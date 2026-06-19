import { API_URL, TOKEN_KEY } from "@/utils/utils";
import { handleError } from "@/utils/utils";
import LocalStorageSaver from "@/utils/local_storage";

type OmittedDataType =
  | "id"
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "created_at"
  | "updated_at";
type SecurityCheckOptions = {
  param?: { required?: boolean; value?: string; shortSession?: string };
};
function securityCheck({
  param = { required: false, value: "", shortSession: "" },
}: SecurityCheckOptions = {}): string | undefined {
  if (!API_URL) throw new Error("Server not responding");
  if (param?.required && !param?.value) throw new Error("ID is required");
  if (param.shortSession) return param.shortSession;
  const tokenData = LocalStorageSaver.getData<any>(TOKEN_KEY);
  if (!tokenData?.token) {
    throw new Error("Session expired. Please log in again.");
  }
  return tokenData?.token;
}

export async function handleFetchResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      handleError(errorData, `HTTP error! status: ${response.status}`),
    );

    if (
      errorData.message === "Validation Error" &&
      errorData?.details &&
      Array.isArray(errorData?.details)
    ) {
      (error as any).details = errorData.details.join(", ");
    }
    (error as any).status = response.status;

    throw error;
  }
  return response.json();
}

export async function responseWrapper<T>(func: () => Promise<T>): Promise<T> {
  try {
    return await func();
  } catch (err: any) {
    if (err?.name === "AbortError" || err?.name === "CanceledError") {
      throw err;
    } else {
      throw err;
    }
  }
}

export async function getData<T>(
  params: {
    url: string;
    id?: string | number;
    field?: string;
    value?: string | number | boolean;
    session?: string;
  },
  signal?: AbortSignal,
): Promise<T> {
  return await responseWrapper<T>(async () => {
    let finalUrl = `${API_URL}/${params.url}`;
    let token;
    if (params.id) {
      securityCheck({
        param: {
          required: true,
          value: String(params.id),
          shortSession: params.session || "",
        },
      });
      finalUrl += `/${params.id}`;
    } else if (params.field && params.value !== undefined) {
      token = securityCheck({
        param: {
          shortSession: params.session || "",
        },
      });
      const searchParams = new URLSearchParams();
      searchParams.append(params.field, String(params.value));
      finalUrl += `?${searchParams.toString()}`;
    } else {
      token = securityCheck({
        param: {
          shortSession: params.session || "",
        },
      });
    }

    const response = await fetch(finalUrl, {
      signal,
      method: "GET",
      headers: {
        ...(token
          ? {
              Authorization: token,
            }
          : {}),
      },
    });

    return handleFetchResponse<T>(response);
  });
}
export async function createData<R, P>(
  url: string,
  data: Omit<P, OmittedDataType> | P,
  options?: { skipAuth?: boolean; session?: string; signal?: AbortSignal },
): Promise<R> {
  return await responseWrapper(async () => {
    let token;
    if (!options?.skipAuth) {
      token = securityCheck({
        param: {
          shortSession: (options && options.session) || "",
        },
      });
    }
    const isFormData = data instanceof FormData;
    const body = isFormData ? data : JSON.stringify(data);
    const headers: HeadersInit = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token
        ? {
            Authorization: token,
          }
        : {}),
    };

    const response = await fetch(`${API_URL}/${url}`, {
      method: "POST",
      body,
      headers,
    });
    return handleFetchResponse<R>(response);
  });
}
export async function updateData<P, R>(
  url: string,
  id: string | number,
  payload: Partial<Omit<P, OmittedDataType>> | P,
  options?: { signal?: AbortSignal; session?: string },
): Promise<R> {
  return await responseWrapper(async () => {
    let token;
    token = securityCheck({
      param: {
        required: true,
        value: String(id),
        shortSession: options?.session ? options?.session : "",
      },
    });
    const isFormData = payload instanceof FormData;
    const body = isFormData ? payload : JSON.stringify(payload);

    const response = await fetch(`${API_URL}/${url}/${id}`, {
      method: "PATCH",
      signal: options?.signal,
      body,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token
          ? {
              Authorization: token,
            }
          : {}),
      },
    });
    return handleFetchResponse<R>(response);
  });
}

export async function deleteData(
  url: string,
  id: string | number,
  options?: { signal?: AbortSignal; session?: string },
): Promise<void> {
  return await responseWrapper(async () => {
    let token = securityCheck({
      param: {
        required: true,
        value: String(id),
        shortSession: options?.session ? options.session : "",
      },
    });
    const response = await fetch(`${API_URL}/${url}/${id}`, {
      method: "DELETE",
      signal: options?.signal,
      headers: {
        ...(token
          ? {
              Authorization: token,
            }
          : {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        handleError(errorData, `HTTP error! status: ${response.status}`),
      );
      if (
        errorData.error.message ===
        "SQLITE_CONSTRAINT: FOREIGN KEY constraint failed"
      ) {
        (error as any).message =
          "This item cannot be deleted because it is linked to existing data.";
      }
      throw error;
    }
  });
}
