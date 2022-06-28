<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";

defineProps<{
    href: string;
}>();
</script>

<template>
    <Link :href="href" class="group relative w-12 lg:w-auto lg:pl-3 lg:pr-6">
        <div
            class="-z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto absolute rounded-full w-full h-12 group-hover:bg-neutral-900"
        ></div>
        <div class="flex gap-3 justify-center items-center">
            <slot />
            <div class="hidden text-xl lg:block">
                <slot name="text" />
            </div>
        </div>
    </Link>
</template>
