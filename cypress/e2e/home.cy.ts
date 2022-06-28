describe("home.cy.ts", () => {
    before(() => {
        cy.refreshDatabase();
        cy.create({
            model: "App\\Models\\Tweet",
            count: 3,
        });
    });

    it("shows tweets from all users", () => {
        cy.login();
        cy.visit("/home");

        cy.get("[data-testid=tweet]").should("have.length", 3);
    });
});
