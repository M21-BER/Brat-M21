import { createData, getData } from "./api";

export interface Credentials {
  identifier: string;
  password: string;
  ctx?: {};
}

export const fetchMe = () => {
  return getData({
    url: "student/auth",
  });
};

export async function signin({
  identifier,
  password,
}: Credentials): Promise<any & { token: string; socketToken: string }> {
  const data = await createData<
    any & { token: string; socketToken: string },
    Credentials
  >("student/signin", { identifier, password }, { skipAuth: true });

  return data;
}
export async function signout(): Promise<{ status: boolean }> {
  const data = await getData<{ status: boolean }>({ url: "student/signout" });

  return data;
}
