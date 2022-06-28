<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";
import AppModal from "@/components/ui/AppModal.vue";

defineEmits<{
    (e: "delete"): void;
    (e: "cancel"): void;
}>();
</script>

<template>
    <AppModal>
        <div class="flex flex-col rounded-2xl w-80 p-7 bg-black">
            <h2 class="text-xl font-bold">Delete Tweet?</h2>
            <p class="mt-1.5 text-sm text-neutral-400">
                This can’t be undone and it will be removed from your profile,
                the timeline of any accounts that follow you, and from Twitter
                search results.
            </p>
            <AppButton
                @click="$emit('delete')"
                type="button"
                size="md"
                variant="solid-danger"
                class="mt-6"
                data-testid="modal-delete-btn"
            >
                Delete
            </AppButton>
            <AppButton
                @click="$emit('cancel')"
                type="button"
                size="md"
                variant="outline-secondary"
                class="mt-3"
            >
                Cancel
            </AppButton>
        </div>
    </AppModal>
</template>
