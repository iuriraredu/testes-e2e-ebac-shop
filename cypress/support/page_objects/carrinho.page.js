class CarrinhoPage {

    colocarItensNoCarrinho(){
        //ações do método
        for (let i = 0;i < 4 ; i++){
            cy.fixture('produtos').then((produto) => {
                cy.voltarParaPaginaDeProdutos();
                cy.proximaPaginaDeProdutos(produto[i].pagina);
                cy.colocaItemNoCarrinho(produto[i]);
            });
        }
    }

    fazerCheckOut(nome, sobrenome, empresa, email){
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click();
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click();
        
        cy.fixture('perfil').then((usuario) => {
            cy.realizarLoginNoCarrinho(usuario);
        });

        cy.fixture('endereco').then((endereco) => {
            cy.cadastroEnderecofaturamento(
                nome, sobrenome, empresa, 
                endereco[0].pais, endereco[0].logradouro, 
                endereco[0].numero, endereco[0].cidade, 
                endereco[0].estado, endereco[0].cep,
                endereco[0].telefone, email
            );
        });
        cy.get('#payment_method_bacs').check();
        cy.get('#terms').check();
        cy.get('#place_order').click();
    }

}

export default new CarrinhoPage()