<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";

defineProps<{
    href: string;
}>();
</script>

<template>
    <Link :href="href" class="text-sky-400 hover:underline">
        <slot />
    </Link>
</template>
