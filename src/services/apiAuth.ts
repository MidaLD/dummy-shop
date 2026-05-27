const API_URL = "https://dummyjson.com";

export type Login = {
  username: string;
  password: string;
};

type LoginResponse = {
  username: string;
  accessToken: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  id: number;
  image: string;
  refreshToken: string;
};

export async function login({
  username,
  password,
}: Login): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  const data: LoginResponse = await res.json();

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function refreshSession(): Promise<string> {
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
    credentials: "include",
  });

  if (!res.ok) {
    logout();
    throw new Error("Session expired. Please log in again.");
  }

  const data: RefreshResponse = await res.json();
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data.accessToken;
}

type Hair = {
  color: string;
  type: string;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
};

type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type Company = {
  department: string;
  name: string;
  title: string;
  address: Address;
};

type Crypto = {
  coin: string;
  wallet: string;
  network: string;
};

export type CurrentUser = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;

  hair: Hair;
  address: Address;
  bank: Bank;
  company: Company;
  crypto: Crypto;

  ip: string;
  macAddress: string;
  university: string;

  ein: string;
  ssn: string;
  userAgent: string;

  role: "admin" | "moderator" | "user";
};

async function fetchCurrentUser(token: string): Promise<Response> {
  return fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  let token = localStorage.getItem("accessToken");

  if (!token) return null;

  let res = await fetchCurrentUser(token);

  if (res.status === 401) {
    token = await refreshSession();
    res = await fetchCurrentUser(token);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    logout();
    throw new Error(err?.message || "Failed to fetch user");
  }

  return res.json() as Promise<CurrentUser>;
}
