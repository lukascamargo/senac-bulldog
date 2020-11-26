import { ListGroup } from "react-bootstrap";

export default function CarrinhoHeader() {
    return (
        <>
            <ListGroup horizontal>
                <ListGroup.Item className="carrinho-alinhar-centro">
                    Avatar
                </ListGroup.Item>
                <ListGroup.Item className="carrinho-alinhar-centro">
                    Nome
                </ListGroup.Item>
                <ListGroup.Item className="carrinho-alinhar-centro">
                    Preco Unitário
                </ListGroup.Item>
                <ListGroup.Item className="carrinho-alinhar-centro">
                    Itens Selecionados    
                </ListGroup.Item> 
                <ListGroup.Item className="carrinho-alinhar-centro">
                    Valor Total    
                </ListGroup.Item> 
                <ListGroup.Item className="carrinho-alinhar-centro">
                    Acoes
                </ListGroup.Item> 
            </ListGroup>
        </>
    );
};