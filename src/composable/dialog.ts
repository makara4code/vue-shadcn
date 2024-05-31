import { ref } from "vue";

const isOpen = ref(false);

export const useDialog = () => {

  const  closeDialog = ()  => {
    isOpen.value = false;
  }

  return {
    isOpen,
    closeDialog,
  };
};
