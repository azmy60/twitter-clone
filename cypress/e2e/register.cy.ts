describe("register.cy.ts", () => {
    it("can register", () => {
        cy.visit("/register");

        fillPersonalInfoForm();
        fillPasswordForm();
        fillUsernameForm();

        cy.url().should("include", "home");

        cy.refreshDatabase();
    });

    function fillPersonalInfoForm() {
        cy.get("[data-testid=name]")
            .type("John Doe")

            .get("[data-testid=email]")
            .type("johndoe@example.org")

            .get("[data-testid=month-select]")
            .select("January")

            .get("[data-testid=day-select]")
            .select("20")

            .get("[data-testid=year-select]")
            .select("1990")

            .get("[data-testid=next]")
            .click();
    }

    function fillPasswordForm() {
        cy.get("[data-testid=password]")
            .type("password")

            .get("[data-testid=next]")
            .click();
    }

    function fillUsernameForm() {
        cy.get("[data-testid=username]")
            .type("johndoe")

            .get("[data-testid=signup]")
            .click();
    }
});
