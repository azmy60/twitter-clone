<script setup lang="ts">
withDefaults(defineProps<{ src?: string }>(), { src: "" });
</script>

<template>
    <img :src="src" class="bg-neutral-400 rounded-full" />
</template>
