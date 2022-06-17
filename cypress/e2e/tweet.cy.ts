describe("tweet.cy.ts", () => {
    const userId = 1;

    before(() => {
        cy.refreshDatabase();
        cy.create({
            model: "App\\Models\\User",
            count: 1,
            attributes: { id: userId },
        });
    });

    after(() => {
        cy.refreshDatabase();
    });

    it("can post tweets from home page", () => {
        cy.login({ id: userId });
        cy.visit("/home");

        cy.get("[data-testid=tweet-compose-textarea]")
            .click()
            .type("Hi twitter clone!")
            .get("[data-testid=tweet-compose-btn]")
            .click();

        cy.get("[data-testid=tweet]").contains("Hi twitter clone!");

        cy.get("[data-testid=tweet-compose-textarea]")
            .contains("Hi twitter clone!")
            .should("not.exist");
    });
});
