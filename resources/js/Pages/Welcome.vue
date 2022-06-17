<script setup lang="ts">
import TwitterMark from "@/components/logo/TwitterMark.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { Head } from "@inertiajs/inertia-vue3";
</script>

<template>
    <Head title="Twitter. It's what's happening / Twitter" />
    <div class="lg:flex lg:flex-row-reverse">
        <div
            class="px-8 py-10 max-w-lg sm:mx-auto lg:shrink-0 lg:ml-0 lg:my-auto"
        >
            <TwitterMark class="w-10 h-10" />
            <h1 class="text-4xl font-bold mt-14 sm:text-6xl">
                Happening
                <br class="hidden mt-4 sm:block lg:hidden" />
                now
            </h1>
            <div class="mt-11 flex flex-col gap-8 lg:mt-14">
                <h2 class="text-2xl font-bold sm:text-3xl">
                    Join Twitter today.
                </h2>
                <AppButton
                    :href="route('register')"
                    class="w-72 bg-sky-500 text-white"
                    type="link"
                    size="md"
                >
                    Sign up with email
                </AppButton>
                <div class="mt-3">
                    <p class="font-bold">Already have an account?</p>
                    <AppButton
                        :href="route('login')"
                        class="w-72 mt-3 bg-transparent text-sky-400 border border-slate-600"
                        type="link"
                        size="md"
                    >
                        Sign in
                    </AppButton>
                </div>
            </div>
        </div>
        <div class="relative h-72 overflow-hidden lg:h-screen lg:max-w-[54vw]">
            <TwitterMark
                class="absolute inset-0 m-auto w-52 h-52 text-white lg:w-80 lg:h-80"
            />
            <img
                src="/images/steve-johnson-GC-EKZZPZSM-unsplash.jpg"
                class="w-full h-full object-cover"
            />
            <!-- Photo by Steve Johnson on Unsplash -->
        </div>
    </div>
    <div class="py-8 lg:hidden"></div>
</template>
