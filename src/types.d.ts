export type Task = {
  task_id: number;
  title: string;
  description: string;
  quantity: number;
  purchased: boolean;
  created_at: string;
};

export type TaskformInputs = Pick<
  Task,
  "title" | "description" | "quantity" | "purchased"
>;

export type TaskDialogProps = {
  handleClose: () => void;
  title: string;
  open: boolean;
  children: React.ReactNode;
};
