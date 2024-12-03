import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { REG, USERS } from "../CusToomHooks/Query_keys/authQuery.keys";
import { Log } from "@/Api/Functions/login.api";
import { useGlobalHooks } from "../CusToomHooks/GlobalHooks";
import {Reg, } from "@/Api/Functions/registration.api";
import { Cookies } from "react-cookie";
import { Bounce, Flip, toast, Zoom } from "react-toastify";
import { useRouter } from "next/router";
import {
  iregisterProps,
  IRegisterResponse,
  IuserResponse,
  IuserResponseRegister,
  profileProps,
} from "@/typeScript/interface/auth.interface";
import { profileFn } from "@/Api/Functions/profile.api";

export const useUserSignInMutation = (): UseMutationResult<
  IuserResponse,
  unknown,
  void,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();
  const router = useRouter();
  return useMutation<IuserResponse, unknown>({
    mutationFn: Log,
    onSuccess: (response) => {
      const { token, status, message } = response || {};

      if (status === 200) {
        cookie.set("token", token, {
          path: "/",
          secure: true,
        });
        cookie.set("profile_pic", response.data.profile_pic, { path: "/" });
        cookie.set("first_name", response.data.first_name, { path: "/" });
        toast(`Welcome Back ${response.data.first_name} `, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        router.push("/cms/list");
      } else {
        toast.error("Login Failed due to Wrong Credentials ", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
          });
      }

      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    },
    onError: (error) => {
      console.error("Error in useUserSignInMutation:", error);
      toast("Login Failed due to server error ", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
        });
    },
  });
};

export const useUserSignUpMutation = (): UseMutationResult<
  iregisterProps,
  unknown
  
> => {
  const { queryClient } = useGlobalHooks();

  return useMutation<iregisterProps,void, unknown>({
    mutationFn: Reg,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["REG"] });
      toast(`${response.data.first_name} You Are SuccessFully Registered `, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });
    },
    onError: () => {
      toast.error("Registration Failed", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
        });
    },
  });
};


export const userProfileMutation=()=>{
const {queryClient}=useGlobalHooks()
  return useQuery<profileProps>({
queryKey:["PROFILE"],
queryFn:profileFn,

  })
}
