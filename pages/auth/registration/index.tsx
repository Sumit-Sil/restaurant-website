import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useUserSignUpMutation } from "../../../CusToomHooks/auth.query.hooks";
import { useRouter } from "next/router";
import {
  IRegisterResponse,
} from "@/typeScript/interface/auth.interface";
import { useNetworkCheck } from "@/Offline";
import Loader from "@/ui/Loader/Loading";

const register: React.FC = () => {
  const [img, setImg] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterResponse>();

  const { mutate, isPending } = useUserSignUpMutation();
  const router = useRouter();
  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (img) {
      formData.append("profile_pic", img);
    }
    mutate(formData,{
      onSuccess:()=>{
        router.push("/auth/login")
      }
    });
  };
  console.log(isPending, "isPending");

  const { isOnline } = useNetworkCheck();

  if (isPending) return <Loader />;
  return (
    <Container>
      {isOnline ? (
        <>
          <Grid container spacing={2} height={"100vh"} sx={
            {paddingTop:"20px"}
          }>
            <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Contact Form
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    label="First Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                  />
                  <TextField
                    {...register("last_name", {
                      required: "last_name is required",
                    })}
                    label="last_name"
                    type="last_name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                  />
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
                    helperText={errors.email && errors.email?.message}
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
                    helperText={errors.password && errors.password?.message}
                  />

                  <input
                    accept="image/*"
                    id="upload-button"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setImg(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="upload-button">
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      sx={{
                        backgroundColor: "#E6B9A6",
                        "&:hover": {
                          backgroundColor: "#EEEDEB",
                          color: "#E6B9A6",
                        },
                      }}
                    >
                      Upload
                    </Button>
                  </label>
                  {img ? (
                    <Box mt={2}>
                      <img
                        style={{ height: "180px" }}
                        src={URL.createObjectURL(img)}
                        alt=""
                        className="upload-img"
                      />
                    </Box>
                  ) : (
                    <Box mt={2}>
                      <p>Drag or drop content here</p>
                    </Box>
                  )}

                  {isPending ? (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      sx={{ marginTop: 2 }}
                    >
                      Loading...
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        sx={{ marginTop: 2 }}
                      >
                        Register
                      </Button>{" "}
                    </>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{ marginTop: 2 }}
                    onClick={() => {
                      router.push("/auth/login");
                    }}
                  >
                    Login
                  </Button>

                  {/* )} */}
                </form>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
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
              />{" "}
              Check Your Router or modem connection
            </p>
            <p>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1442/1442912.png"
                alt=""
                height={"15px"}
              />{" "}
              Try restarting your device
            </p>
          </div>
        </>
      )}
    </Container>
  );
};

export default register;
