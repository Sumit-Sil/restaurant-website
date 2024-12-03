import { LandingPageDetails } from "@/typeScript/interface/auth.interface";
import axiosInstance from "../Axios/Axios";
// import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";


export const GetLandingPageDetails = async (
  id: string
): Promise<LandingPageDetails> => {
  const response = await axiosInstance.get(`${endpoints.cms.details}/${id}`);

  return response.data.data;
};
