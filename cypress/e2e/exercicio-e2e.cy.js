/// <reference types="cypress" />

import carrinhoPage from "../support/page_objects/carrinho.page";
const { faker, fakerPT_BR } = require('@faker-js/faker');

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO 
        carrinhoPage.colocarItensNoCarrinhoERealizarCheckout();

        let nome = faker.person.firstName();
        let sobrenome = faker.person.lastName();
        let empresa = faker.company.name();
        let email = faker.internet.email(nome, sobrenome);

        carrinhoPage.fazerCheckOut(nome, sobrenome, empresa, email);

        cy.fixture('produtos').then((produto) => {
            for (let i = 0; i < 4; i++) {
                cy.get(':nth-child(' + (i + 1) + ') > .woocommerce-table__product-name > a').should('contain', produto[i].nome + ' - ' + produto[i].tamanho + ', ' + produto[i].cor);
                cy.get(':nth-child(' + (i + 1) + ') > .woocommerce-table__product-name > .product-quantity').should('contain', produto[i].quantidade);
                cy.get(':nth-child(' + (i + 1) + ') > .woocommerce-table__product-total > .woocommerce-Price-amount > bdi').should('contain', produto[i].valor);
            }
        });

        cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.');
    });
});
