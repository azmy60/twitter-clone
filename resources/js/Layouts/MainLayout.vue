<script setup lang="ts">
import AppNav from "@/components/ui/AppNav.vue";
import { modalComponent } from "@/inertia";
</script>

<template>
    <div class="flex">
        <AppNav />
        <main class="min-w-0 grow">
            <slot />
        </main>
    </div>
    <component v-if="modalComponent" :is="modalComponent" />
</template>
