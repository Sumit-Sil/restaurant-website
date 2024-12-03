import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
// import I1 from "../Images/WhatsApp Image 2024-11-17 at 14.57.57_4cf76f79.jpg";
// import I2 from "../Images/WhatsApp Image 2024-11-17 at 14.57.58_65e3c586.jpg";
import I1 from "../Images/05e0e55516be5a303a3fc21b51d6b145.jpg";
import I2 from "../Images/27nov_06.jpg";
// import I3 from "../Images/WhatsApp Image 2024-11-17 at 14.57.58_83da2eb0.jpg";
import I3 from "../Images/Untitled design (1).jpg";
import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
var settings = {
  dots: true,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export default function Home() {
  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const router = useRouter();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  var items = [
    {
      image: I1,
      text: "explore more",
    },

    {
      image: I2,
      text: "explore more",
    },
    {
      image: I3,
      text: "explore more",
    },
  ];

  return (
    <>
      <div className="parent" style={{ paddingTop: "0px" }}>
        <main
          className={`${styles.main} ${inter.className}`}
          style={{ padding: "0", margin: "0" }}
        >
          <Carousel>
            {items.map((item, i) => (
              <div style={{ position: "relative" }}>
                <Image
                  key={i}
                  alt={`img-slide-${i}`}
                  width={"1920"}
                  height={600}
                  src={item.image}
                  style={{ width: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  {/* <h1
                    style={{
                      color: "#0077b6",
                      fontSize: "70px",
                      fontFamily: "cursive",
                    }}
                  >
                    Delicious Food Menu
                  </h1>
                  <h2
                    style={{
                      color: "#D90368",
                      textAlign: "center",
                      fontFamily: "revert-layer",
                    }}
                  >
                    With Unbelievable Offers
                  </h2> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "5px",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#49B6FF",
                        alignContent: "center",
                        height: "50px",
                        width: "120px",
                        fontSize: "15px",
                      }}
                      onClick={() => {
                        router.push("/auth/login");
                      }}
                    >
                      Login Now
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "15px",
                    }}
                  >
                    <p
                      style={{
                        color: "#1D66B9",
                        fontSize: "25px",
                        fontWeight: "700",
                      }}
                    >
                      Don't have an account?{" "}
                      <>
                        <Link
                          style={{ color: "#D7FFAB" }}
                          href="/auth/registration"
                        >
                          Register Here
                        </Link>
                      </>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          <Container sx={{ marginBottom: "90px", marginTop: "55px" }}>
            <div
              style={{
                paddingLeft: "0px",
                fontFamily: "Protest Guerrilla",
                fontSize: "35px",
                color: "#006d77",
              }}
            >
              Our BestSellers
            </div>
            <Grid container columns={12} sx={{ paddingTop: "20px" }}>
              <Grid item xs={4}>
                <Card
                  style={{ height: "350px" }}
                  sx={{
                    maxWidth: 345,
                    ":hover": {
                      boxShadow: 18,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://media.istockphoto.com/id/1453499717/photo/chicken-biryani-or-biriyani-served-in-plate-isolated-on-table-top-view-indian-spicy-food.jpg?s=2048x2048&w=is&k=20&c=74RRAlcfhYZKX5dOvWmEAa_OD9ucNpvUycC88CJcBVA="
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Mutton Handi Biriyani
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Delicious Muttton Biriyani Cooked at low flame With All
                      The Indian Spices
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <>
                        <s style={{ paddingRight: "2px" }}>₹499 </s>
                      </>{" "}
                      <>₹349</>
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        ":hover": {
                          backgroundColor: "blue",
                          color: "magenta",
                        },
                      }}
                    >
                      Order Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={4}>
                <Card
                  style={{ height: "350px" }}
                  sx={{
                    maxWidth: 345,
                    ":hover": {
                      boxShadow: 18,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Chicken Dish"
                    height="140"
                    image="https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Fried Chicken
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Chicken Grilled And Fried With A Smoky Flavour To make
                      Your Outing Memorable
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <>
                        <s style={{ paddingRight: "2px" }}>₹599 </s>
                      </>{" "}
                      <>₹399</>
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        ":hover": {
                          backgroundColor: "blue",
                          color: "magenta",
                        },
                      }}
                    >
                      Order Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={4}>
                <Card
                  style={{ height: "350px" }}
                  sx={{
                    maxWidth: 345,
                    ":hover": {
                      boxShadow: 18,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Pizza"
                    height="140"
                    image="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Spicy Chicken Pizza
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      A Spicy Tangy Pizza With All The Toppings and
                      Complementary Coke
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <>
                        <s style={{ paddingRight: "2px" }}>₹299 </s>
                      </>{" "}
                      <>₹199</>
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        ":hover": {
                          backgroundColor: "blue",
                          color: "magenta",
                        },
                      }}
                    >
                      Order Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>

          <Container>
            <div
              style={{
                paddingLeft: "0px",
                fontFamily: "Protest Guerrilla",
                fontSize: "35px",
                color: "#006d77",
              }}
            >
              Our Services
            </div>
            <Grid container columns={12} sx={{ paddingTop: "20px" }}>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <h4 style={{ color: "darkgreen",fontSize:"20px" }}>
                  {" "}
                  Experience The Joy of Dine-in
                </h4>
                <p
                  style={{
                    color: "skyblue",
                    fontSize: "18px",
                    paddingTop: "5px",
                  }}
                >
                  Step into a world of culinary delight where every meal becomes
                  a celebration. At Foodiz, we take pride in offering a warm and
                  inviting ambiance perfect for family gatherings, romantic
                  dinners, or catching up with friends. Savor the flavors of our
                  expertly crafted dishes, prepared with the freshest
                  ingredients and a passion for excellence. From appetizers to
                  desserts, our menu is designed to cater to every taste and
                  preference. Let us turn your ordinary dining moments into
                  extraordinary memories. Reserve your table today and indulge
                  in an unforgettable dine-in experience. Your table awaits!
                </p>
              </Grid>

              <Grid item xs={6} style={{ paddingLeft: "22px" }}>
                <img
                  src="https://images.unsplash.com/photo-1724589511191-1ced6d014934?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  height="300px"
                  width="100%"
                />
              </Grid>
            </Grid>
          </Container>

          <Container sx={{ marginBottom: "90px" }}>
            <Grid container columns={12} sx={{ paddingTop: "70px" }}>
              <Grid item xs={6}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1682130100826-913b21060e4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  height="300px"
                  width="100%"
                  style={{ paddingRight: "25px" }}
                />
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <h4 style={{ color: "darkgreen",fontSize:"22px" }}> 24/7 Fast Delivery</h4>
                <p
                  style={{
                    color: "skyblue",
                    paddingTop: "5px",
                    fontSize: "18px",
                  }}
                >
                  At our restaurant, we understand that hunger doesn't follow a
                  schedule, and cravings can strike anytime—morning, noon, or
                  the middle of the night. That’s why we are proud to offer fast
                  24/7 delivery, ensuring your favorite meals reach you whenever
                  you need them.Our lightning-fast delivery service is designed
                  to bring your orders hot, fresh, and bursting with flavor,
                  straight from our kitchen to your doorstep. With a team of
                  dedicated delivery partners and a seamless ordering system, we
                  promise a hassle-free experience every time.we deliver joy one
                  meal at a time—because your satisfaction is our top priority!
                </p>
              </Grid>
            </Grid>
          </Container>
          {/* <Container   sx={{ marginBottom: "90px", marginTop: "55px" }}>
        
            <div
              style={{
                paddingLeft: "0px",
                fontFamily: "Protest Guerrilla",
                fontSize: "35px",
                color: "#006d77",
              }}
            >
              Our Outlets
            </div>
<Grid container columns={12} >


  
</Grid>


          </Container> */}

          {/* <Container>
            <Slider {...settings}>
              <img
                id="k"
                src="https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg"
                alt=""
                height="500px"
              />

              <img
                id="k"
                src="https://cdn.pixabay.com/photo/2021/02/06/19/29/pancakes-5989136_1280.jpg"
                alt=""
                height="500px"
              />

              <img
                id="k"
                src="https://cdn.pixabay.com/photo/2021/10/28/08/48/momos-6749181_1280.jpg"
                alt=""
                height="500px"
              />

              <img
                id="k"
                src="https://cdn.pixabay.com/photo/2018/03/29/02/55/food-3271156_1280.jpg"
                alt=""
                height="500px"
              />
            </Slider>
          </Container> */}
        </main>
      </div>
    </>
  );
}
