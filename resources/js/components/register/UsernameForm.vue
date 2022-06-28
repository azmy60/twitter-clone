<script setup lang="ts">
import AppInput from "@/components/ui/AppInput.vue";
import AppInputWrapper from "@/components/ui/AppInputWrapper.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { form } from "./state";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";
import axios from "axios";

defineProps<{
    onSubmit: () => void;
}>();

const rules = {
    username: {
        required,
        maxLengthValue: maxLength(15),
        isUnique: helpers.withMessage(
            "Username has already been taken.",
            helpers.withAsync(isUsernameUnique)
        ),
        $autoDirty: true,
    },
};

async function isUsernameUnique(username: string) {
    if (username.length === 0) return true;

    const response = await axios.post(
        route("register.unique-username", { username })
    );
    return response.status === 200;
}

const validation = useVuelidate(rules, form);
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="grow pb-7 flex flex-col gap-6 px-8 pt-6"
    >
        <div>
            <h2 class="text-2xl font-bold">What should we call you?</h2>
            <p class="text-sm text-neutral-500">
                Your @username is unique. You can always change it later.
            </p>
        </div>

        <AppInputWrapper
            :error="validation.username.$errors.at(0)?.$message as string"
        >
            <AppInput
                type="text"
                placeholder="Username"
                v-model="form.username"
                :error="validation.username.$error"
                class="mt-1"
                data-testid="username"
                debounce
            />
        </AppInputWrapper>
        <div class="flex flex-col grow justify-end">
            <AppButton
                type="submit"
                size="lg"
                variant="solid-primary"
                data-testid="signup"
                :disabled="validation.$invalid"
            >
                Sign up
            </AppButton>
        </div>
    </form>
</template>
