export async function login({ username, password }) {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) throw new Error("Invalid email or password");

  const data = await res.json();

  return data;
}

export async function logout() {
  const res = await fetch("https://dummyjson.com/auth/logout", {
    method: "POST",
  });

  if (!res.ok) throw new Error("Something went wrong");

  const data = await res.json();

  return data;
}

export async function getCurrentUser() {
  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
  });

  if (!res.ok) return null;

  const data = await res.json();

  return data;
}
