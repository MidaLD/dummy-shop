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

type CurrentUser = {
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

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = localStorage.getItem("accessToken");

  if (!token) return null;

  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw new Error(err?.message || "Failed to fetch user");
  }

  const data: CurrentUser = await res.json();
  console.log(data);

  return data;
}
