import { computed, ref, unref } from "vue";
import { set, useStorage } from "@vueuse/core";

import { useDialog } from "@/composable/dialog";
import { useToast } from "@/components/ui/toast/use-toast";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export function useTodo() {
  const { toast } = useToast();
  const { closeDialog } = useDialog();

  const localStorageTodos = useStorage<Todo[]>("todos", []);

  const isDialogOpen = ref(false);
  const todos = ref<Todo[]>(localStorageTodos.value);
  const newTodo = ref("");

  const getActiveTodo = computed(() => todos.value.filter((todo) => !todo.completed));
  const getCompletedTodos = computed(() =>
    todos.value.filter((todo) => todo.completed),
  );


  const handleOnAddNewTodo = () => {
    if (!unref(newTodo)) return;

    todos.value.push({
      id: todos.value.length + 1,
      title: newTodo.value,
      completed: false,
    });

    localStorageTodos.value = todos.value;

    set(newTodo, "");
    closeDialog();

    toast({
      title: "Success",
      description: "Todo added successfully",
    });
  };

  const handleOnRemoveTodo = (id: number) => {
    set(
      todos,
      todos.value.filter((todo) => todo.id !== id),
    );
    localStorageTodos.value = todos.value;
  };

  const handleOnToggleTodo = (id: number) => {
    set(
      todos,
      todos.value.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    );
  
    set(localStorageTodos, todos.value);
  };

  const onCancelTodo = () => {
    set(newTodo, "");
    closeDialog();
  }

  return {
    todos,
    getActiveTodo,
    getCompletedTodos,
    isDialogOpen,
    newTodo,
    onCancelTodo,
    handleOnAddNewTodo,
    handleOnRemoveTodo,
    handleOnToggleTodo,
  };
}
