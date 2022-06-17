<script setup lang="ts">
import { ref } from "vue";

defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const editableEl = ref<HTMLElement | null>(null);

function onPaste(event: ClipboardEvent) {
    const paste = event.clipboardData!.getData("text/plain");

    const selection = window.getSelection()!;
    if (!selection.rangeCount) return false;

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    selection.collapseToEnd();

    emit("update:modelValue", editableEl.value!.innerText);

    event.preventDefault();
}

function reset() {
    editableEl.value!.innerText = "";
}

defineExpose({
    reset,
});
</script>

<template>
    <span
        name="tweet"
        role="textbox"
        @input="$emit('update:modelValue', $el.innerText)"
        @paste="onPaste"
        ref="editableEl"
        contenteditable
        class="block min-h-[1.75rem] text-xl cursor-text focus:outline-none before:text-zinc-500 overflow-hidden break-words"
    ></span>
</template>
