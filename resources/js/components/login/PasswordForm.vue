<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";
import AppInput from "@/components/ui/AppInput.vue";
import AppLink from "@/components/ui/AppLink.vue";
import { userIdentifier } from "./state";
import { Inertia } from "@inertiajs/inertia";
import { ref } from "vue";

const password = ref("");

function submit() {
    Inertia.post(route("login"), {
        user_identifier: userIdentifier.value,
        password: password.value,
    });
}
</script>

<template>
    <form
        @submit.prevent="submit"
        class="grow pb-7 flex flex-col gap-6 px-8 pt-2 md:px-20"
    >
        <h1 class="text-2xl font-bold md:text-3xl">Enter your password</h1>
        <AppInput
            type="text"
            name="user_identifier"
            v-model="userIdentifier"
            disabled
            class="mt-2"
        />
        <div class="flex flex-col">
            <AppInput
                type="password"
                name="password"
                placeholder="Password"
                v-model="password"
                data-testid="password"
            />
            <AppLink :href="route('password.request')" class="text-[13px] pl-2">
                Forgot password?
            </AppLink>
        </div>
        <div class="md:mt-40 flex flex-col justify-end grow gap-6">
            <AppButton
                type="submit"
                variant="solid-secondary"
                size="lg"
                :disabled="password.length === 0"
                data-testid="logIn"
            >
                Log in
            </AppButton>
            <p class="text-sm text-neutral-400">
                Don't have an account?
                <AppLink :href="route('register')">Sign up</AppLink>
            </p>
        </div>
    </form>
</template>
