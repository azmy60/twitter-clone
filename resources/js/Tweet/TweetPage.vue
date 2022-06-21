<script setup lang="ts">
import { Head, Link } from "@inertiajs/inertia-vue3";
import { ChatAltIcon } from "@heroicons/vue/outline";
import MainLayout from "@/Layouts/MainLayout.vue";
import LinkedProfilePicture from "@/components/ui/LinkedProfilePicture.vue";
import AppTime from "@/components/ui/AppTime.vue";
import AppTweet from "@/components/ui/AppTweet.vue";
import TopBar from "@/components/ui/TopBar.vue";
import TweetDropdown from "./TweetDropdown.vue";
import TweetReplyComposer from "./TweetReplyComposer.vue";
import AppHorizontalSeparator from "@/components/ui/AppHorizontalSeparator.vue";
import { user } from "@/inertia";

const props = defineProps<{
    tweet: Tweet;
}>();

const title = `${props.tweet.user.name} on Twitter: "${props.tweet.text}" / Twitter`;
</script>

<template>
    <Head :title="title" />
    <MainLayout>
        <TopBar>
            <template #title>Tweet</template>
        </TopBar>
        <div class="flex flex-col gap-4 mt-3 px-5">
            <div class="flex gap-3">
                <LinkedProfilePicture :user="tweet.user" />
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
            <p class="text-xl text-neutral-200 overflow-hidden break-words">
                {{ tweet.text }}
            </p>
            <AppTime
                long
                :datetime="tweet.created_at"
                class="text-sm text-neutral-400"
            />
            <div>
                <AppHorizontalSeparator />
                <div class="flex justify-center text-neutral-500 py-3 px-8">
                    <button class="group relative grid place-content-center">
                        <div
                            class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto absolute rounded-full w-9 h-9 group-hover:bg-slate-900"
                        ></div>
                        <ChatAltIcon
                            class="z-10 w-7 h-7 stroke-1 group-hover:text-sky-500"
                        />
                    </button>
                </div>
                <AppHorizontalSeparator />
            </div>
            <TweetReplyComposer
                class="pb-4"
                v-if="user"
                :author="user"
                :tweet="tweet"
            />
        </div>
        <AppHorizontalSeparator />
        <template v-for="reply in tweet.replies">
            <Link
                :href="
                    route('tweets.show', {
                        user: reply.user.username,
                        tweet: reply.id,
                    })
                "
            >
                <AppTweet :tweet="reply" />
            </Link>
            <AppHorizontalSeparator />
        </template>
        <div class="py-12"></div>
    </MainLayout>
</template>
