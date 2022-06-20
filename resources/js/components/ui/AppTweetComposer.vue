<script setup lang="ts">
import LinkedProfilePicture from "@/components/ui/LinkedProfilePicture.vue";
import AppTextarea from "@/components/ui/AppTextarea.vue";
import AppButton from "@/components/ui/AppButton.vue";
import TweetLayout from "@/Layouts/TweetLayout.vue";
import { computed, ref } from "vue";
import { Inertia } from "@inertiajs/inertia";
import { user } from "@/inertia";

defineProps<{
    teleportTweetTo?: string;
}>();

const text = ref("");
const textarea = ref<typeof AppTextarea | null>(null);

const invalid = computed(
    () => text.value.length === 0 || text.value.length > 280
);

function onSubmit() {
    if (invalid.value) return;

    Inertia.post(
        route("tweets.store"),
        { text: text.value },
        {
            onSuccess: () => {
                text.value = "";
                textarea.value?.reset && textarea.value.reset();
            },
        }
    );
}
</script>

<template>
    <TweetLayout>
        <template #side>
            <LinkedProfilePicture :user="user" />
        </template>
        <div class="grow">
            <form @submit.prevent="onSubmit">
                <div class="py-3.5 max-w-0 min-w-full">
                    <AppTextarea
                        v-model="text"
                        ref="textarea"
                        class="empty:before:content-['What\'s_happening?']"
                        data-testid="tweet-compose-textarea"
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
                            variant="solid-primary"
                            @click="onSubmit"
                            :disabled="invalid"
                            data-testid="tweet-compose-btn"
                        >
                            Tweet
                        </AppButton>
                    </Teleport>
                </div>
            </form>
        </div>
    </TweetLayout>
</template>
