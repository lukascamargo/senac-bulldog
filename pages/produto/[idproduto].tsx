import {useRouter} from "next/router";
import PublicLayout from "../../shared/layout/PublicLayout";
import {useCallback, useEffect, useState} from "react";
import {Produtos} from "../../shared/models/produtos";
import {Pergunta} from "../../shared/models/pergunta";
import axios from 'axios';
import { Card, Carousel, Col, Row, Tabs, Tab } from "react-bootstrap";

export default function Idproduto() {
    const [produto, setProduto] = useState<Produtos>();
    const [perguntas, setPerguntas] = useState<Pergunta[]>();
    const [images, setImages] = useState<any[]>();
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

        setProduto(responseProduto.data.produto[0]);
        setImages(responseProduto.data.image);
        setPerguntas(responsePerguntas.data);

        return {produto: responseProduto.data, perguntas: responsePerguntas.data};
    }, [idproduto]);

    if( !produto ) {
        return <p>Produto não encontrado.</p>
    }

    return (
        <PublicLayout>
            <Card>
                <Row>
                    <Col md={7}>
                        <Carousel>
                            { images?.map((image) => {
                                return (
                                    <Carousel.Item key={image.idimage}>
                                        <img
                                        className="d-block w-100"
                                        src={`http://localhost:3000/api/produtos/image?file=${image.nome}`}
                                        alt={produto.nome}
                                        />
                                    </Carousel.Item>
                                );
                            })}
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
            <Card style={{ marginTop: 12 }}>
                <Card.Header>
                    <h5>Veja mais informações sobre { produto.nome } </h5>
                </Card.Header>
                <Card.Body>
                    <Tabs defaultActiveKey="descricao" id="detalhes-produto" style={{ paddingBottom: 16 }}>
                        <Tab eventKey="descricao" title="Descriçao">
                            <p className="card-text text-left">
                                { produto.descricao_longa || 'Este produto não possui descriçao cadastrada' }
                            </p>
                        </Tab>
                        <Tab eventKey="perguntas" title="Perguntas Frequentes">
                            {
                                 perguntas?.map((pergunta) => {
                                    return (
                                        <>
                                            <h5 className="card-title text-left">{ pergunta.pergunta }</h5>
                                            <p className="card-title text-left">{ pergunta.resposta } </p>
                                        </>
                                    );
                                })
                            }
                            { 
                                perguntas?.length === 0 ? 
                                    (
                                        <p className="card-title text-left">Este produto não possui perguntas cadastradas</p>
                                    ) : 
                                    ''
                            }
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </PublicLayout>
    );
}
