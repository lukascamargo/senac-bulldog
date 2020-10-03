import {useRouter} from "next/router";
import PublicLayout from "../../layout/PublicLayout";
import {useCallback, useEffect, useState} from "react";
import {Produtos} from "../../models/produtos";
import {Pergunta} from "../../models/pergunta";
import axios from 'axios';
import {Divider} from "@material-ui/core";

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

    return (<PublicLayout>
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
    </PublicLayout>)
}
