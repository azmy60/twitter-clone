<script setup lang="ts">
import { reactive, watch, ref, nextTick } from "vue";

const daySelect = ref<HTMLSelectElement | null>(null);

const props = defineProps<{
    onChange: (dateString: string) => void;
}>();

const years = new Array(121)
    .fill(new Date().getFullYear() - 120)
    .map((year, i) => year + i)
    .reverse();

const months = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
};

const date = reactive<{
    month: keyof typeof months | null;
    day: number | null;
    year: number | null;
    dateString: string;
}>({
    month: null,
    day: null,
    year: null,
    dateString: "",
});

watch(
    () => date.year,
    async (year) => {
        if (year && isLeapYear(year)) months.February = 29;
        else months.February = 28;

        await nextTick();

        // force update
        daySelect.value?.dispatchEvent(new Event("change"));
    }
);

watch(date, (newDate) => {
    if (newDate.month && newDate.day && newDate.year) {
        date.dateString = `${newDate.month.substring(0, 3)} ${newDate.day}, ${
            newDate.year
        }`;
    } else {
        date.dateString = "";
    }

    props.onChange(date.dateString);
});

function isLeapYear(year: number) {
    if (year % 400 === 0) return true;
    else if (year % 100 === 0) return false;
    else if (year % 4 === 0) return true;

    return false;
}
</script>

<template>
    <div class="grid grid-cols-9 gap-3 mt-4">
        <select
            name="month"
            v-model="date.month"
            class="bg-transparent col-span-4 cursor-pointer border border-neutral-700 rounded py-4 pl-2 placeholder:text-neutral-500 disabled:bg-neutral-900 disabled:border-transparent disabled:text-neutral-600"
            :class="{ 'text-neutral-500': !date.month }"
            data-testid="month-select"
        >
            <option disabled value="">Month</option>
            <option
                v-for="[month, day] of Object.entries(months)"
                data-test="month-select-option"
            >
                {{ month }}
            </option>
        </select>
        <select
            name="day"
            v-model="date.day"
            class="bg-transparent col-span-2 cursor-pointer border border-neutral-700 rounded py-4 pl-2 placeholder:text-neutral-500 disabled:bg-neutral-900 disabled:border-transparent disabled:text-neutral-600"
            :class="{ 'text-neutral-500': !date.day }"
            data-testid="day-select"
            ref="daySelect"
        >
            <option disabled value="">Day</option>
            <template v-if="date.month">
                <option
                    v-for="day in months[date.month]"
                    data-test="day-select-option"
                >
                    {{ day }}
                </option>
            </template>
        </select>
        <select
            name="year"
            v-model="date.year"
            class="bg-transparent col-span-3 cursor-pointer border border-neutral-700 rounded py-4 pl-2 placeholder:text-neutral-500 disabled:bg-neutral-900 disabled:border-transparent disabled:text-neutral-600"
            :class="{ 'text-neutral-500': !date.year }"
            data-testid="year-select"
        >
            <option disabled value="">Year</option>
            <option v-for="year in years" data-test="year-select-option">
                {{ year }}
            </option>
        </select>
    </div>
</template>
