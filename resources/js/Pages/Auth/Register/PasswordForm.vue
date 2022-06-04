<script setup lang="ts">
import AppInput from "@/components/ui/AppInput.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { form } from "./state";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

defineProps<{
    onSubmit: () => void;
}>();

const rules = {
    password: {
        required,
        minLengthValue: minLength(8),
    },
};

const validation = useVuelidate(rules, form);
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="grow pb-7 flex flex-col gap-6 px-8 pt-6"
    >
        <div>
            <h2 class="text-2xl font-bold">You'll need a password</h2>
            <p class="text-sm text-neutral-500">
                Make sure it's 8 characters or more.
            </p>
        </div>
        <AppInput
            type="password"
            placeholder="Password"
            v-model="form.password"
            class="mt-1"
            data-testid="password"
        />
        <div class="flex flex-col grow justify-end">
            <AppButton
                type="submit"
                class="bg-neutral-100 text-neutral-900"
                size="lg"
                data-testid="next"
                :disabled="validation.$invalid"
            >
                Next
            </AppButton>
        </div>
    </form>
</template>
