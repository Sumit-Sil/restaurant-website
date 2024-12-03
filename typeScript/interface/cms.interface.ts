interface Landingpagelist {
  title: string;
  description: string;
  image: File;
  data: {};
  totalPages:number
}

export interface Listpage extends Landingpagelist {
  data: Landingpagelist;
}

interface CreateResponse {
  title:string;
  description:string

}

export interface ListResponse extends CreateResponse {
  data: CreateResponse;
}

interface ProductCreateResponse {
  mutationFn: Function;
}

export interface ProductCreateResponsefn extends ProductCreateResponse {
  data: ProductCreateResponse;
}





interface CreatePayload {
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number;
}

interface CreateResponse {
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number;
}

export interface ICreateResponse extends CreatePayload {
  data: CreatePayload;
}
export interface IuserCreateResponse extends CreateResponse {
  data: CreateResponse;
}



interface EditPayload {
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number
}

interface EditResponse {
  title: string;
  description: string;

}

export interface IEditResponse extends EditPayload {
  data: CreatePayload;
}
export interface IuserEditResponse extends EditResponse {
  data: CreateResponse;
}



interface EditPayload {
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number
}

interface EditResponse {
  title: string;
  description: string;
  success: boolean;
  message: string;
  status: number;
}

export interface IEditResponse extends EditPayload {
  data: CreatePayload;
}
export interface IuserEditResponse extends EditResponse {
  data: CreateResponse;
}

export interface createProps {
  title: string;
  description: string;
  image: BinaryType;
}
