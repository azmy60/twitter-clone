<script setup lang="ts">
import { XIcon, ArrowSmLeftIcon } from "@heroicons/vue/solid";
import { Head } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import AppModal from "@/components/ui/AppModal.vue";
import PersonalInfoForm from "./PersonalInfoForm.vue";
import PasswordForm from "./PasswordForm.vue";
import UsernameForm from "./UsernameForm.vue";
import { form } from "./state";
import { computed, ref } from "vue";

const FLOWS = ["EnterPersonalInfo", "EnterPassword", "EnterUsername"] as const;

type FlowType = typeof FLOWS[number];

let currentFlowIndex = ref(0);

const currentFlow = computed<FlowType>(() => FLOWS[currentFlowIndex.value]);
const isFirstFlow = computed(() => currentFlowIndex.value === 0);

function nextFlow() {
    if (currentFlowIndex.value === FLOWS.length - 1) {
        return submit();
    }
    currentFlowIndex.value++;
}

function prevFlow() {
    if (currentFlowIndex.value === 0) {
        return Inertia.get('/');
    }
    currentFlowIndex.value--;
}

function submit() {
    form.post(route("register"), {
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <Head title="Twitter" />
    <AppModal>
        <div
            class="relative w-screen h-screen bg-black md:rounded-2xl md:max-w-xl md:h-auto"
        >
            <div class="flex p-2">
                <button
                    @click="prevFlow"
                    class="p-2 hover:bg-neutral-900 w-min rounded-full"
                >
                    <XIcon v-show="isFirstFlow" class="w-5 h-5" />
                    <ArrowSmLeftIcon v-show="!isFirstFlow" class="w-5 h-5" />
                </button>
                <h1 class="self-center ml-6 font-bold text-xl">
                    Step {{ currentFlowIndex + 1 }} of {{ FLOWS.length }}
                </h1>
            </div>
            <div class="grid grow md:max-w-lg md:mx-auto md:min-h-[32rem]">
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
            </div>
        </div>
    </AppModal>
</template>
