import {
  useProductDeleteMutation,
  userProductListMutation,
} from "@/CusToomHooks/cms.query.hooks";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance, { product } from "@/Api/Axios/Axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SweetAlertComponent from "@/ui/alerts/Sweetalert";
import { toast } from "react-toastify";
import Link from "next/link";
import { useNetworkCheck } from "@/Offline";
import { useRouter } from "next/router";
import Loader from "@/ui/Loader/Loading";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function List() {
  const [idVal, setidVal] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState<string>("");
  const perPage = 10;
  const [modal, setmodal] = useState(false);
  const { data, isPending } = userProductListMutation(page, perPage);
  const tp = (data as any)?.data?.totalPages;
  const prod = data?.data?.data;
  const deleted = useProductDeleteMutation();
  const { isOnline } = useNetworkCheck();
  const router = useRouter();
  console.log(data);
  console.log(tp, "totalpage");
  const [toggle, settoggle] = useState(false);

  const toggling = () => {
    settoggle(!toggle);
  };

  const del = (idVal: number) => {
    deleted.mutate({ id: idVal });
    setmodal(false);
    console.log(idVal, "idVal");
  };
  const handleNextPage = () => {
    if (page >= 1) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.info("You're on the last page");
    }
  };
  console.log(page, "dhc");
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      toast.info("You're on the first page");
    }
  };

  const filterprod = prod?.filter(
    (product: { title: string; description: string; image: File }) =>
      product.title.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filterprod, "filtered");
  // if (isPending) return <Loader />;
  return (
    <div >
      {isOnline ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "40px",
            }}
            className="flex justify-center items-center  m-3"
          >
            <input
              className="p-1 py-2 width:[40%] bg-slate-200 rounded-xl hover:shadow-lg hover:shadow-slate-300"
              type="text"
              placeholder="Search here"
              value={search}
              style={{
                padding: "16px",
                paddingTop: "32px",
                paddingBottom: "32px",
                width: "15%",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          </div>

          {Array.isArray(filterprod) && filterprod.length > 0 ? (
            <>
              <Button
                style={{ marginLeft: "100px", fontSize: "17px" }}
                onClick={() => {
                  toggling();
                }}
              >
                {toggle ? "Show as Card" : "Show as List"}
              </Button>
              {toggle ? (
                <>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell
                            style={{ fontSize: "25px" }}
                            align="center"
                          >
                            Title
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontSize: "25px" }}
                            align="center"
                          >
                            Description
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontSize: "25px" }}
                            align="center"
                          >
                            Image
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ fontSize: "25px" }}
                            align="center"
                          >
                            {" "}
                            Controls{" "}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(filterprod) &&
                          filterprod.map((d) => (
                            <StyledTableRow key={d._id}>
                              <StyledTableCell
                                style={{ fontSize: "20px" }}
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {d.title}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{ fontSize: "18px" }}
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {d.description}
                              </StyledTableCell>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                <img
                                  style={{ marginLeft: "30px" }}
                                  src={product(d.image)}
                                  alt="Error"
                                  height="200px"
                                  width="220px"
                                />
                              </StyledTableCell>
                              <StyledTableCell>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>
                                    {" "}
                                    <Button
                                      onClick={() => {
                                        setidVal(d._id);
                                        setmodal(true);
                                      }}
                                    >
                                      <i
                                        style={{ fontSize: "25px" }}
                                        className="fa-solid fa-trash"
                                      ></i>
                                    </Button>
                                  </div>
                                  <div>
                                    <Button
                                      href={`/cms/list/${d._id}`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <i
                                        style={{ fontSize: "25px" }}
                                        className="fa-regular fa-pen-to-square"
                                      ></i>
                                    </Button>
                                  </div>
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>{" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "green" }}
                      onClick={() => {
                        router.push("/cms/create");
                      }}
                    >
                      Create new Product
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {Array.isArray(filterprod) &&
                      filterprod?.map((item) => (
                        <Card
                          key={item._id}
                          sx={{
                            margin: "10px",
                            maxHeight: "350px",
                            width: "250px",
                            ":hover": {
                              boxShadow: 18,
                              // height: 400,
                              // width: 310,
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            alt=""
                            height="140"
                            image={
                              item.image
                                ? product(item.image)
                                : "https://t4.ftcdn.net/jpg/03/02/74/89/360_F_302748918_Vs76DTDodjhhkYuCEFahu0LcoDZkBuaW.jpg"
                            }
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button>
                              <Link
                                href={`/cms/list/${item._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                Update
                              </Link>
                            </Button>
                            <Button
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                setidVal(item._id);
                                setmodal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </CardActions>
                        </Card>
                      ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "green" }}
                      onClick={() => {
                        router.push("/cms/create");
                      }}
                    >
                      Create new Product
                    </Button>
                  </div>
                </>
              )}

              {data && (
                <div className="d-flex justify-content-between mx-3 my-3">
                  <button
                    className="btn btn-primary"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {tp}
                  </span>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextPage}
                    disabled={page === tp}
                  >
                    Next
                  </button>
                </div>
              )}

              {modal && (
                <SweetAlertComponent
                  confirm={() => {
                    if (idVal !== undefined) {
                      del(idVal);
                    } else {
                      console.error("ID is undefined");
                    }
                  }}
                  cancel={() => setmodal(false)}
                  title={"Are you sure?"}
                  subtitle={"You will not be able to recover!"}
                />
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "15px",
                paddingBottom: "15px",
                height: "70vh",
                flexDirection: "column",
              }}
            >
              <h1>No data found</h1>
              <Button
                variant="contained"
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  router.push("/cms/create");
                }}
              >
                Create new Product
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              paddingTop: "20px",
              height: "70vh",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2961/2961264.png"
              alt=""
              height={"50px"}
            />
            <h1>No internet connection</h1>
            <p>Try these steps to get back online</p>
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
    </div>
  );
}
