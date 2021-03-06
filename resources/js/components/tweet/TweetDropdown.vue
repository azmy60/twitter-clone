<script setup lang="ts">
import { DotsHorizontalIcon } from "@heroicons/vue/solid";
import { TrashIcon } from "@heroicons/vue/outline";
import { ref } from "vue";
import { Inertia } from "@inertiajs/inertia";
import TweetDeleteModal from "./TweetDeleteModal.vue";

const prop = defineProps<{
    tweet: Tweet;
}>();

const isOpened = ref(false);
const isDeleteModalOpened = ref(false);

function confirmDelete() {
    Inertia.delete(route("tweets.destroy", prop.tweet.id));
}

function showDeleteModal() {
    isDeleteModalOpened.value = true;
    isOpened.value = false;
}
</script>

<template>
    <div class="relative ml-auto">
        <button
            @click.stop="isOpened = !isOpened"
            class="group relative grid place-content-center"
            data-testid="menu-btn"
        >
            <div
                class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto absolute rounded-full w-9 h-9 group-hover:bg-slate-900"
            ></div>
            <DotsHorizontalIcon class="z-10 w-4 h-4 group-hover:text-sky-500" />
        </button>
        <div
            class="z-20 top-0 right-0 absolute bg-black rounded-md ring-white shadow-[0_0_18px] shadow-neutral-500"
            v-show="isOpened"
        >
            <button
                v-if="tweet.can_be_deleted"
                @click.stop="showDeleteModal"
                class="flex p-4 gap-3 hover:bg-neutral-900"
                data-testid="menu-delete-btn"
            >
                <TrashIcon class="w-5 h-5 text-red-700" />
                <span class="text-red-600">Delete</span>
            </button>
        </div>
    </div>
    <div
        class="absolute inset-0 z-[19] cursor-default"
        v-show="isOpened"
        @click.stop="isOpened = false"
    ></div>
    <Teleport to="body">
        <TweetDeleteModal
            v-if="isDeleteModalOpened"
            @cancel="isDeleteModalOpened = false"
            @delete="confirmDelete"
        />
    </Teleport>
</template>
