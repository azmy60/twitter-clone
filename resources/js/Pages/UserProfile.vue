<script setup lang="ts">
import { Head, Link } from "@inertiajs/inertia-vue3";
import { ArrowLeftIcon } from "@heroicons/vue/solid";
import MainLayout from "@/Layouts/MainLayout.vue";
import AppTimeline from "@/components/ui/AppTimeline.vue";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
import AppHorizontalSeparator from "@/components/ui/AppHorizontalSeparator.vue";

defineProps<{
    user: User;
    tweets: Tweet[];
}>();
</script>

<template>
    <Head title="Name (@username) / Twitter" />
    <MainLayout>
        <div class="flex items-center pl-2.5 pr-4 py-0.5">
            <Link
                :href="route('home')"
                class="p-2.5 rounded-full hover:bg-neutral-900"
            >
                <ArrowLeftIcon class="w-4 h-4" />
            </Link>
            <div class="ml-7">
                <div class="text-lg font-bold">{{ user.name }}</div>
                <div class="text-sm text-neutral-500">
                    {{ tweets.length }} Tweets
                </div>
            </div>
        </div>
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
