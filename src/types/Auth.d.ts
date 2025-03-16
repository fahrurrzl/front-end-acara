interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IActivation {
  code: string;
}

interface ActivationProps {
  status: "success" | "failed";
}

export type { IRegister, IActivation, ActivationProps };
