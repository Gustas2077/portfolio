import Axios from "axios";

export interface Card {
  id?: number;
  image: string;
  title: string;
  description: string;
  url: string;
  tag: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CreateCardPayload {
  title: string;
  description: string;
  image: string;
  url: string;
  tag: string;
}

export const backend = Axios.create({
  baseURL: "http://localhost:3005/",
});

export function getBlender() {
  return backend.get<Card[]>("project?tag=blender");
}

export function getProject() {
  return backend.get<Card[]>("project?tag=project");
}

export function loginAdmin(payload: LoginPayload) {
  return backend.post<{ token: string }>("auth/login", payload);
}

export function checkAdmin(token: string) {
  return backend.get("auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function logoutAdmin(token: string) {
  return backend.post(
    "auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function createProjectCard(token: string, payload: CreateCardPayload) {
  return backend.post("project", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateProjectCard(
  token: string,
  id: number,
  payload: CreateCardPayload
) {
  return backend.patch(`project/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteProjectCard(token: string, id: number) {
  return backend.delete(`project/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
