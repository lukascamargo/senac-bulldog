import React, {useCallback, useEffect, useState} from "react";
import {Produtos} from '../../models/produtos';
import axios from 'axios';
import {GridList, GridListTile, GridListTileBar, IconButton, ListSubheader} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import Link from "next/link";

export default function PublicProductList() {
    const [ produtos, setProdutos ] = useState<Produtos[]>();

    useEffect(() => {
        buscarProdutos().then(console.log);
    }, []);

    const buscarProdutos = useCallback(async () => {
        const response = await axios.get('/api/produtos-ativos');

        setProdutos(response.data);

        return response;
    }, []);

    if (!produtos) {
        return (<p>Nenhum produto encontrado.</p>)
    }

    return (
        <div>
            <GridList cellHeight={180}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Lista de Produtos</ListSubheader>
                </GridListTile>
                {
                    produtos.map((produto) => {
                        return <GridListTile key={produto.idproduto} >
                            <img src="/img/no-image-found.png" alt={produto.nome}/>
                            <GridListTileBar
                                title={produto.nome}
                                subtitle={<span>Valor: {produto.valor} - {produto.descricao}</span>}
                                actionIcon={
                                    <IconButton aria-label={`informação sobre produto ${produto.nome}`}>
                                        <Link href={`/produto/${produto.idproduto}`}>
                                            <InfoIcon />
                                        </Link>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    })
                }
            </GridList>
        </div>
    )
}
