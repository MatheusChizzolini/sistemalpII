const urlBase = 'https://bcc-backend-lp-2-five.vercel.app/fornecedores';

export async function gravarFornecedor(fornecedor) {
    const resposta = await fetch(urlBase, {
        'method': "POST",
        'headers': {
            'Content-Type': "application/json"
        },
        'body': JSON.stringify(fornecedor)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarFornecedor(fornecedor) {
    const resposta = await fetch(urlBase + "/" + fornecedor.id, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(fornecedor)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirFornecedor(fornecedor) {
    const resposta = await fetch(urlBase + "/" + fornecedor.id, {
        'method': "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarFornecedor() {
    const resposta = await fetch(urlBase, {
        'method': "GET"
    });
    const resultado = await resposta.json();
    return resultado;
}