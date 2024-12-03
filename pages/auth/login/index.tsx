import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useUserSignInMutation } from "../../../CusToomHooks/auth.query.hooks";
import { ILoginResponse } from "@/typeScript/interface/auth.interface";
import { useRouter } from "next/router";
import { useNetworkCheck } from "@/Offline";
import Loader from "@/ui/Loader/Loading";
// import './Login.css'
const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginResponse>();

  const { mutate, isPending } = useUserSignInMutation();

  
  const onSubmit = (data: any) => {
    mutate(data);
    console.log(data,"logindata")
    // router.push("/cms/list");
  };
  const router = useRouter();
  const { isOnline } = useNetworkCheck();

  if (isPending) return <Loader />;
  return (
    <div className="login-div" style={{marginBottom: "0px",height:"80vh"}}>
<Container >
      {isOnline ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}  style={{marginTop:"100px"}}>
              <Paper elevation={3} sx={{ padding: 2 }} style={{height:"400px",width:"auto"}} >
                <Typography variant="h5" gutterBottom>
                  Login Form
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Invalid email format",
                      },
                    })}
                    label="Your Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                  />
                  <TextField
                    {...register("password", {
                      required: "Password is required",
                    })}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{ marginTop: 2 }}
                  >
                    {isPending ? "Loading...." : "Login"}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{ marginTop: 2 }}
                    onClick={() => {
                      router.push("/auth/registration");
                    }}
                  >
                    Register
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2961/2961264.png"
              alt=""
              height={"50px"}
            />
            <h1>No internet connection</h1>
            <p>Try thse steps to get back online</p>
            <p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1442/1442912.png"
                alt=""
                height={"15px"}
              /> Check Your Router or modem connection
            </p>
            <p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1442/1442912.png"
                alt=""
                height={"15px"}
              />   Try restarting your device
            </p>
          </div>
        </>
      )}
    </Container>
    </div>
    
  );
};

export default Login;
