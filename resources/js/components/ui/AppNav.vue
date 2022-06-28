<script setup lang="ts">
import { HomeIcon, UserIcon } from "@heroicons/vue/outline";
import { PencilIcon } from "@heroicons/vue/solid";
import { Link } from "@inertiajs/inertia-vue3";
import { user } from "@/inertia";
import TwitterMark from "@/components/logo/TwitterMark.vue";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";
import AppNavMenuItem from "@/components/ui/AppNavMenuItem.vue";
import AppButton from "@/components/ui/AppButton.vue";
</script>

<template>
    <nav
        class="sticky top-0 shrink-0 flex flex-col items-center gap-2 py-2 px-1 h-screen lg:w-64 lg:items-stretch lg:pr-4"
    >
        <Link
            :href="route('tweets.index')"
            class="rounded-full p-2.5 w-12 h-12 hover:bg-zinc-900 lg:ml-1"
        >
            <TwitterMark />
        </Link>
        <div class="flex flex-col items-start gap-6 mt-2">
            <AppNavMenuItem :href="route('tweets.index')">
                <HomeIcon class="w-7 h-7" />
                <template #text>Home</template>
            </AppNavMenuItem>
            <AppNavMenuItem
                v-if="user"
                :href="route('users.index', user.username)"
            >
                <UserIcon class="w-7 h-7" />
                <template #text>Profile</template>
            </AppNavMenuItem>
            <Link
                :href="route('tweets.create')"
                class="mt-2 rounded-full p-2.5 w-12 h-12 bg-sky-500 text-white lg:hidden"
                data-testid="nav-open-tweet-modal"
            >
                <PencilIcon class="lg:hidden w-7 h-7" />
            </Link>
            <AppButton
                class="mt-2 w-full hidden lg:block"
                size="lg"
                variant="solid-primary"
                type="link"
                :href="route('tweets.create')"
                data-testid="nav-open-tweet-modal"
            >
                Tweet
            </AppButton>
        </div>
        <div class="grow pb-2 flex flex-col justify-end">
            <div
                v-if="user"
                class="flex w-full gap-3 p-2.5 rounded-full hover:bg-neutral-900"
            >
                <AppProfilePicture
                    class="w-8 h-8 lg:w-10 lg:h-10"
                    :src="user.profile_photo_url"
                />
                <div class="flex-col text-sm select-none hidden lg:flex">
                    <span
                        class="overflow-hidden whitespace-nowrap text-ellipsis font-bold text-neutral-200"
                    >
                        {{ user.name }}
                    </span>
                    <span
                        class="min-w-[3rem] overflow-hidden whitespace-nowrap text-ellipsis text-neutral-400"
                    >
                        @{{ user.username }}
                    </span>
                </div>
            </div>
        </div>
    </nav>
</template>
