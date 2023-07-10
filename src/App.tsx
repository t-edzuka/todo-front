import {FC, useEffect, useState} from 'react'
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {Todo, TodoCreate} from "./types/todo"
import {Box, Stack, Typography} from "@mui/material"
import TodoForm from "./components/TodoForm.tsx"
import TodoList from "./components/TodoList.tsx"
import {createTodoItemFn, deleteTodoItemFn, getTodoItemsFn, updateTodoItemFn} from "./lib/api/todo.ts"


type TodoAppProps = {
  url: string
}
const TodoApp: FC<TodoAppProps> = ({url}) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const getTodos = getTodoItemsFn(url)
  const createTodo = createTodoItemFn(url)
  const updateTodo = updateTodoItemFn(url)
  const deleteTodo = deleteTodoItemFn(url)
  const onSubmit = async (todoCreate: TodoCreate): Promise<void> => {
    if (!todoCreate.text) return
    await createTodo(todoCreate)
    const todos = await getTodos()
    setTodos(todos)
  }
  const onUpdate = async (todo: Todo): Promise<void> => {
    const {id, text, completed} = todo
    await updateTodo({
      id,
      text,
      completed,
    })
    const todos = await getTodos()
    setTodos(todos)
  }

  const onDelete = async (id: number): Promise<void> => {
    await deleteTodo(id)
    const todos = await getTodos()
    setTodos(todos)
  }

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      const todos = await getTodos()
      setTodos(todos)
    }
    fetchTodos()
  }, [])
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid gray",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          p: 2,
          width: "100%",
          height: 80,
          zIndex: 3,

        }}
      >
        <Typography variant="h1">Todo App</Typography>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        p: 5,
        mt: 10,
      }}>
        <Box maxWidth={700} width={"100%"}>
          <Stack spacing={5}>
            <TodoForm onSubmit={onSubmit}/>
            <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete}></TodoList>
          </Stack>
        </Box>
      </Box>

    </>
  )
}

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 30,

    },
    h2: {
      fontSize: 20,
    },
  },
})
const App: FC = () => {
  const url = "http://localhost:8078/todos"
  return (
    <ThemeProvider theme={theme}>
      <TodoApp url={url}/>
    </ThemeProvider>
  )
}
export default App