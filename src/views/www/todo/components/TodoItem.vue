<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
}
withDefaults(defineProps<Props>(), {});
</script>

<template>
  <Card class="flex items-center justify-between gap-2 p-4" :key="todo.id">
    <div class="flex items-center gap-2">
      <input
        class="w-5 h-5"
        type="checkbox"
        v-model="todo.completed"
        :value="todo.completed"
        :checked="todo.completed"
      />
      <span>{{ todo.title }}</span>
    </div>

    <Button @click="$emit('remove')">Remove</Button>
  </Card>
</template>
