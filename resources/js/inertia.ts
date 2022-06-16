import { usePage } from "@inertiajs/inertia-vue3";
import { computed, defineAsyncComponent } from "vue";

export const user = computed(() => usePage().props.value.user as User);

export const modalComponent = computed(() => {
    const modalName = usePage().props.value.modal;
    return modalName
        ? defineAsyncComponent(() => import(`./${modalName}.vue`))
        : false;
});
