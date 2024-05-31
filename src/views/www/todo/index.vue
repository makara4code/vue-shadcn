<script setup lang="ts">
import Dialog from "@/components/shared/Dialog.vue";
import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
import TodoList from "./components/TodoList.vue";
import { useTodo } from "./useTodo";

const {
  handleOnAddNewTodo,
  newTodo,
  getActiveTodo,
  getCompletedTodos,
  onCancelTodo,
  handleOnRemoveTodo,
} = useTodo();

</script>

<template>
  <div class="mt-6">
    <div className="flex justify-end">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">New Todo</Button>
        </DialogTrigger>

        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Todo</DialogTitle>
          </DialogHeader>
          <DialogDescription> Add a new todo to your list. </DialogDescription>
          <div class="flex flex-col">
            <Input
              id="name"
              class="col-span-3"
              v-model="newTodo"
              @keydown.enter="handleOnAddNewTodo"
            />
          </div>
          <DialogFooter class="flex flex-col gap-2">
            <Button variant="outline" @click="onCancelTodo"> Cancel </Button>
            <Button type="submit" @click="handleOnAddNewTodo"> Save </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    <div
      className="flex w-full justify-center mt-[4vh] bg-gray-200 dark:bg-gray-200/10 rounded-xl p-4"
    >
      <div class="flex items-stretch w-full space-x-1">
        <div class="w-1/2 p-4">
          <TodoList
            title="Todo"
            :todos="getActiveTodo"
            :handle-on-remove="handleOnRemoveTodo"
          />
        </div>
        <div class="w-1/2 p-4">
          <TodoList
            title="Completed"
            :todos="getCompletedTodos"
            :handle-on-remove="handleOnRemoveTodo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
