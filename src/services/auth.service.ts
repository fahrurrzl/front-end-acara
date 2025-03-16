import instance from "@/libs/axios/instance";
import endpoint from "./auth.constant";
import { IActivation, IRegister } from "@/types/Auth";

export const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
};
