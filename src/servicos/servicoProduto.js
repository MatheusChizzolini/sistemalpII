const urlBase = 'https://bcc-backend-lp-2-five.vercel.app/produtos';

export async function gravarProduto(produto) {
    console.log(produto);
    const resposta = await fetch(urlBase, {
        'method': "POST",
        'headers': {
            'Content-Type': "application/json"
        },
        'body': JSON.stringify(produto)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarProduto(produto) {
    console.log(produto);
    const resposta = await fetch(urlBase + "/" + produto.codigo, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(produto)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirProduto(produto) {
    const resposta = await fetch(urlBase + "/" + produto.codigo, {
        'method': "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarProduto() {
    const resposta = await fetch(urlBase, {
        'method': "GET"
    });
    const resultado = await resposta.json();
    return resultado;
}