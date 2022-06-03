import AppDateInput from "@/components/ui/AppDateInput.vue";

const monthSelector = "[data-testid=month-select]";
const daySelector = "[data-testid=day-select]";
const dayOptionSelector = "[data-test=day-select-option]";
const yearSelector = "[data-testid=year-select]";

describe("AppDateInput.cy.ts", () => {
    beforeEach(() => {
        cy.clock(new Date(2100, 1, 1));

        const onChangeSpy = cy.spy().as("changeSpy");
        cy.mount(AppDateInput, {
            props: { onChange: onChangeSpy },
        });
    });

    it("invokes an event callback with formatted date string", () => {
        cy.get(monthSelector)
            .select("January")
            .get(daySelector)
            .select("1")
            .get(yearSelector)
            .select("2022")
            .get("@changeSpy")
            .should("be.calledWith", "Jan 1, 2022");
    });

    it("shows how many days in month correctly", () => {
        cy.get(monthSelector)
            .select("January")
            .get(dayOptionSelector)
            .last()
            .should("contain", 31);

        cy.get(monthSelector)
            .select("February")
            .get(dayOptionSelector)
            .last()
            .should("contain", 28);

        cy.get(monthSelector)
            .select("April")
            .get(dayOptionSelector)
            .last()
            .should("contain", 30);
    });

    it("adds an extra day of february in leap years", () => {
        cy.get(monthSelector).select("February");

        cy.get(yearSelector)
            .select("2016")
            .get(dayOptionSelector)
            .last()
            .should("contain", 29);

        cy.get(yearSelector)
            .select("2020")
            .get(dayOptionSelector)
            .last()
            .should("contain", 29);

        cy.get(yearSelector)
            .select("2000")
            .get(dayOptionSelector)
            .last()
            .should("contain", 29);
    });

    it("does not add an extra day of february in non leap years", () => {
        cy.get(monthSelector).select("February");

        cy.get(yearSelector)
            .select("2022")
            .get(dayOptionSelector)
            .last()
            .should("contain", 28);

        cy.get(yearSelector)
            .select("2100")
            .get(dayOptionSelector)
            .last()
            .should("contain", 28);
    });
});
