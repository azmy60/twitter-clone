<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/solid";

function goBack() {
    window.history.back();
}
</script>

<template>
    <div class="flex items-center pl-2.5 pr-4 h-14">
        <button class="p-2.5 rounded-full hover:bg-neutral-900" @click="goBack">
            <ArrowLeftIcon class="w-4 h-4" />
        </button>
        <div class="ml-8">
            <div class="text-lg font-bold">
                <slot name="title" />
            </div>
            <div class="text-sm text-neutral-500">
                <slot name="subtitle" />
            </div>
        </div>
    </div>
</template>
