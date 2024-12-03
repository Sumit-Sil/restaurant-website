import { iregisterProps, IRegisterResponse } from "@/typeScript/interface/auth.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { ListResponse } from "@/typeScript/interface/cms.interface";
import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../Axios/Axios";


export const Reg: MutationFunction<iregisterProps> = async (userPayload) => {
  const res = await axiosInstance.post<iregisterProps>(
    endpoints.auth.signup,
    userPayload
  );

  return res.data;
};
