<script setup lang="ts">
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, VisuallyHidden } from 'radix-vue'
import { ref, watch } from "vue";
import { SearchIcon } from "lucide-vue-next";
import { type NavItem, navConfig } from "@/config/globalSearch";
import { useMagicKeys, useToggle, useDark } from "@vueuse/core";

import Logo from "@/components/Logo.vue";
// @ts-ignore
import File from "~icons/radix-icons/file";
// @ts-ignore
import RadixIconsMoon from "~icons/radix-icons/moon";
// @ts-ignore
import RadixIconsSun from "~icons/radix-icons/sun";
import router from "@/router";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const isOpen = ref(false);

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
    }
  },
});

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1]) {
    isOpen.value = true;
  }
});

function handleSelectLink(item: NavItem) {
  if (item.external) {
    // @ts-ignore
    window.open(item.href, "_blank");
  } else if (item.href) {
    router.push(item.href);
  }

  isOpen.value = false;
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <header
      class="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg border-border">
      <div class="container flex items-center justify-between h-14">
        <MobileNav />

        <div class="hidden mr-4 md:flex">
          <Logo />

          <nav class="flex items-center space-x-6 text-sm font-medium">
            <a
              v-for="route in navConfig.mainNav"
              :key="route.title"
              :href="route.href"
              :target="route.external ? '_target' : undefined"
              class="transition-colors hover:text-foreground/80 text-foreground/60"
              :class="{
                'font-semibold !text-foreground':
                  $route.path === `${route.href}.html`,
              }">
              {{ route.title }}
            </a>
          </nav>
        </div>

        <div class="flex items-center justify-end space-x-4">
          <Button
            variant="outline"
            class="hidden h-8 px-3 w-72 lg:flex lg:justify-between lg:items-center"
            @click="isOpen = true">
            <div class="flex items-center">
              <SearchIcon class="w-4 h-4 mr-2 text-muted-foreground" />
              <span class="text-muted-foreground">
                Search for anything...
              </span>
            </div>
            <div class="flex items-center gap-x-1">
              <Kbd> <span>⌘</span>K </Kbd>
            </div>
          </Button>

          <div class="flex items-center gap-x-1">
            <Button
              class="flex items-center justify-center"
              aria-label="Toggle dark mode"
              :variant="'ghost'"
              :size="'icon'"
              @click="toggleDark()">
              <component
                :is="isDark ? RadixIconsSun : RadixIconsMoon"
                class="w-[20px] h-[20px] text-foreground" />
            </Button>
          </div>
        </div> 
      </div>
    </header>

    <div class="flex-1 bg-background">
      <main class="container">
        <RouterView />
      </main>
    </div>

    <footer class="py-6 md:px-8 md:py-0">
      <div
        class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div
          class="text-sm leading-loose text-center text-muted-foreground md:text-left">
          <span class="inline-block">
            Built and designed by
            <a
              href="https://twitter.com/shadcn"
              target="_blank"
              class="font-bold underline underline-offset-4 decoration-foreground">
              shadcn
            </a>
          </span>
          <span class="ml-0.5"> . </span>
          <span class="inline-block ml-2">
            Ported to Vue by
            <a
              href="https://github.com/radix-vue"
              target="_blank"
              class="font-bold underline underline-offset-4 decoration-foreground">
              Radix Vue
            </a>
          </span>
          <span class="ml-0.5"> . </span>
          <span class="inline-block ml-2">
            The code source is available on
            <a
              href="https://github.com/radix-vue/shadcn-vue"
              target="_blank"
              class="font-bold underline underline-offset-4 decoration-foreground">
              GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>

    <Dialog v-model:open="isOpen">
      <DialogContent class="p-0">
        <VisuallyHidden>
          <DialogDescription />
          <DialogTitle />
        </VisuallyHidden>
        <Command>
          <CommandInput placeholder="Type a command or a search..." />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandList @escape-key-down="isOpen = false">
            <CommandGroup heading="Links">
              <CommandItem
                v-for="item in navConfig.mainNav"
                :key="item.title"
                :heading="item.title"
                :value="item.title"
                class="py-3"
                @select="handleSelectLink(item)">
                <File class="w-5 h-5 mr-2" />
                <span>{{ item.title }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  </div>
</template>
