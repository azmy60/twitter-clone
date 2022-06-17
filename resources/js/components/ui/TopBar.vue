<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";
import { ArrowLeftIcon } from "@heroicons/vue/solid";

defineProps<{
    linkToGoBack: string;
}>();
</script>

<template>
    <div class="flex items-center pl-2.5 pr-4 h-14">
        <Link
            :href="linkToGoBack"
            class="p-2.5 rounded-full hover:bg-neutral-900"
        >
            <ArrowLeftIcon class="w-4 h-4" />
        </Link>
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
