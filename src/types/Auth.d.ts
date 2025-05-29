import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface ActivationProps {
  status: "success" | "failed";
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  _id?: string;
  fullName?: string;
  username?: string;
  email?: string;
  profilePicture?: string | FileList;
  role?: string;
  isActive?: string;
}

export type {
  IRegister,
  IActivation,
  ActivationProps,
  UserExtended,
  SessionExtended,
  JWTExtended,
  ILogin,
  IProfile,
};
