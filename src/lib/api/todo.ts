import {Todo, TodoCreate} from "../../types/todo"

export const createTodoItemFn = (url: string) => {
  return async (todoCreate: TodoCreate): Promise<Todo> => {
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(todoCreate)
    })
    if (!res.ok) {
      throw new Error("API Error: failed to create todo item")
    }
    return await res.json()
  }
}

export const getTodoItemsFn = (url: string) => {
  return async (): Promise<Todo[]> => {
    const res = await fetch(url,
      {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      })
    if (!res.ok) {
      throw new Error("API Error: failed to fetch todo items")
    }
    return await res.json()
  }
}

export const updateTodoItemFn = (url: string) => {
  return async (todo: Todo): Promise<Todo> => {
    const res = await fetch(`${url}/${todo.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(todo)
    })
    if (!res.ok) {
      throw new Error("API Error: failed to update todo item")
    }
    return await res.json()
  }
}

export const deleteTodoItemFn = (url: string) => {
  return async (id: number): Promise<void> => {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) {
      throw new Error("API Error: failed to delete todo item")
    }
  }
}