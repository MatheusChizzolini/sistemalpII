const urlBase = 'https://bcc-backend-lp-2-five.vercel.app/usuarios';

export async function gravarUsuario(usuario) {
    const resposta = await fetch(urlBase, {
        'method': "POST",
        'headers': {
            'Content-Type': "application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(usuario) {
    const resposta = await fetch(urlBase + "/" + usuario.nome, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirUsuario(usuario) {
    const resposta = await fetch(urlBase + "/" + usuario.nome, {
        'method': "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario() {
    const resposta = await fetch(urlBase, {
        'method': "GET"
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function login(nomeUsuario, senhaUsuario) {
    const resposta = await fetch(urlBase + "/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nomeUsuario,
            senha: senhaUsuario
        })
    });
    return await resposta.json();
}