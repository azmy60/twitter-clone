<script setup lang="ts">
import { Head } from "@inertiajs/inertia-vue3";
import MainLayout from "@/Layouts/MainLayout.vue";
import AppTimeline from "@/components/ui/AppTimeline.vue";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
import AppHorizontalSeparator from "@/components/ui/AppHorizontalSeparator.vue";
import TopBar from "@/components/ui/TopBar.vue";

defineProps<{
    user_profile: User;
    tweets: Tweet[];
}>();
</script>

<template>
    <Head
        :title="`${user_profile.name} (@${user_profile.username}) / Twitter`"
    />
    <MainLayout>
        <TopBar>
            <template #title>{{ user_profile.name }}</template>
            <template #subtitle>{{ tweets.length }} Tweets</template>
        </TopBar>
        <div class="relative mb-14">
            <div class="w-full h-32 bg-neutral-800">
                <!-- banner -->
            </div>
            <AppProfilePicture
                :src="user_profile.profile_photo_url"
                class="absolute left-3 -bottom-10 border-2 border-black w-20 h-20 rounded-full bg-neutral-400"
            />
        </div>
        <div class="px-4">
            <h2 class="text-xl font-bold">{{ user_profile.name }}</h2>
            <h3 class="text-sm text-neutral-500">
                @{{ user_profile.username }}
            </h3>
        </div>
        <AppHorizontalSeparator class="mt-4" />
        <AppTimeline :tweets="tweets" />
    </MainLayout>
</template>
