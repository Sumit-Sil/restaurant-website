import { GetLandingPageList } from "@/Api/Functions/list.api";
import {
  DefinedInitialDataOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useGlobalHooks } from "./GlobalHooks";
import { Create,  } from "@/Api/Functions/create.api";
import { toast } from "react-toastify";
import {
  createProps,
  ICreateResponse,
  IuserEditResponse,
  Listpage,
  ListResponse,
  ProductCreateResponsefn,
} from "@/typeScript/interface/cms.interface";
import { Delete } from "@/Api/Functions/remove.api";
import { ProductUpdate } from "@/Api/Functions/edit.api";
import { useRouter } from "next/router";
import { GetLandingPageDetails } from "@/Api/Functions/details.api";
interface Landingpagelist {
  // Define the structure if known, else leave it empty for now
}

interface UpdateResponse {
  mutationFn: Function;
}

export const userProductListMutation = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ["PRODUCTS", page, perPage],
    queryFn: () => GetLandingPageList({ page, perPage }),
  });
};

export const useUserCreateMutation = (): UseMutationResult<
  createProps,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  return useMutation<createProps, void, unknown>({
    mutationFn: Create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    },
    onError: () => {
      console.error();
    },
  });
};

export const useProductDeleteMutation = () => {
  const { queryClient } = useGlobalHooks();

  return useMutation<void, unknown, { id: number }>({
    mutationFn: ({ id }) => Delete(id),
    onSuccess: () => {
      // toast(message, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["PRODUCTS"] });
      toast("Product Deleted Successfully");
    },
  });
};

export const useProductUpdateMutation = (): UseMutationResult<
  IuserEditResponse,
  unknown,
  unknown
> => {
  const { queryClient } = useGlobalHooks();

  return useMutation<IuserEditResponse, void, unknown, void>({
    mutationFn: ProductUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UPDATE"] });
    },
    onError: () => {
      console.error();
    },
  });
};
// export const userDetailMutation = (id): UseQueryResult<
// Listpage,
// unknown
// > => {
// const { queryClient } = useGlobalHooks();

// return useQuery<Listpage, unknown>({
//   queryKey: ["DETAIL",id],
//   queryFn: GetLandingPageDetails(id),

// });
// };

export const DetailsQuery = (id: string) => {
  const { queryClient } = useGlobalHooks();

  return useQuery({
    queryKey: ["DETAILS", id],
    queryFn: () => GetLandingPageDetails(id),

    // enabled: !!id,
  });
};
