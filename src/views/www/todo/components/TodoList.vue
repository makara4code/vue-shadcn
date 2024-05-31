<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
import type { Todo } from "@/types/todo";

interface Props {
  title: string;
  todos: Todo[];
  handleOnRemove: (id: number) => void;
}

withDefaults(defineProps<Props>(), {
  todos: undefined,
});
</script>

<template>
  <h2 class="font-semibold text-black dark:text-white">{{ title }}</h2>
  <TransitionGroup name="list" tag="div" class="flex flex-col gap-2">
    <TodoItem v-for="todo in todos" :todo="todo" :key="todo.id" @remove="handleOnRemove(todo.id)"/>
  </TransitionGroup>
</template>
