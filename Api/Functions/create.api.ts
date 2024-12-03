import {
  createProps,
  ICreateResponse,
  Listpage,
  ListResponse,
} from "@/typeScript/interface/cms.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { MutationFunction } from "@tanstack/react-query";


export const Create: MutationFunction<createProps> = async (payload) => {
  const res = await axiosInstance.post<createProps>(
    endpoints.cms.create,
    payload
  );

  return res.data;
};
