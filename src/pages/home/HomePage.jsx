import { Box, Container, Button } from "@mui/material";
import React, { useState, useEffect, memo, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsers,
  selectUsers,
  selectUsersStatus,
} from "@/store/feature/users/users.slice";

const Home = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();

  // loading users
  const loading = useSelector(selectUsersStatus);

  useEffect(() => {
    dispatch(loadUsers(page + 1));
  }, [dispatch, page]);

  // users list
  const { users, sortByUserName, sortByUserFullName, clearFilter } =
    useSelector(selectUsers);

  // get fullname function
  const getFullName = (title, first, last) => {
    return title + ". " + first + " " + last;
  };

  // panigation change event
  const handleChangePage = (event, newPage) => {
    setSort("");
    setPage(newPage);
  };

  // handle sorting
  const handleChange = (event) => {
    setSort(event.target.value);
    if (event.target.value == 10) dispatch(sortByUserName());
    else if (event.target.value == 20) dispatch(sortByUserFullName());
  };

  return (
    <>
      <Container
        sx={{
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Users list
        </h1>

        {/* sort UI */}
        <Box
          sx={{
            paddingTop: "20px",
            paddingBottom: "40px",
            marginTop: "16px",
            marginBottom: "32px",
          }}
        >
          <Box
            sx={{
              float: "right",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort by"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Username</MenuItem>
                  <MenuItem value={20}>Fullname</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => {
                setSort("");
                dispatch(clearFilter());
              }}
            >
              Clear filter
            </Button>
          </Box>
        </Box>

        {/* table UI */}
        {loading ? (
          <div className="loading">
            <div>
              <h1>Loading ...</h1>
            </div>{" "}
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Full name</TableCell>
                  <TableCell align="right">User name</TableCell>
                  <TableCell align="right">Thumbnail icon</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {getFullName(
                        row.name.title,
                        row.name.first,
                        row.name.last
                      )}
                    </TableCell>
                    <TableCell align="right">{row.login.username}</TableCell>
                    <TableCell align="right">
                      <img src={row.picture.thumbnail} alt="user-avatar" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
            />
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Home;
