<script setup lang="ts">
defineProps<{
    modelValue: string;
}>();

defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="bg-transparent border-neutral-700 rounded py-4 pl-2 placeholder:text-neutral-500 disabled:bg-neutral-900 disabled:border-transparent disabled:text-neutral-600"
    />
</template>
