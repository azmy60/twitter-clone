describe("tweet.cy.ts", () => {
    const userId = 1;
    const username = "azmy60";

    beforeEach(() => {
        cy.refreshDatabase();
        cy.create({
            model: "App\\Models\\User",
            count: 1,
            attributes: { id: userId, username },
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

    it("can post tweets from tweet modal", () => {
        cy.login({ id: userId });
        cy.visit("/home");

        cy.get("[data-testid=nav-open-tweet-modal]").click();

        cy.get("[data-testid=tweet-compose-modal]")
            .find("[data-testid=tweet-compose-textarea]")
            .click()
            .type("Hi twitter clone!")
            .get("[data-testid=tweet-compose-modal-top-bar]")
            .find("[data-testid=tweet-compose-btn]")
            .click();

        cy.get("[data-testid=tweet-compose-modal]").should("not.exist");

        cy.get("[data-testid=tweet]").contains("Hi twitter clone!");
    });

    it("can delete tweets", () => {
        cy.login({ id: userId });
        cy.create({
            model: "App\\Models\\Tweet",
            count: 1,
            attributes: { user_id: userId },
        });
        cy.visit("/home");

        cy.get("[data-testid=tweet]")
            .find("[data-testid=menu-btn]")
            .click()
            .get("[data-testid=menu-delete-btn]")
            .click()
            .get("[data-testid=modal-delete-btn]")
            .click();

        cy.get("[data-testid=tweet]").should("not.exist");
    });
});
