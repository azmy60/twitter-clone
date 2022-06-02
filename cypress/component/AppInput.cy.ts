import AppInput from "@/components/ui/AppInput.vue";

describe("AppInput.cy.ts", () => {
    it("playground", () => {
        cy.mount(AppInput).get("input").should("be.visible");
    });
});
