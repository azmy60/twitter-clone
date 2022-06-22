<script setup lang="ts">
import { Head } from "@inertiajs/inertia-vue3";
import MainLayout from "@/Layouts/MainLayout.vue";
import AppTimeline from "@/components/ui/AppTimeline.vue";
import AppTweetComposer from "@/components/ui/AppTweetComposer.vue";
import AppHorizontalSeparator from "@/components/ui/AppHorizontalSeparator.vue";

defineProps<{
    tweets: Tweet[];
}>();
</script>

<template>
    <Head title="Home / Twitter" />
    <MainLayout>
        <div class="px-4 pt-4 pb-2">
            <h2 class="text-xl font-bold">Home</h2>
        </div>
        <AppTweetComposer />
        <AppHorizontalSeparator />
        <AppTimeline :tweets="tweets" />
    </MainLayout>
</template>
