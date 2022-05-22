import { AxiosInstance } from "axios";
import _route from "ziggy-js";

declare global {
    interface Window {
        _: Lodash;
        axios: AxiosInstance;
    }

    const route = _route;
}
