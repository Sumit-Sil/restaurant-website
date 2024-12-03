interface LoginPayload {
  email: string;
  password: string;
  success: boolean;
  message: string;
  status: number;
  token: string;
  profile_pic:File,
  first_name:string
}

interface LoginResponse {
  success: boolean;
  message: string;
  status: number;
  token:string;
  profile_pic:File,
  first_name:string
}

export interface ILoginResponse extends LoginPayload {
  data: LoginPayload;
}

export interface IuserResponse extends LoginResponse {
  data: LoginResponse;
}

interface resgisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_pic: File;
}

interface userRegisterResponse {
  success: boolean;
  message: string;
  status: number;
}

export interface IRegisterResponse extends resgisterPayload {
  data: resgisterPayload;
}

export interface IuserResponseRegister extends userRegisterResponse {
  data: userRegisterResponse;
}

export interface registerProps {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_pic: BinaryType;
}
export interface iregisterProps extends registerProps {
  data: registerProps;
}

export interface IprofileProps {
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: File;
}
export interface profileProps extends IprofileProps {
  data: IprofileProps;
}



export interface LandingPage {
  _id: number;
  title: string;
  description: string;
  image: File;
  totalPages: number;
}

export interface LandingPageList {
  success: boolean;
  message: string;
  status: number;
  // toalPages:number
  data: LandingPage[];
}

export interface GetLandingPageListParams {
  page: number;
  perPage: number;
}


export interface LandingPageDetails {
  id: number;
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number;
  page: number;
  perPage: number;
  image: File;
}