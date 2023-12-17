import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../service/books/slice";
import { addReading } from "../service/reading/slice";
import { toast } from "react-toastify";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const bookId = params.id;
  const dispatch = useDispatch();
  const { showingBook } = useSelector((state) => state.books);
  const book = showingBook;
  const addToReadingList = (book) => {
    try {
      dispatch(addReading(book));
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   const postData = async () => {
  //     if (!addingBook) return;
  //     setLoading(true);
  //     try {
  //       await api.post(`/favorites`, addingBook);
  //
  //     } catch (error) {
  //
  //     }
  //     setLoading(false);
  //   };
  //   postData();
  // }, [addingBook]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await api.get(`/books/${bookId}`);
  //       setBook(res.data);
  //     } catch (error) {
  //
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [bookId]);

  useEffect(() => {
    setLoading(true);
    try {
      dispatch(getBook(bookId));
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }, [dispatch, bookId]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(book)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
