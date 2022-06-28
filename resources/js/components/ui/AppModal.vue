<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

let bodyOverflow = "";

onMounted(() => {
    bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    document.body.style.overflow = bodyOverflow;
});
</script>

<template>
    <Teleport to="body">
        <div
            class="absolute inset-0 grid place-content-center bg-slate-600 bg-opacity-50 z-50"
        >
            <slot />
        </div>
    </Teleport>
</template>
