export const endpoints = {
  auth: {
    signin: "/user/signin",
    signup: "/user/signup",
    profile:"/user/profile-details"
  },
  cms:{
    list:"/product/list",
     create:"/product/create",
     remove:"/product/remove",
     update:"/product/update",
     details:"/product/detail"
  }
};

export const successNotificationEndpoints: string[] = [
  endpoints.auth.signin,
  endpoints.auth.signup,
  endpoints.cms.list,
  endpoints.cms.create,
  endpoints.cms.remove,
  endpoints.cms.details,
  endpoints.cms.update,
  endpoints.auth.profile
];
