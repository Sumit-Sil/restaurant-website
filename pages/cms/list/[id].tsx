import {
  DetailsQuery,
  useProductUpdateMutation,
} from "@/CusToomHooks/cms.query.hooks";
import { Listpage } from "@/typeScript/interface/cms.interface";
import Loader from "@/ui/Loader/Loading";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UpdateProps {
  id: string;
}

const Update: React.FC<UpdateProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setloading] = useState<boolean>(false);
  const [img, setImg] = useState<File | null>(null); // Track the uploaded image file
  const { mutate } = useProductUpdateMutation();
  const { isPending, data, isError } = DetailsQuery(id as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Listpage>();

  useEffect(() => {
    if (!isPending && !isError && data) {
      setValue("title", data.title);
      setValue("description", data.description);
    }
  }, [data, setValue, isPending, isError]);

  const sendData = async (e: Listpage) => {
    const formdata = new FormData();
    formdata.append("id", id as string);
    formdata.append("title", e.title);
    formdata.append("description", e.description);

    if (img) {
      formdata.append("image", img);
    }
    setloading(true);
    mutate(formdata, {
      onSuccess: () => {
        toast.success("Product Data Updated Successfully");
        router.push("/cms/list");
      },
      onError: () => {
        toast.error("Something Went Wrong!Product Data not updated");
      },
    });
  };
  if (loading) return <Loader />;
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography
              variant="h3"
              gutterBottom
              style={{ textAlign: "center", color: "black" }}
            >
              Update Form
            </Typography>
            <form onSubmit={handleSubmit(sendData)}>
              <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                Title
              </Typography>
              <TextField
                {...register("title", {
                  required: "Title is required",
                })}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title && "Title is required"}
                style={{ paddingBottom: "10px" }}
              />

              <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                Description
              </Typography>
              <TextField
                {...register("description", {
                  required: "Description is required",
                  maxLength: 100,
                })}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description && "Description is required"}
                style={{ paddingBottom: "10px" }}
              />

              <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                Image
              </Typography>
              <div className="mb-3">
                <input
                  type="file"
                  onChange={(e) =>
                    setImg(e.target.files ? e.target.files[0] : null)
                  }
                  name="img"
                  accept="image/*"
                  className="form-control"
                />

                {img ? (
                  <img
                    height="60px"
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    className="upload-img"
                  />
                ) : (
                  data?.image && (
                    <img
                      height="90px"
                      src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${data.image}`}
                      alt="Existing"
                      className="upload-img"
                    />
                  )
                )}
              </div>
              {loading ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{ marginTop: 2 }}
                    disabled
                  >
                    Updating Product....
                  </Button>
                </>
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
                    Update Product
                  </Button>
                </>
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Update;
