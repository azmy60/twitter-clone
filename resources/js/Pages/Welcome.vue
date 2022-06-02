<script setup lang="ts">
import TwitterMark from "@/components/logo/TwitterMark.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { Head } from "@inertiajs/inertia-vue3";
</script>

<template>
    <Head title="Twitter. It's what's happening / Twitter" />
    <div class="px-8 py-10">
        <TwitterMark class="w-10 h-10" />
        <h1 class="text-4xl font-bold mt-14">Happening now</h1>
        <div class="mt-11 flex flex-col w-72 gap-4">
            <h2 class="text-2xl font-bold">Join Twitter today.</h2>

            <AppButton
                :href="route('register')"
                class="bg-sky-500 text-white"
                type="link"
                size="md"
            >
                Sign up with email
            </AppButton>
        </div>
        <div class="mt-11 flex flex-col w-72 gap-3">
            <p class="font-bold">Already have an account?</p>
            <AppButton
                :href="route('login')"
                class="bg-transparent text-sky-400 border border-slate-600"
                type="link"
                size="md"
            >
                Sign in
            </AppButton>
        </div>
    </div>
</template>
