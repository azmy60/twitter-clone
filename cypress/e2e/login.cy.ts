describe("login.cy.ts", () => {
    const username = "azmy60";

    before(() => {
        cy.create("App\\Models\\User", { username });
    });

    after(() => {
        cy.refreshDatabase();
    });

    beforeEach(() => {
        cy.visit("/login");
    });

    it("fails when user identifier does not exist", () => {
        cy.get("[data-testid=userIdentifier]").type("notexists");
        cy.get("[data-testid=next]").click();
        cy.get("[data-testid=errorMessage]").should("be.visible");
    });

    it("can login", () => {
        cy.get("[data-testid=userIdentifier]").type(username);
        cy.get("[data-testid=next]").click();

        cy.get("[data-testid=password]").type("password");
        cy.get("[data-testid=logIn]").click();

        cy.url().should("include", "home");
    });
});
