import AppTime from "@/components/ui/AppTime.vue";
import { ref } from "vue";

describe("AppTime.cy.ts", () => {
    it("shows the correct format", () => {
        const date = new Date("2022-06-23T07:00:00");
        cy.clock(date);

        const datetime = ref(date.getTime());

        cy.mount(AppTime, { props: { datetime } });

        cy.contains(/^0s$/);

        cy.then(() => {
            datetime.value = new Date("2022-06-23T06:59:59").getTime();
            cy.contains(/^1s$/);
        });

        cy.then(() => {
            datetime.value = new Date("2022-06-23T06:59:00").getTime();
            cy.contains(/^1m$/);
        });

        cy.then(() => {
            datetime.value = new Date("2022-06-23T06:00:00").getTime();
            cy.contains(/^1h$/);
        });

        cy.then(() => {
            datetime.value = new Date("2022-06-22T07:00:00").getTime();
            cy.contains(/^Jun 22$/);
        });

        cy.then(() => {
            datetime.value = new Date("2021-12-31T07:00:00").getTime();
            cy.contains(/^Dec 31, 2021$/);
        });
    });
});
