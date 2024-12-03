import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { profileProps } from "@/typeScript/interface/auth.interface";
// import axiosInstance from "../Axios/Axios";


export const profileFn = async (): Promise<profileProps> => {
  const response = await axiosInstance.get<profileProps>(
    endpoints.auth.profile
  );
  console.log(response.data, "response-api");
  return response.data;
};
