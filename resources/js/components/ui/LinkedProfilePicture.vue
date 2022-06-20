<script setup lang="ts">
import { Link } from "@inertiajs/inertia-vue3";
import AppProfilePicture from "@/components/ui/AppProfilePicture.vue";

defineProps<{
    user: User;
}>();
</script>

<template>
    <Link :href="`/${user.username}`">
        <AppProfilePicture class="w-12 h-12" :src="user.profile_photo_url" />
    </Link>
</template>
