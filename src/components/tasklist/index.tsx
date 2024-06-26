import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { Task } from "../../types";
import { Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { QueryObserverResult } from "@tanstack/react-query";

import styles from "./Tasklist.module.css";
import { deleteTask } from "../../services/api";
import TaskDialog from "../taskDialog";
import Taskform from "../taskForm";

type TasklistProps = {
  tasks: Task[];
  onRevalidate: () => Promise<QueryObserverResult<Task[], Error>>;
};

export default function Tasklist({ tasks, onRevalidate }: TasklistProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const onDelete = async (id: number) => {
    await deleteTask(id);
    onRevalidate();
  };

  return (
    <>
      <List>
        {tasks.map((item) => {
          const labelId = `checkbox-list-label-${item.task_id}`;

          return (
            <ListItem
              key={item.task_id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      setSelectedTask(item);
                      setOpenDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item.task_id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText
                  id={labelId}
                  primary={item.title}
                  className={`${item.purchased && styles.isPurchased}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <TaskDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title="Edit item"
      >
        <Taskform
          initialData={selectedTask}
          afterSubmit={() => {
            onRevalidate();
            setOpenDialog(false);
          }}
        />
      </TaskDialog>
    </>
  );
}
