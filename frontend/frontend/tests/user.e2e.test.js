describe("User management", () => {
  it("Should load the page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("SQLite Database Interface");
  });
});
