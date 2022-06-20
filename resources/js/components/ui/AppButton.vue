<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";

const TAGS = {
    button: "button",
    submit: "button",
    link: Link,
};

defineProps<{
    size: "md" | "lg" | "sm";
    variant:
        | "solid-primary"
        | "solid-secondary"
        | "solid-danger"
        | "outline-primary"
        | "outline-secondary";
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
            'bg-sky-500 text-white disabled:text-slate-400 disabled:bg-sky-800':
                variant === 'solid-primary',
            'bg-neutral-100 text-neutral-900 disabled:bg-neutral-400':
                variant === 'solid-secondary',
            'bg-red-600 text-white': variant === 'solid-danger',
            'bg-transparent text-sky-400 border border-slate-600':
                variant === 'outline-primary',
            'bg-transparent text-white border border-slate-500':
                variant === 'outline-secondary',
        }"
        class="flex justify-center px-4 rounded-full font-bold h-min"
    >
        <slot />
    </component>
</template>
