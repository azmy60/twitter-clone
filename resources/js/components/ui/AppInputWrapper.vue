<script setup lang="ts">
defineProps<{
    error?: string;
}>();
</script>

<template>
    <div>
        <slot />
        <p v-if="error" class="ml-2 text-sm text-red-600">{{ error }}</p>
    </div>
</template>
