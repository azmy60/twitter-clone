<script setup lang="ts">
import { Head } from "@inertiajs/inertia-vue3";
import MainLayout from "@/Layouts/MainLayout.vue";
import AppTimeline from "@/components/ui/AppTimeline.vue";

defineProps<{
    tweets: Tweet[];
}>();
</script>

<template>
    <Head title="Home / Twitter" />
    <MainLayout>
        <AppTimeline :tweets="tweets" />
    </MainLayout>
</template>
