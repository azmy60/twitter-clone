import "./bootstrap";
import { createApp, h } from "vue";
import {
    App as InertiaApp,
    plugin as InertiaPlugin,
    Link,
} from "@inertiajs/inertia-vue3";
import { InertiaProgress } from "@inertiajs/progress";

const el = document.getElementById("app");

const app = createApp({
    render: () =>
        h(InertiaApp, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: async (name) => {
                if (import.meta.env.DEV) {
                    try {
                        return (await import(`./Pages/${name}.vue`)).default;
                    } catch (_) {}

                    try {
                        return (await import(`./Pages/${name}/index.vue`))
                            .default;
                    } catch (_) {}

                    throw new Error(`Vue page ${name} is not found`);
                } else {
                    let pages = asyncViews();
                    const importPage =
                        pages[`./Pages/${name}.vue`] ??
                        pages[`./Pages/${name}/index.vue`];

                    return importPage().then((module) => module.default);
                }
            },
        }),
});
app.mixin({ methods: { route } });
app.use(InertiaPlugin);
app.component("inertia-link", Link);
app.mount(el);

InertiaProgress.init({ color: "#4B5563" });
