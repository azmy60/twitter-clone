<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";

const TAGS = {
    button: "button",
    submit: "button",
    link: Link,
};

defineProps<{
    size: "md" | "lg" | "sm";
    type: keyof typeof TAGS;
    href?: string;
}>();
</script>

<template>
    <component
        :is="TAGS[type]"
        :href="href"
        :type="type !== 'link' && type"
        :class="{
            'text-[13px] py-1.5': size === 'sm',
            'text-sm py-2.5': size === 'md',
            'text-md py-3': size === 'lg',
        }"
        class="flex justify-center px-4 rounded-full font-bold disabled:bg-neutral-400"
    >
        <slot />
    </component>
</template>
