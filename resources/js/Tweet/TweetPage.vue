<script setup lang="ts">
import { Head, Link } from "@inertiajs/inertia-vue3";
import MainLayout from "@/Layouts/MainLayout.vue";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
import AppTime from "@/components/ui/AppTime.vue";
import TopBar from "@/components/ui/TopBar.vue";
import TweetDropdown from "./TweetDropdown.vue";

const props = defineProps<{
    tweet: Tweet;
}>();

const title = `${props.tweet.user.name} on Twitter: "${props.tweet.text}" / Twitter`;
</script>

<template>
    <Head :title="title" />
    <MainLayout>
        <TopBar :linkToGoBack="route('tweets.index')">
            <template #title>Tweet</template>
        </TopBar>
        <div class="flex flex-col gap-4 mt-3 px-5">
            <div class="flex gap-3">
                <Link :href="`/${tweet.user.username}`">
                    <AppProfilePicture
                        :src="tweet.user.profile_photo_url"
                        class="w-12 h-12"
                    />
                </Link>
                <div class="grow text-sm">
                    <div class="w-full flex justify-between text-neutral-400">
                        <div class="flex flex-col">
                            <Link
                                :href="`/${tweet.user.username}`"
                                class="overflow-hidden whitespace-nowrap text-ellipsis font-bold hover:underline text-neutral-200"
                            >
                                {{ tweet.user.name }}
                            </Link>
                            <Link
                                :href="`/${tweet.user.username}`"
                                class="min-w-[3rem] overflow-hidden whitespace-nowrap text-ellipsis"
                            >
                                @{{ tweet.user.username }}
                            </Link>
                        </div>
                        <TweetDropdown :tweet="tweet" />
                    </div>
                </div>
            </div>
            <p class="text-xl text-neutral-200">{{ tweet.text }}</p>
            <AppTime
                long
                :datetime="tweet.created_at"
                class="text-sm text-neutral-400"
            />
        </div>
    </MainLayout>
</template>
