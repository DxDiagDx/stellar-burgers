const testUrl: string = 'http://localhost:4000/';

describe('Тестирование добавления ингредиентов из списка в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit(testUrl);
  });

  it('Добавление булок', () => {
    cy.get('[data-cy=buns]').contains('Добавить').click();
    cy.get('[data-cy=bun-top').contains('Булка (верх)').should('exist');
    cy.get('[data-cy=bun-bottom').contains('Булка (низ)').should('exist');
  });

  it('Добавление начинок', () => {
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=sauces]').contains('Добавить').click();
    cy.get('[data-cy=burger-element').contains('Котлета').should('exist');
    cy.get('[data-cy=burger-element').contains('Соус').should('exist');
  });
});

describe('Тестирование работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit(testUrl);
  });

  it('Открытие модального окна ингредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Булка').should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-button-close]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Тестирование создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'orderBurger'
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit(testUrl);
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it('Процесс создания заказа', () => {
    cy.get('[data-cy=buns]').contains('Добавить').click();
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=sauces]').contains('Добавить').click();
    cy.contains('Оформить заказ').click();
    cy.contains('79654').should('exist');
    cy.get('[data-cy=modal-button-close]').click();
    cy.contains('79654').should('not.exist');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
