<script setup lang="ts">
import AppTweetComposer from "@/components/ui/AppTweetComposer.vue";
import { ArrowLeftIcon } from "@heroicons/vue/outline";
import { Link } from "@inertiajs/inertia-vue3";
import { onMounted, onUnmounted, ref } from "vue";

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
        <div class="absolute inset-0 bg-black z-10">
            <div class="flex justify-between px-4 pt-2" id="compose-modal-top">
                <Link
                    :href="route('tweets.index')"
                    class="p-2 hover:bg-neutral-900 w-min rounded-full"
                >
                    <ArrowLeftIcon class="w-4 h-4" />
                </Link>
            </div>

            <AppTweetComposer
                v-if="mounted"
                teleportTweetTo="#compose-modal-top"
            />
        </div>
    </Teleport>
</template>
