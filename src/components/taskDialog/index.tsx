import {
  Dialog,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TaskDialogProps } from "../../types";
import styles from "./TaskDialog.module.css";
import { CloseOutlined } from "@mui/icons-material";

export default function TaskDialog({
  open,
  title,
  handleClose,
  children,
}: TaskDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      className={styles.dialog_container}
      onClose={handleClose}
      open={open}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      keepMounted
    >
      <DialogTitle>
        {title}
        <IconButton
          name="close"
          onClick={handleClose}
          className={styles.close_button}
        >
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
}
