<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";
import AppButton from "@/components/ui/AppButton.vue";
import AppInput from "@/components/ui/AppInput.vue";
import axios from "axios";
import { userIdentifier } from "./state";

const props = defineProps<{
    onSuccess: () => void;
    onFail: (error: string) => void;
}>();

function submit() {
    axios
        .post(route("login.onboarding"), {
            user_identifier: userIdentifier.value,
        })
        .then((response) => {
            if (response.data.status === "success") {
                props.onSuccess();
            }
        })
        .catch((error) => {
            userIdentifier.value = "";
            props.onFail(error.response.data.error);
        });
}
</script>

<template>
    <form
        @submit.prevent="submit"
        class="grow pb-9 flex flex-col justify-center w-72 mx-auto gap-6"
    >
        <h1 class="text-2xl font-bold md:text-3xl md:my-2">
            Sign in to Twitter
        </h1>
        <AppInput
            type="text"
            name="user_identifier"
            placeholder="Email or username"
            v-model="userIdentifier"
            data-testid="userIdentifier"
        />
        <AppButton
            type="submit"
            class="flex justify-center py-2.5 px-4 rounded-full text-sm font-bold"
            size="md"
            variant="solid-secondary"
            data-testid="next"
        >
            Next
        </AppButton>
        <AppButton
            type="link"
            :href="route('password.request')"
            variant="outline-secondary"
            size="md"
        >
            Forgot password?
        </AppButton>
        <p class="text-sm text-neutral-400 md:mt-6 md:mb-8">
            Don't have an account?
            <Link
                :href="route('register')"
                class="text-sky-400 hover:underline"
            >
                Sign up
            </Link>
        </p>
    </form>
</template>
