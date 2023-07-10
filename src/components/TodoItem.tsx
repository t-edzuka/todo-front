import {ChangeEvent, ChangeEventHandler, FC, useEffect, useState} from "react"
import type {Todo} from "../types/todo"
import {Box, Button, Card, Checkbox, Grid, Modal, Stack, TextField, Typography} from "@mui/material"
import {modalInnerStyle} from "../styles/modal.ts"

type Props = {
  todo: Todo,
  onUpdate: (todo: Todo) => void
  onDelete: (id: number) => void
}

export const TodoItem: FC<Props> = ({todo, onUpdate, onDelete}) => {
  const [editEnabled, makeEditable] = useState<boolean>(false)
  const [textChanged, takeInChangedText] = useState<string>("")
  const toggleCompleted: ChangeEventHandler = () => {
    onUpdate({...todo, completed: !todo.completed})
  }
  const deleteTodo = () => {
    onDelete(todo.id)
  }
  const onCloseEditModal = () => {
    onUpdate({...todo, text: textChanged})
    makeEditable(false)
  }

  useEffect(() => {
    takeInChangedText(todo.text)
  }, [todo])

  return (
    <Card sx={{p: 1}}>
      <Grid container spacing={2} alignItems="center">
        <Grid item={true} xs={1}>
          <Checkbox
            checked={todo.completed}
            onChange={toggleCompleted}
          />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={1}>
            <Typography variant={"caption"} fontSize={6}>
              {todo.text}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack direction={"row"} spacing={1}> <Button onClick={() => makeEditable(true)} color={"primary"}>
            Edit
          </Button>
            <Button onClick={deleteTodo} color={"error"}>
              Delete
            </Button></Stack>
        </Grid>
      </Grid>
      <Modal open={editEnabled} onClose={onCloseEditModal}>
        <Box sx={modalInnerStyle}>
          <Stack spacing={2}>
            <TextField
              size={"small"}
              label={"edit todo text"}
              defaultValue={todo.text}
              onChange={(e: ChangeEvent<HTMLInputElement>) => takeInChangedText(e.target.value)}
            />
          </Stack>
        </Box>
      </Modal>
    </Card>
  )
}