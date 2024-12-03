import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating as MuiRating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/system";
import { useNetworkCheck } from "@/Offline";

interface Rating {
  name: string;
  domain: string;
  review: string;
  rating: number;
}

interface Partner {
  logo: string;
  altText: string;
}

const ratings: Rating[] = [
  {
    name: "Jane Doe",
    domain: "restaurant client",
    review: "Amazing food and excellent service! Highly recommended!",
    rating: 5,
  },
  {
    name: "John Smith",
    domain: "food lover",
    review: "A delightful experience with every bite.",
    rating: 5,
  },
  {
    name: "Samuel Andrews",
    domain: "food Blogger",
    review: "Refreshing Taste With Supreme Hygiene.",
    rating: 4,
  },
  // Add more ratings as needed
];

const partners: Partner[] = [
  {
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Zomato-Logo.png",
    altText: "Partner 1",
  },
  {
    logo: "https://tse2.mm.bing.net/th?id=OIP.ii02tKB9hMkKVIJkmx1lXAHaEK&pid=Api&P=0&h=180",
    altText: "Partner 2",
  },
  {
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Logo-2016-2017.png",
    altText: "Partner 3",
  },
  {
    logo: "https://tse3.mm.bing.net/th?id=OIP.lVMlFflkKS8WTQzYFfqhmQHaDs&pid=Api&P=0&h=180",
    altText: "Partner 4",
  },
  {
    logo: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/9cf87b175115925.64ae2ff92f3d4.jpg",
    altText: "Partner 5",
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const AboutUs = () => {
  const RatingCard: React.FC<Rating> = ({ name, domain, review, rating }) => (
    <StyledCard
      style={{ height: "280px",width:"250px", display: "flex",gap:"5px", flexDirection: "column" }}
    >
      <CardContent style={{ flexGrow: 1 }}>
        <MuiRating
          value={rating}
          readOnly
          precision={1}
          icon={<StarIcon fontSize="inherit" color="primary" />}
          emptyIcon={<StarIcon fontSize="inherit" />}
        />
        <Typography variant="body2" fontSize={"15px"} color="text.secondary" sx={{ mt: 2 }}>
          {review}
        </Typography>
      </CardContent>
      <CardContent
        style={{ display: "flex", flexDirection: "column", paddingTop: 0 }}
      >
        <Typography
          flexGrow={1}
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}
          fontSize={"20px"}
        >
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {domain}
        </Typography>
      </CardContent>
    </StyledCard>
  );
  const { isOnline } = useNetworkCheck();
  return (
    <Container>
      {isOnline ? (
        <>
          <Box
            sx={{ minHeight: "100vh", py: 5, bgcolor: "background.default" }}
          >
            <Container maxWidth="md">
              <Box textAlign="center" mb={5}>
                <Typography variant="h3" gutterBottom>
                  About Us
                </Typography>
                <Typography sx={{fontSize:"20px"}} variant="body1" color="text.secondary">
                  Welcome to Foodiz, where flavor, freshness, and community come
                  together! Founded on a passion for culinary excellence, we
                  strive to bring you an unforgettable dining experience with
                  every visit.
                </Typography>
              </Box>
              <Box textAlign="center" mb={5} paddingTop={"15px"}>
                <Typography variant="h4" color={"red"} gutterBottom>
                  Our Clients Love Us
                </Typography>
                <Typography
                  paddingTop={"15px"}
                  variant="body2"
                  color="text.secondary"
                  fontSize={"20px"}
                >
                  We have been rated 4.4{" "}
                  <StarIcon fontSize="small" color="primary" /> out of 5 (700
                  reviews). See what our clients are saying about our services!
                </Typography>
              </Box>
              <Grid container spacing={4} justifyContent="center">
                {ratings.map((rating, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <RatingCard {...rating} />
                  </Grid>
                ))}
              </Grid>
              <Box textAlign="center" mt={8}>
                <Typography variant="h5" gutterBottom paddingBottom={"10px"} fontSize={"34px"}>
                  Our Partners
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {partners.map((partner, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index}>
                      <CardMedia
                        component="img"
                        image={partner.logo}
                        alt={partner.altText}
                        sx={{ maxWidth: 100, mx: "auto", mb: 2 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Container>
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
              height:"100vh"
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

export default AboutUs;
