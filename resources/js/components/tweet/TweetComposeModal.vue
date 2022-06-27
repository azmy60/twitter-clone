<script setup lang="ts">
import AppTweetComposer from "@/components/ui/AppTweetComposer.vue";
import { ArrowLeftIcon } from "@heroicons/vue/outline";
import { onMounted, onUnmounted, ref } from "vue";
import { goBack } from "@/helpers";

const mounted = ref(false);

let bodyOverflow = "";

onMounted(() => {
    mounted.value = true;
    bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    mounted.value = false;
    document.body.style.overflow = bodyOverflow;
});
</script>

<template>
    <Teleport to="body">
        <div
            class="absolute inset-0 bg-black z-10"
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
    </Teleport>
</template>
