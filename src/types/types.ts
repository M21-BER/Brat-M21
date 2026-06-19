import type { ReactNode } from "react";

type ProfileImageType = {
  url: string;
  hash: string;
  path: string;
};
type UserType = {
  token: string;
  _id: string;
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  gender: string;
  phoneNumber: string;
  profileImage: ProfileImageType | null;
} | null;

interface LoginResponseType {
  track: {
    isActive: boolean;
    shortSessionToken: string;
  };
  response: UserType;
}

interface GlobalContextType {
  isLogged: boolean;
  user: UserType | null | undefined;
  error: any;
  loading: boolean;
  refetch: (
    newParams?: {},
    bypassCache?: boolean,
    signal?: AbortSignal,
  ) => Promise<UserType | undefined>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

interface UseApiOptions<T, P extends Record<string, any> = {}> {
  fn: (params: P, signal?: AbortSignal) => Promise<T>;
  params?: P;
  skip?: boolean;
  enableCache?: boolean;
  cacheKey?: string;
}

interface UseApiReturn<T, P> {
  data: T | null | undefined;
  loading: boolean;
  error: string | null;
  refetch: (
    newParams?: P,
    bypassCache?: boolean,
    signal?: AbortSignal,
  ) => Promise<T | undefined>;
}

interface SignupPayload {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  email: string | undefined;
  phoneNumber: string | undefined;
  password: string;
  ctx?: { country: string };
  files?: {
    uri: string;
    name: string;
    type: string;
  } | null;
  // add other fields as needed
}
type signupResponseType = {
  status: boolean;
  message: string;
  clientId: string;
};
type BasicResult = [
  success: boolean,
  message: string | null,
  data: UserType | null | signupResponseType | any,
];

export type {
  BasicResult,
  GlobalContextType,
  GlobalProviderProps,
  LoginResponseType,
  ProfileImageType,
  SignupPayload,
  signupResponseType,
  UseApiOptions,
  UseApiReturn,
  UserType,
};
