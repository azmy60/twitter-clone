<script setup lang="ts">
import { ref } from "vue";

const el = ref<HTMLInputElement | null>(null);

const props = defineProps<{
    modelValue: string;
    error?: boolean;
    debounce?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

let debounceTimeout: NodeJS.Timeout | null = null;

function updateValue() {
    if (!props.debounce) {
        return emitUpdateModelValue();
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(emitUpdateModelValue, 500);
}

function emitUpdateModelValue() {
    emit("update:modelValue", (el.value as HTMLInputElement).value);
}
</script>

<template>
    <input
        :value="modelValue"
        @input="updateValue"
        class="w-full bg-transparent border rounded py-4 pl-2 placeholder:text-neutral-500 disabled:bg-neutral-900 disabled:border-transparent disabled:text-neutral-600"
        :class="{
            'border-neutral-700': !error,
            'border-red-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-red-600':
                error,
        }"
        ref="el"
    />
</template>
