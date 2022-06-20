<script setup lang="ts">
import AppInput from "@/components/ui/AppInput.vue";
import AppInputWrapper from "@/components/ui/AppInputWrapper.vue";
import AppDateInput from "@/components/ui/AppDateInput.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { form } from "./state";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import axios from "axios";

defineProps<{
    onSubmit: () => void;
}>();

const rules = {
    name: { required },
    email: {
        required,
        email,
        isUnique: helpers.withMessage(
            "Email has already been taken.",
            helpers.withAsync(isEmailUnique)
        ),
        $autoDirty: true,
    },
    birth_date: { required },
};

async function isEmailUnique(email: string) {
    if (email.length === 0) return true;

    const data = { email };
    const response = await axios.post(route("register.unique-email"), data);
    return response.status === 200;
}

const validation = useVuelidate(rules, form);

function onDateInputChange(dateString: string) {
    form.birth_date = dateString;
}
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="grow pb-7 flex flex-col gap-6 px-8 pt-6"
    >
        <h2 class="text-2xl font-bold">Create your account</h2>
        <AppInput
            placeholder="Name"
            v-model="form.name"
            class="mt-1"
            data-testid="name"
        />
        <AppInputWrapper
            :error="validation.email.$errors.at(0)?.$message as string"
        >
            <AppInput
                placeholder="Email"
                v-model="form.email"
                :error="validation.email.$error"
                debounce
                data-testid="email"
            />
        </AppInputWrapper>
        <div class="mt-9">
            <h2 class="font-bold">Date of birth</h2>
            <p class="text-sm text-neutral-500">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
            </p>
            <AppDateInput :onChange="onDateInputChange" />
        </div>
        <div class="flex flex-col grow justify-end">
            <AppButton
                type="submit"
                size="lg"
                variant="solid-secondary"
                data-testid="next"
                :disabled="validation.$invalid"
            >
                Next
            </AppButton>
        </div>
    </form>
</template>
