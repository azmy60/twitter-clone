<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import TwitterMark from "@/components/logo/TwitterMark.vue";
import UserIdentifierForm from "./UserIdentifierForm.vue";
import PasswordForm from "./PasswordForm.vue";
import { ref } from "vue";

const action = ref<"EnterUserIdentifier" | "EnterPassword">(
    "EnterUserIdentifier"
);

function nextFlow() {
    action.value = "EnterPassword";
}
</script>

<template>
    <Head title="Twitter" />
    <main class="h-screen flex flex-col">
        <div class="grid grid-cols-3 p-2">
            <Link href="/" class="p-2 hover:bg-neutral-900 w-min rounded-full">
                <XIcon class="w-5 h-5" />
            </Link>
            <TwitterMark class="place-self-center w-8 h-8" />
        </div>
        <UserIdentifierForm
            v-if="action === 'EnterUserIdentifier'"
            :onSuccess="nextFlow"
        />
        <PasswordForm v-if="action === 'EnterPassword'" />
    </main>
</template>
