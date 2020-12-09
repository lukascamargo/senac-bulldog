import { useEffect, useState } from "react"
import axios from 'axios';
import { Card } from "react-bootstrap";
import { Endereco } from "../../models/endereco";

interface Props {
    idcliente: number;
    retornarDados?(endereco: Endereco): void;
}

export default function ConfirmarEndereco({idcliente, retornarDados}: Props) {
    const [endereco, setEndereco] = useState<Endereco>();

    useEffect(() => {
        async function fetchEndereco() {
            const response = await axios.get('/api/clientes/show', { params: {
                idcliente, 
                faturamento: false, 
                entrega: true
             }});
             console.log(response.data.entrega[0]);
             setEndereco(response.data.entrega[0]);
             if (retornarDados) {
                 retornarDados(response.data.entrega[0]);
             }
        }
        fetchEndereco();
    }, []);

    return (
        <>
            <h3>Endereco</h3>
            <Card>
                <Card.Header>{ endereco?.logradouro }, { endereco?.numero }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        CEP: { endereco?.cep } - Complemento: { endereco?.complemento }
                    </Card.Text>
                    <Card.Text>
                        { endereco?.cidade } - { endereco?.estado } [ { endereco?.pais } ]
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}