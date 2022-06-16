<script setup lang="ts">
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
import AppTextarea from "@/components/ui/AppTextarea.vue";
import AppButton from "@/components/ui/AppButton.vue";
import TweetLayout from "@/Layouts/TweetLayout.vue";
import { Link, usePage } from "@inertiajs/inertia-vue3";
import { computed, ref } from "vue";
import { Inertia } from "@inertiajs/inertia";

defineProps<{
    teleportTweetTo?: string;
}>();

const user = computed(() => usePage().props.value.user as User);

const text = ref("");

const invalid = computed(
    () => text.value.length === 0 || text.value.length > 280
);

function onSubmit() {
    if (invalid.value) return;

    Inertia.post(route("tweets.store"), { text: text.value });
}
</script>

<template>
    <TweetLayout>
        <template #side>
            <Link :href="`/${user.username}`">
                <AppProfilePicture
                    class="w-12 h-12"
                    :src="user.profile_photo_url"
                />
            </Link>
        </template>
        <div class="grow">
            <form @submit.prevent="onSubmit">
                <div class="py-3.5 max-w-0 min-w-full">
                    <AppTextarea
                        v-model="text"
                        class="empty:before:content-['What\'s_happening?']"
                    />
                </div>
                <div class="flex justify-end mt-1">
                    <Teleport
                        :disabled="!teleportTweetTo"
                        :to="teleportTweetTo || 'body'"
                    >
                        <AppButton
                            size="sm"
                            type="button"
                            @click="onSubmit"
                            :disabled="invalid"
                            class="bg-sky-500 text-white disabled:bg-sky-500 disabled:opacity-70"
                        >
                            Tweet
                        </AppButton>
                    </Teleport>
                </div>
            </form>
        </div>
    </TweetLayout>
</template>
