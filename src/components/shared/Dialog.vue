<script setup lang="ts">
import { useDialog } from "@/composable/dialog";
import { Dialog } from "@/components/ui/dialog";

const { isOpen } = useDialog();
</script>

<template>
  <Dialog v-model:open="isOpen">
    <slot />
  </Dialog>
</template>
