import { Listpage } from "@/typeScript/interface/cms.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../EndPoints/endpoints";
import { GetLandingPageListParams, LandingPage, LandingPageList } from "@/typeScript/interface/auth.interface";
// import axiosInstance from "../Axios/Axios";

export const GetLandingPageList = async ({
  page,
  perPage,
}: GetLandingPageListParams): Promise<LandingPageList> => {
  try {
    const response = await axiosInstance.post(endpoints.cms.list, {
      page,
      perPage,
    });

    return {
      success: true,
      message: "Landing pages fetched successfully",
      status: response.status,
      data: response?.data as LandingPage[],
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch landing pages",
      status: 500,
      data: [],
    };
  }
};
