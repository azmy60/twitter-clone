<script setup lang="ts">
import AppNav from "@/components/ui/AppNav.vue";
</script>

<template>
    <div class="flex">
        <AppNav />
        <main>
            <slot />
        </main>
    </div>
</template>
