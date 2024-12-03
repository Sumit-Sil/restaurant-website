import { profile_pic } from "@/Api/Axios/Axios";
import { userProfileMutation } from "@/CusToomHooks/auth.query.hooks";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  useTheme,
  Container,
} from "@mui/material";
import { useNetworkCheck } from "@/Offline";

const Profile = () => {
  const { data, isPending } = userProfileMutation();
  const theme = useTheme(); // Access the current theme (light or dark mode)

  console.log(data, "profile-data");
  console.log(isPending, "pending");

  const img: File | undefined = data?.data?.profile_pic;
  const { isOnline } = useNetworkCheck();
  return (
    <Container>
      {isOnline ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
              backgroundColor: theme.palette.background.default, // Dynamic background
              color: theme.palette.text.primary, // Dynamic text color
              transition: "background-color 0.3s, color 0.3s", // Smooth transition
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                maxWidth: 900,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
                backgroundColor: theme.palette.background.paper, // Dynamic card background
                transition: "background-color 0.3s",
              }}
            >
              {/* Left Section - User Details */}
              <CardContent
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "24px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: theme.palette.text.primary, // Dynamic text color
                  }}
                >
                  User Profile
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "20px", marginBottom: "8px" }}
                >
                  <span
                    style={{
                      color: theme.palette.success.main,
                      fontWeight: "600",
                    }}
                  >
                    First Name:{" "}
                  </span>
                  <span style={{ color: theme.palette.error.main }}>
                    {data?.data?.first_name || "N/A"}
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "20px", marginBottom: "8px" }}
                >
                  <span
                    style={{
                      color: theme.palette.success.main,
                      fontWeight: "600",
                    }}
                  >
                    Last Name:{" "}
                  </span>
                  <span style={{ color: theme.palette.error.main }}>
                    {data?.data?.last_name || "N/A"}
                  </span>
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "20px" }}>
                  <span
                    style={{
                      color: theme.palette.success.main,
                      fontWeight: "600",
                    }}
                  >
                    E-Mail:{" "}
                  </span>
                  <span style={{ color: theme.palette.error.main }}>
                    {data?.data?.email || "N/A"}
                  </span>
                </Typography>
              </CardContent>

              {/* Right Section - Profile Image */}
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: theme.palette.background.default, // Dynamic background
                  borderLeft: { md: `1px solid ${theme.palette.divider}` },
                }}
              >
                <Avatar
                  src={profile_pic(img)}
                  alt="Profile"
                  sx={{
                    width: "250px",
                    height: "300px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </Box>
            </Card>
          </Box>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2961/2961264.png"
              alt="No internet"
              height={"50px"}
            />
            <h1>No internet connection</h1>
            <p>Try these steps to get back online</p>
            <p> Check Your Router or modem connection</p>
            <p> Try restarting your device</p>
          </div>
        </>
      )}
    </Container>
  );
};

export default Profile;
