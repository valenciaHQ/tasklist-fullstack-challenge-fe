import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/api";
import styles from "./Home.module.css";
import Tasklist from "../../components/tasklist";
import { Task } from "../../types";
import Taskform from "../../components/taskForm";
import TaskDialog from "../../components/taskDialog";
import React from "react";

export default function Home() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { isLoading, isError, data, refetch } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" className={styles.error_container}>
        <Typography variant="h4">Unexpected error!</Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <Container maxWidth="lg" className={styles.empty_container}>
          <Typography variant="h4">Your shopping cart is empty!</Typography>
          <Button onClick={() => setOpenDialog(true)} variant="contained">
            Start adding items
          </Button>
        </Container>
        <TaskDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          title="Add new item"
        >
          <Taskform
            afterSubmit={() => {
              refetch();
              setOpenDialog(false);
            }}
          />
        </TaskDialog>
      </>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Paper className={styles.list_container}>
          <Box className={styles.header_container}>
            <Typography variant="h4">Your items</Typography>
            <Button onClick={() => setOpenDialog(true)}>Add new item</Button>
          </Box>
          <Divider orientation="horizontal" />
          <Tasklist tasks={data || []} onRevalidate={refetch} />
        </Paper>
      </Container>
      <TaskDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title="Add new item"
      >
        <Taskform
          afterSubmit={() => {
            refetch();
            setOpenDialog(false);
          }}
        />
      </TaskDialog>
    </>
  );
}
