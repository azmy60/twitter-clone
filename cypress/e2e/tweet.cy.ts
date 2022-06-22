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
        cy.login({ id: userId });
    });

    it("can post tweets from home page", () => {
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
        cy.create({
            model: "App\\Models\\Tweet",
            count: 1,
            attributes: { user_id: userId },
        });
        cy.visit("/home");

        cy.get("[data-testid=tweet]")
            .within(() => {
                cy.get("[data-testid=menu-btn]")
                    .click()
                    .get("[data-testid=menu-delete-btn]")
                    .click();
            })
            .get("[data-testid=modal-delete-btn]")
            .click();

        cy.get("[data-testid=tweet]").should("not.exist");
    });

    it("can post replies", () => {
        const tweetId = 1;
        cy.create({
            model: "App\\Models\\Tweet",
            count: 1,
            attributes: { id: tweetId, user_id: userId },
        });
        cy.visit(`/${username}/status/${tweetId}`);

        cy.get("[data-testid=reply-textarea]")
            .click()
            .type("Whoa! That's intresting, but I sure don't care...")
            .get("[data-testid=reply-btn]")
            .click();

        cy.get("[data-testid=tweet]").contains(
            "Whoa! That's intresting, but I sure don't care..."
        );

        cy.get("[data-testid=reply-textarea]")
            .contains("Whoa! That's intresting, but I sure don't care...")
            .should("not.exist");
    });

    it("can delete replies", () => {
        const tweetId = 1;
        cy.create({
            model: "App\\Models\\Tweet",
            count: 1,
            attributes: { id: tweetId, user_id: userId },
        });
        cy.create({
            model: "App\\Models\\Tweet",
            count: 1,
            attributes: { parent_tweet_id: tweetId, user_id: userId },
        });
        cy.visit(`/${username}/status/${tweetId}`);

        cy.get("[data-testid=tweet]")
            .within(() => {
                cy.get("[data-testid=menu-btn]")
                    .click()
                    .get("[data-testid=menu-delete-btn]")
                    .click();
            })
            .get("[data-testid=modal-delete-btn]")
            .click();

        cy.get("[data-testid=tweet]").should("not.exist");
    });
});
