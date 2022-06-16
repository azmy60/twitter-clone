<script setup lang="ts">
import AppNav from "@/components/ui/AppNav.vue";
</script>

<template>
    <div class="flex">
        <AppNav />
        <main class="min-w-0 grow">
            <slot />
        </main>
    </div>
</template>
