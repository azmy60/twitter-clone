<script setup lang="ts">
import { HomeIcon, UserIcon } from "@heroicons/vue/outline";
import { PencilIcon } from "@heroicons/vue/solid";
import { Link } from "@inertiajs/inertia-vue3";
import { user } from "@/inertia";
import TwitterMark from "@/components/logo/TwitterMark.vue";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
</script>

<template>
    <nav
        class="sticky top-0 shrink-0 flex flex-col items-center gap-2 w-16 border-r border-neutral-800 py-2 px-1 h-screen"
    >
        <Link
            :href="route('tweets.index')"
            class="rounded-full p-2.5 w-12 h-12 hover:bg-zinc-900"
        >
            <TwitterMark />
        </Link>
        <div class="flex flex-col gap-1">
            <Link
                :href="route('tweets.index')"
                class="rounded-full p-2.5 w-12 h-12 hover:bg-neutral-900"
            >
                <HomeIcon />
            </Link>
            <Link
                v-if="user"
                :href="`/${user.username}`"
                class="rounded-full p-2.5 w-12 h-12 hover:bg-neutral-900"
            >
                <UserIcon />
            </Link>
            <Link
                :href="route('tweets.create')"
                class="mt-2 rounded-full p-2.5 w-12 h-12 bg-sky-500 text-white"
                data-testid="nav-open-tweet-modal"
            >
                <PencilIcon />
            </Link>
        </div>
        <div class="grow pb-2 flex flex-col justify-end">
            <div class="p-2.5 rounded-full hover:bg-neutral-900">
                <AppProfilePicture
                    class="w-8 h-8"
                    :src="user?.profile_photo_url"
                />
            </div>
        </div>
    </nav>
</template>
