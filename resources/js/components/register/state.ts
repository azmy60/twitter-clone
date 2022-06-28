import { useForm } from "@inertiajs/inertia-vue3";

export const form = useForm({
    name: "",
    email: "",
    birth_date: "",
    username: "",
    password: "",
    terms: true,
});
