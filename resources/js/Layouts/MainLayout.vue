<script setup lang="ts">
import AppNav from "@/components/ui/AppNav.vue";
import { modalComponent } from "@/inertia";
</script>

<template>
    <div
        class="flex max-w-2xl mx-auto divide-x divide-neutral-800 lg:max-w-4xl"
    >
        <AppNav />
        <main class="min-w-0 grow border-r">
            <slot />
        </main>
        <div></div>
    </div>
    <component v-if="modalComponent" :is="modalComponent" />
</template>
