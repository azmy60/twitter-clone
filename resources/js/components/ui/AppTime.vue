<script setup lang="ts">
import {
    differenceInSeconds as countDiffInSeconds,
    differenceInMinutes as countDiffInMinutes,
    differenceInHours as countDiffInHours,
    format,
} from "date-fns";
import { computed } from "vue";

const props = defineProps<{
    datetime: string;
    long?: boolean;
}>();

const timeDiff = computed(() => {
    const date = new Date(props.datetime);

    if (props.long) {
        // 4:09 PM · Jun 4, 2022
        return format(date, "K:mm a · MMM d, yyyy");
    }

    const now = new Date();

    const differenceInSeconds = -countDiffInSeconds(date, now);
    if (differenceInSeconds < 60) return `${differenceInSeconds}s`;

    const differenceInMinutes = -countDiffInMinutes(date, now);
    if (differenceInMinutes < 60) return `${differenceInMinutes}m`;

    const differenceInHours = -countDiffInHours(date, now);
    if (differenceInHours < 24) return `${differenceInHours}h`;

    if (date.getFullYear() !== now.getFullYear()) {
        return format(date, "MMM d, yyyy");
    }

    return format(date, "MMM d");
});
</script>

<template>
    <time data-testid="app-time" :datetime="datetime">{{ timeDiff }}</time>
</template>
