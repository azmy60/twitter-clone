<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
import AppTime from "@/components/ui/AppTime.vue";

defineProps<{
    tweet: Tweet;
}>();
</script>

<template>
    <div
        class="flex py-4 px-4 hover:bg-[#0a0a0a] hover:cursor-pointer"
        data-testid="tweet"
    >
        <div class="shrink-0 pr-4">
            <Link :href="`/${tweet.user.username}`">
                <AppProfilePicture
                    :src="tweet.user.profile_photo_url"
                    class="w-12 h-12"
                />
            </Link>
        </div>
        <div class="text-sm">
            <div class="flex gap-2 text-neutral-400">
                <Link
                    :href="`/${tweet.user.username}`"
                    class="font-bold hover:underline text-neutral-200"
                >
                    {{ tweet.user.name }}
                </Link>
                <Link :href="`/${tweet.user.username}`">
                    @{{ tweet.user.username }}
                </Link>
                <span>·</span>
                <AppTime :datetime="tweet.created_at"></AppTime>
            </div>
            <p class="mt-1 text-neutral-200">{{ tweet.text }}</p>
        </div>
    </div>
</template>
