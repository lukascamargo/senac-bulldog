import {useRouter} from "next/router";
import PublicLayout from "../../layout/PublicLayout";
import {useCallback, useEffect, useState} from "react";
import {Produtos} from "../../models/produtos";
import {Pergunta} from "../../models/pergunta";
import axios from 'axios';
import {Divider} from "@material-ui/core";
import { Card, Carousel, Col, Row } from "react-bootstrap";

export default function Idproduto() {
    const [produto, setProduto] = useState<Produtos>();
    const [perguntas, setPerguntas] = useState<Pergunta[]>();
    const router = useRouter();
    const {idproduto} = router.query;

    useEffect(() => {
        if(idproduto) {
            buscarInformacoesProduto().then(console.log);
        }
    }, [idproduto]);

    const buscarInformacoesProduto = useCallback(async () => {
        const responseProduto = await axios.get(`/api/produto?idproduto=${idproduto}`);
        const responsePerguntas = await axios.get(`/api/pergunta?idproduto=${idproduto}`);

        setProduto(responseProduto.data[0]);
        setPerguntas(responsePerguntas.data);

        console.log(produto);

        return {produto: responseProduto.data, perguntas: responsePerguntas.data};
    }, [idproduto]);

    if( !produto ) {
        return <p>Produto não encontrado.</p>
    }

    /* return (<PublicLayout>
        <img src="/img/no-image-found.png" />
        <p>Nome do Produto { produto.nome }</p>
        <p>Breve Descrição: { produto.descricao }</p>
        <p>Valor: { produto.valor }</p>
        <p>Descrição Completa: { produto.descricao_longa }</p>
        <Divider />
        { perguntas?.map((pergunta) => {
            return <>
                <p>Pergunta: {pergunta.pergunta}</p>
                <p>Resposta: {pergunta.resposta}</p>
                <Divider />
            </>
        })}
    </PublicLayout>); */


    return (
        <PublicLayout>
            <Card>
                <Row>
                    <Col md={7}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="/img/no-image-found.png"
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="/img/no-image-found.png"
                                alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="/img/no-image-found.png"
                                alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col md={5}>
                        <Card.Body>
                            <h2 className="text-center">{ produto.nome }</h2>
                            <h3 className="blockquote text-center" style={{ color: 'red'}}>R$ { produto.valor }</h3>
                            <h4 className="text-center">{ produto.descricao }</h4>
                            <div className="d-flex justify-content-center">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <p className="blockquote-footer text-center" style={{ marginTop: 8 }}>
                                { produto.descricao }
                            </p>
                            <div className="d-flex justify-content-center" style={{ marginTop: 16}}>
                                <div className="p-2">
                                    <input min="0" max="10" type="number" value="1" className="form-control" />
                                </div>
                                <div className="p-2">
                                    <button disabled type="button" className="btn btn-success">
                                        Comprar
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Card.Header>
                    
                </Card.Header>
            </Card>
        </PublicLayout>
    );
}
