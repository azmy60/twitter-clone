<script setup lang="ts">
import { Head, Link } from "@inertiajs/inertia-vue3";
</script>

<template>
    <Head title="Twitter. It's what's happening / Twitter" />
    <div class="px-8 py-10">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-10 h-10"
        >
            <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            />
        </svg>
        <h1 class="text-4xl font-bold mt-14">Happening now</h1>
        <div class="mt-11 flex flex-col w-72 gap-4">
            <h2 class="text-2xl font-bold">Join Twitter today.</h2>
            <Link
                :href="route('register')"
                class="flex justify-center py-2.5 px-4 rounded-full text-sm font-bold bg-sky-500 text-white"
            >
                Sign up with email
            </Link>
        </div>
        <div class="mt-11 flex flex-col w-72 gap-3">
            <p class="font-bold">Already have an account?</p>
            <Link
                :href="route('login')"
                class="flex justify-center py-2.5 px-4 rounded-full text-sm font-bold bg-transparent text-sky-400 border border-slate-600"
            >
                Sign in
            </Link>
        </div>
    </div>
</template>
