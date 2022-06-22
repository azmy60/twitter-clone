<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";
import LinkedProfilePicture from "@/components/ui/LinkedProfilePicture.vue";
import AppTime from "@/components/ui/AppTime.vue";
import TweetDropdown from "./TweetDropdown.vue";
import TweetLayout from "@/Layouts/TweetLayout.vue";
import { Inertia } from "@inertiajs/inertia";

defineProps<{
    tweet: Tweet;
}>();

function onClickTweet(tweet: Tweet) {
    Inertia.get(
        route("tweets.show", {
            user: tweet.user.username,
            tweet: tweet.id,
        })
    );
}
</script>

<template>
    <TweetLayout
        tabindex="0"
        @keydown.enter="onClickTweet(tweet)"
        @click="onClickTweet(tweet)"
        class="hover:bg-[#0a0a0a] hover:cursor-pointer"
        data-testid="tweet"
    >
        <template #side>
            <LinkedProfilePicture :user="tweet.user" />
        </template>
        <div class="flex flex-col gap-1 grow text-sm min-w-0">
            <div class="w-full flex gap-2 text-neutral-400">
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
                <span>·</span>
                <AppTime :datetime="tweet.created_at" class="shrink-0 mr-3" />
                <TweetDropdown :tweet="tweet" />
            </div>
            <div class="text-neutral-400" v-if="tweet.parent_tweet">
                Replying to
                <Link
                    class="text-sky-500 hover:underline"
                    :href="`/${tweet.parent_tweet.user.username}`"
                >
                    @{{ tweet.parent_tweet.user.username }}
                </Link>
            </div>
            <p class="text-neutral-200 overflow-hidden break-words">
                {{ tweet.text }}
            </p>
        </div>
    </TweetLayout>
</template>
