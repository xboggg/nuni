const API_BASE = "/admin-api";

export function getToken(): string | null {
  return localStorage.getItem("ngc_admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("ngc_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("ngc_admin_token");
}

async function handleResponse(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) {
      clearToken();
    }
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await handleResponse(res);
  return data.token;
}

export async function apiGet(resource: string) {
  const res = await fetch(`${API_BASE}/${resource}.php`);
  return handleResponse(res);
}

export async function apiPost(resource: string, body: FormData | object) {
  const token = getToken();
  const isFormData = body instanceof FormData;
  const res = await fetch(`${API_BASE}/${resource}.php`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? body : JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiPut(resource: string, body: object) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/${resource}.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiDelete(resource: string, id: string | number) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/${resource}.php?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return handleResponse(res);
}
