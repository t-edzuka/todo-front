import {TodoCreate} from "../types/todo"
import {FC, useState} from "react"
import {Box, Button, Grid, Paper, TextField} from "@mui/material"

type Props = {
  onSubmit: (todoCreate: TodoCreate) => void
}

const TodoForm: FC<Props> = ({onSubmit}) => {
  const [editText, setEditText] = useState("")
  const addTodoHandler: () => Promise<void> = async () => {
    if (!editText) return
    onSubmit({text: editText})
    setEditText("")
  }

  return (
    <Paper elevation={2}>
      <Box sx={{p: 2}}>
        <Grid container={true} rowSpacing={5} columnSpacing={5}>
          <Grid item xs={12}>
            <TextField
              label="new todo text"
              variant="filled"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              fullWidth={true}
            ></TextField>
          </Grid>
          <Grid item xs={9}/>
          <Grid item xs={3}>
            <Button
              onClick={(_) => addTodoHandler()}
              fullWidth={true}
            >Add Todo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default TodoForm