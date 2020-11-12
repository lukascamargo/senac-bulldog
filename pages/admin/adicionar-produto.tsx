import { useForm } from "react-hook-form";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import React, { useState } from "react";
import {Produtos} from "../../shared/models/produtos";
import { Button, Col, Form, FormControl, Modal, Row } from "react-bootstrap";

interface OwnProps {
    open: boolean;
    handleClose():void;
    handleSaveProduct():void;
    editarProduto?: Produtos;
}

type Props = OwnProps;
export default function AdicionarProduto({ open, handleClose, handleSaveProduct, editarProduto }: Props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [file, setFile] = useState({});

    const onFileChange = event => { 
        setFile(event.target.files); 
       
    }; 
    
    const onSubmit = async (data) => {
        data.status = true;
        data.file = file as FileList;

        if (editarProduto?.idproduto) {
            data.idproduto = editarProduto.idproduto;
            await axios.put('/api/produtos/edit', data);
        } else {
            console.log(data);
            console.log(file[0])
            console.log(file[1])
            const formData = new FormData();
            
            for(let i = 0; i < file.length; i++) {
                formData.append('file', file[0]);
            }

            formData.append('status', data.status);
            formData.append('quantidade', data.quantidade);
            formData.append('nome', data.nome);
            formData.append('descricao', data.descricao);
            formData.append('descricao_longa', data.descricao_longa);
            formData.append('valor', data.valor);
            formData.append('palavras_chave', data.palavras_chave);

            await axios.post('/api/produtos/save', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        }

        handleSaveProduct();
    };

    const deletar = async () => {
        if (editarProduto?.idproduto) {
            await axios.delete(`/api/produtos/delete?idproduto=${editarProduto?.idproduto}`);
        }

        handleSaveProduct();
    }

    return (
        <Modal 
            size="lg"
            show={open}
            onHide={handleClose}
            dialogClassName="modal-90w"
        >
            <Modal.Header style={{ position: 'relative' }} closeButton>
                    <Modal.Title style={{ flex: 1, marginLeft: 2 }}>
                        {editarProduto?.idproduto ? 'Editar ': 'Adicionar '} Idproduto { editarProduto?.nome}
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>Nome do Produto</Form.Label>
                                <FormControl id="nome" name="nome" placeholder="Nome do Produto" defaultValue={editarProduto?.nome} ref={register({ required: true })}/>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>Quantidade em estoque</Form.Label>
                                <FormControl id="quantidade" name="quantidade" aria-label="Quantidade" type="number" defaultValue={editarProduto?.quantidade} ref={register}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>Valor do Produto</Form.Label>
                                <FormControl id="valor" type="number" name="valor" aria-label="Valor do Produto" defaultValue={editarProduto?.valor}  ref={register({ required: true })}/>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label>Palavras Chave</Form.Label>
                                <FormControl id="palavras_chave" name="palavras_chave" aria-label="Palavras Chave" defaultValue={editarProduto?.palavras_chave}  ref={register({ required: true })}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group>
                                <Form.Label>Descrição Simples</Form.Label>
                                <FormControl as="textarea" id="descricao" name="descricao" aria-label="Descricao Simples" defaultValue={editarProduto?.descricao} ref={register({ required: true })}/>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={12}>
                            <Form.Group>
                                <Form.Label>Descrição Completa</Form.Label>
                                <FormControl as="textarea" id="descricao_longa" name="descricao_longa" aria-label="Descricao Completa" defaultValue={editarProduto?.descricao_longa} ref={register({ required: false })}/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form>
                                <Form.Group>
                                    <Form.File multiple type="file" name="file" id="file" label="File input" onChange={onFileChange}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
                {
                    editarProduto?.idproduto ?
                        (
                            <Button variant="danger" onClick={deletar}>
                                Deletar Idproduto
                            </Button>
                        ):
                        ''
                }
            </Modal.Body>
        </Modal>
    );
};
