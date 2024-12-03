import {
  ICreateResponse,
  IEditResponse,
  IuserCreateResponse,
  Listpage,
  ListResponse,
} from "@/typeScript/interface/cms.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { MutationFunction } from "@tanstack/react-query";
// import axiosInstance from "../Axios/Axios";

export const ProductUpdate: MutationFunction<IEditResponse> = async (
  payload
) => {
  const response = await axiosInstance.post<IEditResponse>(
    endpoints.cms.update,
    payload
  );
  return response.data;
};

// const response = await axiosInstance.get(`${endpoints.cms.details}/${id}`);
