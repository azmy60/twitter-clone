<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";
import { Head, Link } from "@inertiajs/inertia-vue3";
import PersonalInfoForm from "./PersonalInfoForm.vue";
import PasswordForm from "./PasswordForm.vue";
import UsernameForm from "./UsernameForm.vue";
import { form } from "./state";
import { computed, ref } from "vue";

const FLOWS = ["EnterPersonalInfo", "EnterPassword", "EnterUsername"] as const;

type FlowType = typeof FLOWS[number];

let currentFlowIndex = ref(0);

const currentFlow = computed<FlowType>(() => FLOWS[currentFlowIndex.value]);

function nextFlow() {
    if (currentFlowIndex.value === FLOWS.length - 1) {
        return submit();
    }
    currentFlowIndex.value++;
}

function submit() {
    form.post(route("register"), {
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <Head title="Twitter" />
    <main class="h-screen flex flex-col relative">
        <div class="flex p-2">
            <Link href="/" class="p-2 hover:bg-neutral-900 w-min rounded-full">
                <XIcon class="w-5 h-5" />
            </Link>
            <h1 class="self-center ml-6 font-bold text-xl">
                Step {{ currentFlowIndex + 1 }} of {{ FLOWS.length }}
            </h1>
        </div>
        <PersonalInfoForm
            v-if="currentFlow === 'EnterPersonalInfo'"
            :onSubmit="nextFlow"
        />
        <PasswordForm
            v-if="currentFlow === 'EnterPassword'"
            :onSubmit="nextFlow"
        />
        <UsernameForm
            v-if="currentFlow === 'EnterUsername'"
            :onSubmit="nextFlow"
        />
    </main>
</template>
