//Materail Ui
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Icons from "./Icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { indigo } from "@mui/material/colors";
import { Typography } from "@mui/material";
//Others
import { useContext } from "react";
import { tasksContext } from "../Contexts/ContextTasks";
import { useState } from "react";

export default function Tasks() {
  const Blue = indigo[900];
  const useContextTasks = useContext(tasksContext);

  const { tasks, setTask, task } = useContext(tasksContext);

  const [edit, setEdit] = useState({ task: task.task, details: task.details });

  function checkOnClick() {
    const updatedtodo = tasks.map((t) => {
      if (task.id === t.id) {
        t.isComplated = !t.isComplated;
      }
      return t;
    });
    setTask(updatedtodo);
    localStorage.setItem('tasks', JSON.stringify(updatedtodo))
  }

  function deleteOnClick() {
    handleOpen();
  }

  function handleDelete() {
    const deleteTodo = tasks.filter((t) => {
      return t.id !== task.id;
    });
    setTask(deleteTodo);
    localStorage.setItem('tasks', JSON.stringify(deleteTodo))
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  function handleEdit() {
    const editTodo = tasks.map((t) => {
      if (task.id === t.id) {
        return {...t, task: edit.task, details: edit.details}
      } else {
        return t;
      }
    });
    setTask(editTodo);
    localStorage.setItem('tasks', JSON.stringify(editTodo))
    handleCloseEdit()
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        backgroundColor={Blue}
        color="white"
        paddingY="10px"
        style={{ marginBottom: "20px" }}
        className="gridtasks"
        marginX="0px"
      >
        <Grid xs={8}>
          <Typography variant="h5" style={{ textAlign: "right", margin: "0", textDecoration: task.isComplated ? 'line-through' : 'none'}}>
            {useContextTasks.task.task}
          </Typography>
          <Typography variant="h6" style={{ textAlign: "right", margin: "0", textDecoration: task.isComplated ? 'line-through' : 'none'}}>
            {useContextTasks.task.details}
          </Typography>
        </Grid>

        <Grid
          xs={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Icons
            background={useContextTasks.task.isComplated ? "#8bc34a" : "white"}
            color={!useContextTasks.task.isComplated ? "#8bc34a" : "white"}
            iconName={<CheckIcon />}
            onClick={checkOnClick}
          />
          <Icons
            background="white"
            color="#1769aa"
            iconName={<EditIcon />}
            onClick={handleOpenEdit}
          />
          <Icons
            background="white"
            color="#b23c17"
            iconName={<DeleteOutlineIcon />}
            onClick={deleteOnClick}
          />
        </Grid>
      </Grid>

      {/* Deleting Model */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ direction: "rtl" }}
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">هل انت متأكد من حذف هذه المهمة ؟</h2>
          <p id="parent-modal-description">
            لا يمكن التراجع عن الحذف في حال اختيار زر (حذف)
          </p>
          <Button color="error" variant="text" onClick={handleDelete}>
            نعم قم بالحذف
          </Button>
          <Button variant="text" onClick={handleClose}>
            اغلاق
          </Button>
        </Box>
      </Modal>

      {/* Editing Model */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: "rtl" }}
      >
        <DialogContent>
          <Typography>تعديل المهمة</Typography>
          <TextField
            value={edit.task}
            sx={{ width: "100%", marginBottom: "15px" }}
            id="standard-basic"
            label="العنوان"
            variant="standard"
            onChange={(e) => {
              setEdit({ ...edit, task: e.target.value });
            }}
          />
          <TextField
            value={edit.details}
            sx={{ width: "100%" }}
            id="standard-basic"
            label="التفاصيل"
            variant="standard"
            onChange={(e) => {
              setEdit({ ...edit, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>الغاء</Button>
          <Button onClick={handleEdit} autoFocus>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
