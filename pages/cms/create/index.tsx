import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useUserCreateMutation } from "@/CusToomHooks/cms.query.hooks";
import { Listpage } from "@/typeScript/interface/cms.interface";
import { useNetworkCheck } from "@/Offline";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "@/ui/Loader/Loading";

const Create: React.FC = () => {
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();
  const { isOnline } = useNetworkCheck();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Listpage>();
  const { mutate, isPending } = useUserCreateMutation();

  const sendData = (formData: Listpage) => {
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);

    if (img) {
      formdata.append("image", img);
    }

    mutate(formdata, {
      onSuccess: () => {
        toast.success("Product Created Successfully");
        router.push("/cms/list");
      },
      onError: (error) => {
        console.error("Error creating product", error);
      },
    });
  };
if(isPending) return <Loader/>
  return (
    <>
      <Container style={{ height: "80vh" }}>
        {isOnline ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ margin: "50px auto" }}>
                <Paper
                  elevation={2}
                  sx={{ padding: 2 }}
                  style={{ marginBottom: "20px" }}
                >
                  <Typography variant="h5" gutterBottom>
                    Create Product
                  </Typography>
                  <form onSubmit={handleSubmit(sendData)}>
                    <TextField
                      {...register("title", {
                        required: true,
                        maxLength: 20,
                        minLength: 1,
                      })}
                      label="Title"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title && "Title is required"}
                    />

                    <TextField
                      {...register("description", {
                        required: true,
                        maxLength: 100,
                        minLength: 1,
                      })}
                      label="Description"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={!!errors.description}
                      helperText={
                        errors.description && "Description is required"
                      }
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
                          ":hover": {
                            backgroundColor: "red",
                          },
                        }}
                      >
                        Upload Image
                      </Button>
                    </label>

                    {img ? (
                      <Box mt={2}>
                        <img
                          style={{ height: "180px" }}
                          src={URL.createObjectURL(img)}
                          alt="Preview"
                          className="upload-img"
                        />
                      </Box>
                    ) : (
                      <Box mt={2}>
                        <Typography>Drag or drop content here</Typography>
                      </Box>
                    )}
                    {isPending ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                          type="submit"
                          disabled
                          sx={{ marginTop: 2 }}
                        >
                          Creating Product.....
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        sx={{ marginTop: 2,":hover":{
                          backgroundColor:"darkblue"
                        } }}
                       
                      >
                        Create Product
                      </Button>
                    )}
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
                alt="No internet"
                height={"50px"}
              />
              <h1>No internet connection</h1>
              <p>Try these steps to get back online</p>
            </div>
          </>
        )}

        <>
          <Button></Button>
        </>
      </Container>
    </>
  );
};

export default Create;
