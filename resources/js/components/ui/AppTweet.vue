<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";
import LinkedProfilePicture from "@/components/ui/LinkedProfilePicture.vue";
import AppTime from "@/components/ui/AppTime.vue";
import TweetDropdown from "@/Tweet/TweetDropdown.vue";
import TweetLayout from "@/Layouts/TweetLayout.vue";

defineProps<{
    tweet: Tweet;
}>();
</script>

<template>
    <TweetLayout
        class="hover:bg-[#0a0a0a] hover:cursor-pointer"
        data-testid="tweet"
    >
        <template #side>
            <LinkedProfilePicture :user="tweet.user" />
        </template>
        <div class="grow text-sm min-w-0">
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
            <p class="mt-1 text-neutral-200">{{ tweet.text }}</p>
        </div>
    </TweetLayout>
</template>
