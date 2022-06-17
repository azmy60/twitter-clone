<script setup lang="ts">
import { Head } from "@inertiajs/inertia-vue3";
import MainLayout from "@/Layouts/MainLayout.vue";
import AppTimeline from "@/components/ui/AppTimeline.vue";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
import AppHorizontalSeparator from "@/components/ui/AppHorizontalSeparator.vue";
import TopBar from "@/components/ui/TopBar.vue";

defineProps<{
    user: User;
    tweets: Tweet[];
}>();
</script>

<template>
    <Head title="Name (@username) / Twitter" />
    <MainLayout>
        <TopBar :linkToGoBack="route('tweets.index')">
            <template #title>{{ user.name }}</template>
            <template #subtitle>{{ tweets.length }} Tweets</template>
        </TopBar>
        <div class="relative mb-14">
            <div class="w-full h-32 bg-neutral-800">
                <!-- banner -->
            </div>
            <AppProfilePicture
                :src="user.profile_photo_url"
                class="absolute left-3 -bottom-10 border-2 border-black w-20 h-20 rounded-full bg-neutral-400"
            />
        </div>
        <div class="px-4">
            <h2 class="text-xl font-bold">{{ user.name }}</h2>
            <h3 class="text-sm text-neutral-500">@{{ user.username }}</h3>
        </div>
        <AppHorizontalSeparator class="mt-4" />
        <AppTimeline :tweets="tweets" />
    </MainLayout>
</template>
