export interface User {
  id: string;
  password: string;
  nickname: string;
  point: number;
}

const USERS_KEY = "users";
const LOGIN_KEY = "loginUser";

export function getUsers(): User[] {
  if (typeof window === "undefined") return[];

  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function signup(user: User) {
  if (typeof window === "undefined") return false;

  const users = getUsers();

  const exist = users.find((u) => u.id === user.id);

  if (exist) {
    return false;
  }

  users.push(user);

  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return true;
}

export function login(id: string, password: string) {
  if (typeof window === "undefined") return null;
  const users = getUsers();

if (id === "admin" && password === "1234") {

  const admin = {
    id: "admin",
    password: "1234",
    nickname: "관리자",
    point: 0,
  };

  localStorage.setItem(
    LOGIN_KEY,
    JSON.stringify(admin)
  );

  return admin;

}

const user = users.find(
  (u) => u.id === id && u.password === password
);

if (!user) return null;

localStorage.setItem(
  LOGIN_KEY,
  JSON.stringify(user)
);

return user;
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

export function updateUser(user: User) 
{
  if (typeof window === "undefined") return;
  const users = getUsers();

  const newUsers = users.map((u) =>
    u.id === user.id ? user : u
  );

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(newUsers)
  );

  localStorage.setItem(
    LOGIN_KEY,
    JSON.stringify(user)
    
  );
  
}
export function refreshLoginUser() {
  if (typeof window === "undefined") return;

  const login = getLoginUser();

  if (!login) return;

  const users = getUsers();

  const latest = users.find(
    (u) => u.id === login.id
  );

  if (!latest) return;

  localStorage.setItem(
    "loginUser",
    JSON.stringify(latest)
  );

}