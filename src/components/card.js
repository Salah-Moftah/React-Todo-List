//Materail UI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Tasks from "./Tasks";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";
//Others
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { tasksContext } from "../Contexts/ContextTasks";
import { useEffect } from "react";

export default function BasicCard() {
  const [alignment, setAlignment] = useState("right");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [task, setTask] = useState([
    {
      id: uuidv4(),
      task: "قراءة كتاب",
      details: "ساعة في اليوم",
      isComplated: false,
    },
    {
      id: uuidv4(),
      task: "انهاء كورس الريأكت",
      details: "في شهر 7",
      isComplated: false,
    },
    {
      id: uuidv4(),
      task: "تمرين الجيم",
      details: "ساعتين في اليوم",
      isComplated: true,
    },
  ]);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    if (localStorage.getItem("tasks") !== null) {
      let tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));
      setTask(tasksLocalStorage);
    } else {
      let tasksLocalStorage = task;
      setTask(tasksLocalStorage);
    }
  }, []);

  const doneTodo = task.filter((t) => {
    return t.isComplated;
  });
  const NotdoneTodo = task.filter((t) => {
    return !t.isComplated;
  });

  let tasksToRendered = task;
  if (alignment === "center") {
    tasksToRendered = doneTodo;
  } else if (alignment === "left") {
    tasksToRendered = NotdoneTodo;
  } else {
    tasksToRendered = task;
  }

  const TasksList = tasksToRendered.map((t) => {
    return (
      <div key={t.id}>
        <tasksContext.Provider value={{ task: t, setTask, tasks: task }}>
          <Tasks />
        </tasksContext.Provider>
      </div>
    );
  });

  function handleAddClick() {
    const newTask = {
      id: uuidv4(),
      task: titleInput,
      details: "",
      isComplated: false,
    };
    const updatedtodos = [...task, newTask];
    setTask(updatedtodos);
    localStorage.setItem("tasks", JSON.stringify(updatedtodos));
    setTitleInput("");
  }
  function handleNewTask(t) {
    setTitleInput(t.target.value);
  }

  return (
    <Card
      sx={{ minWidth: 575 }}
      style={{ textAlign: "center", padding: "10px", overflow: 'scroll', maxHeight: '80vh'}}
    >
      <h1 style={{ marginTop: "5px" }}>قائمة مهامي</h1>
      <ToggleButtonGroup
        style={{ marginBottom: "30px", direction: "ltr" }}
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          style={{ width: "100px" }}
          value="left"
          aria-label="left aligned"
        >
          <Typography>غير منجز</Typography>
        </ToggleButton>
        <ToggleButton
          style={{ width: "100px" }}
          value="center"
          aria-label="centered"
        >
          <Typography>منجز</Typography>
        </ToggleButton>
        <ToggleButton
          style={{ width: "100px" }}
          value="right"
          aria-label="right aligned"
        >
          <Typography>الكل</Typography>
        </ToggleButton>
      </ToggleButtonGroup>

      {TasksList}

      <Grid container spacing={2}>
        <Grid xs={8}>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="عنوان المهمة"
            variant="outlined"
            value={titleInput}
            onChange={handleNewTask}
          />
        </Grid>
        <Grid xs={4}>
          <Button
            onClick={handleAddClick}
            variant="contained"
            sx={{ width: "100%", height: "100%" }}
            disabled={titleInput === ''? true : false}
          >
            اضافة
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
