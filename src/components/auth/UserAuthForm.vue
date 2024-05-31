<script setup lang="ts">
import { ref } from "vue";
import { Label } from "@/components/ui/label";

const isLoading = ref();

async function onSubmit(event: any) {
  event.preventDefault();

  isLoading.value = true;
}
</script>

<template>
  <div class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
      </div>
    </form>
  </div>
</template>
