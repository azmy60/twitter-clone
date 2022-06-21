<script setup lang="ts">
import AppHorizontalSeparator from "@/components/ui/AppHorizontalSeparator.vue";
import AppTweet from "@/components/ui/AppTweet.vue";
import { Inertia } from "@inertiajs/inertia";

defineProps<{
    tweets: Tweet[];
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
    <template v-for="tweet in tweets" :key="tweet.id">
        <AppTweet
            tabindex="0"
            @keydown.enter="onClickTweet(tweet)"
            @click="onClickTweet(tweet)"
            :tweet="tweet"
        />
        <AppHorizontalSeparator></AppHorizontalSeparator>
    </template>
</template>
