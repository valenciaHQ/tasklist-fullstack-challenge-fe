import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Task, TaskformInputs } from "../../types";
import styles from "./Taskform.module.css";
import axios from "axios";
import { addTask, editTask } from "../../services/api";
import { useEffect } from "react";

const quantityValues = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(
  (item) => ({ label: item, value: item })
);

export default function Taskform({
  initialData,
  afterSubmit,
}: {
  initialData?: Task | null;
  afterSubmit: () => void;
}) {
  const { handleSubmit, watch, control, reset } = useForm<TaskformInputs>({
    defaultValues: {
      title: initialData?.title,
      description: initialData?.description,
      quantity: initialData?.quantity,
      purchased: initialData?.purchased,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData?.title,
        description: initialData?.description,
        quantity: initialData?.quantity,
        purchased: initialData?.purchased,
      });
    }
  }, [reset]);

  const onSubmit: SubmitHandler<TaskformInputs> = async (data) => {
    if (initialData) {
      await editTask(initialData.task_id, data);
    } else {
      await addTask(data);
    }
    afterSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className={styles.form_container}>
        <FormGroup>
          <FormControl className={styles.input_container}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Title" variant="outlined" />
              )}
            />
          </FormControl>
          <FormControl className={styles.input_container}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  multiline
                  minRows={5}
                />
              )}
            />
          </FormControl>

          <FormControl className={styles.input_container}>
            <InputLabel>Quantity</InputLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <Select onChange={onChange} value={value}>
                  {quantityValues.map((option: any) => {
                    return (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
              control={control}
              name="quantity"
            />
          </FormControl>

          <FormControlLabel
            control={
              <Controller
                name="purchased"
                control={control}
                render={({ field }) => <Checkbox {...field} />}
              />
            }
            label="Purchased"
          />
        </FormGroup>
        <Divider orientation="horizontal" />
        <Button type="submit" variant="contained" sx={{ marginTop: "2rem" }}>
          Submit
        </Button>
      </Container>
    </form>
  );
}
