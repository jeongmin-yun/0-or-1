import { supabase } from "./supabase";
export interface User {
  id: string;
  password: string;
  nickname: string;
  point: number;
}

const LOGIN_KEY = "loginUser";

export async function getUsers() {

  const { data } = await supabase
    .from("users")
    .select("*");

  return data ?? [];
}

export async function signup(user: User) {

  const { data: exist } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (exist) return false;

  const { error } = await supabase
    .from("users")
    .insert(user);

  return !error;
}

export async function login(
  id: string,
  password: string
) {

  if (id === "admin" && password === "1234") {

    const admin = {
      id: "admin",
      password: "1234",
      nickname: "관리자",
      point: 0,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(
        LOGIN_KEY,
        JSON.stringify(admin)
      );
    }

    return admin;
  }

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .eq("password", password)
    .single();

  if (!data) return null;

  if (typeof window !== "undefined") {
    localStorage.setItem(
      LOGIN_KEY,
      JSON.stringify(data)
    );
  }

  return data;
}

export function getLoginUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(LOGIN_KEY);

  return data ? JSON.parse(data) : null;
  
}


export function logout() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(LOGIN_KEY);
}

export async function updateUser(user: User) {

  await supabase
    .from("users")
    .update({
      password: user.password,
      nickname: user.nickname,
      point: user.point,
    })
    .eq("id", user.id);

  if (typeof window !== "undefined") {
    localStorage.setItem(
      LOGIN_KEY,
      JSON.stringify(user)
    );
  }
}

export async function refreshLoginUser() {
  if (typeof window === "undefined") return;

  const login = getLoginUser();

  if (!login) return;

  const users = await getUsers();

  const latest = users.find(
    (u) => u.id === login.id
  );

  if (!latest) return;

  localStorage.setItem(
    LOGIN_KEY,
    JSON.stringify(latest)
  );

}