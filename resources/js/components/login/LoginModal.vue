<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";
import TwitterMark from "@/components/logo/TwitterMark.vue";
import UserIdentifierForm from "./UserIdentifierForm.vue";
import PasswordForm from "./PasswordForm.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { goBack } from "@/helpers";

const action = ref<"EnterUserIdentifier" | "EnterPassword">(
    "EnterUserIdentifier"
);
const errorMessage = ref("");
const errorDuration = 3000;
let errorTimeout: NodeJS.Timeout | null = null;

function nextFlow() {
    action.value = "EnterPassword";
}

function showErrorMessage(error: string) {
    errorMessage.value = error;
    errorTimeout && clearTimeout(errorTimeout);
    errorTimeout = setTimeout(resetErrorMessage, errorDuration);
}

function resetErrorMessage() {
    errorMessage.value = "";
}

const mounted = ref(false);

let bodyOverflow = "";

onMounted(() => {
    mounted.value = true;
    bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    mounted.value = false;
    document.body.style.overflow = bodyOverflow;
});
</script>

<template>
    <Teleport to="body">
        <div
            class="absolute inset-0 grid place-content-center bg-slate-600 bg-opacity-50"
        >
            <div
                class="relative w-screen h-screen flex flex-col bg-black md:rounded-2xl md:max-w-xl md:h-auto"
            >
                <div
                    class="w-full grid grid-cols-3 px-2 pt-2 pb-6 max-w-xl mx-auto"
                >
                    <button
                        @click="goBack"
                        class="p-2 hover:bg-neutral-900 w-min rounded-full"
                    >
                        <XIcon class="w-5 h-5" />
                    </button>
                    <TwitterMark class="place-self-center w-8 h-8" />
                </div>
                <UserIdentifierForm
                    v-if="action === 'EnterUserIdentifier'"
                    :onSuccess="nextFlow"
                    :onFail="showErrorMessage"
                />
                <PasswordForm v-if="action === 'EnterPassword'" />
                <div
                    v-show="errorMessage"
                    class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-sm bg-sky-500 text-white px-4 py-3 rounded-md"
                    data-testid="errorMessage"
                >
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </Teleport>
</template>
