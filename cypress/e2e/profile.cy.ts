describe("profile.cy.ts", () => {
    const userId = 1;
    const username = "azmy60";

    before(() => {
        cy.create("App\\Models\\User", { id: userId, username });
        cy.create({
            model: "App\\Models\\Tweet",
            attributes: { user_id: userId },
        });
    });

    after(() => {
        cy.refreshDatabase();
    });

    it("shows tweets from the user", () => {
        cy.visit(`/${username}`);

        cy.get("[data-testid=tweet]").should("have.length", 1);
    });
});
