<script setup lang="ts">
import AppTweetComposer from "@/components/ui/AppTweetComposer.vue";
import AppModal from "@/components/ui/AppModal.vue";
import { ArrowLeftIcon } from "@heroicons/vue/outline";
import { onMounted, onUnmounted, ref } from "vue";
import { goBack } from "@/helpers";

const mounted = ref(false);
onMounted(() => (mounted.value = true));
onUnmounted(() => (mounted.value = false));
</script>

<template>
    <AppModal>
        <div
            class="relative w-screen h-screen bg-black md:rounded-2xl md:max-w-xl md:h-auto"
            data-testid="tweet-compose-modal"
        >
            <div
                class="flex justify-between px-4 pt-2"
                id="compose-modal-top"
                data-testid="tweet-compose-modal-top-bar"
            >
                <button
                    @click="goBack"
                    class="p-2 hover:bg-neutral-900 w-min rounded-full"
                >
                    <ArrowLeftIcon class="w-4 h-4" />
                </button>
            </div>

            <AppTweetComposer
                v-if="mounted"
                teleportTweetTo="#compose-modal-top"
            />
        </div>
    </AppModal>
</template>
