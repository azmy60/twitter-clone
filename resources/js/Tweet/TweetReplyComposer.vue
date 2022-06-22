<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";
import AppTextarea from "@/components/ui/AppTextarea.vue";
import LinkedProfilePicture from "@/components/ui/LinkedProfilePicture.vue";
import { ref, reactive, computed } from "vue";
import { Inertia } from "@inertiajs/inertia";

const props = defineProps<{
    author: User;
    tweet: Tweet;
}>();

const state = reactive({
    textareaIsFocused: false,
    text: "",
});
const textarea = ref<typeof AppTextarea | null>(null);

const invalid = computed(
    () => state.text.length === 0 || state.text.length > 280
);

function onSubmit() {
    if (invalid.value) return;

    Inertia.post(
        route("tweets.reply.store", {
            user: props.tweet.user.username,
            tweet: props.tweet.id,
        }),
        { text: state.text },
        {
            onSuccess: () => {
                state.textareaIsFocused = false;
                state.text = "";
                textarea.value?.reset && textarea.value.reset();
            },
        }
    );
}
</script>

<template>
    <div
        class="flex items-center"
        :class="{ 'flex-col items-stretch': state.textareaIsFocused }"
    >
        <div
            :class="{ hidden: !state.textareaIsFocused }"
            class="ml-16 mb-2 text-sm text-neutral-400"
        >
            Replying to
            <span class="font-bold"> @{{ tweet.user.username }} </span>
        </div>
        <div class="flex items-center gap-4 grow">
            <LinkedProfilePicture :user="author" />
            <div class="grow">
                <AppTextarea
                    v-model="state.text"
                    ref="textarea"
                    @focus="state.textareaIsFocused = true"
                    class="max-w-0 min-w-full empty:before:content-['Tweet_your_reply']"
                    data-testid="reply-textarea"
                />
            </div>
        </div>
        <div
            id="reply-menu"
            class="flex justify-end"
            :class="{ 'mt-4': state.textareaIsFocused }"
        >
            <AppButton
                size="md"
                type="button"
                variant="solid-primary"
                @click="onSubmit"
                :disabled="invalid"
                data-testid="reply-btn"
            >
                Reply
            </AppButton>
        </div>
    </div>
</template>
