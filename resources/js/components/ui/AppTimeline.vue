<script setup lang="ts">
import AppHorizontalSeparator from "@/components/ui/AppHorizontalSeparator.vue";
import AppTweet from "@/components/tweet/AppTweet.vue";

defineProps<{
    tweets: Tweet[];
}>();
</script>

<template>
    <template v-for="tweet in tweets" :key="tweet.id">
        <AppTweet :tweet="tweet" />
        <AppHorizontalSeparator></AppHorizontalSeparator>
    </template>
</template>
