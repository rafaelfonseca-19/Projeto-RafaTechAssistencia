document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Exibir nome do usuário logado no cabeçalho
    const campoNomeUsuario = document.getElementById('nome-usuario-logado');
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (campoNomeUsuario) {
        if (usuarioLogado && usuarioLogado.usuario) {
            campoNomeUsuario.textContent = `Olá, ${usuarioLogado.usuario}`;
        } else {
            campoNomeUsuario.textContent = 'Visitante';
        }
    }

    // 2. Lógica de clique nos botões
    let btncontato = document.getElementById('contato');
    let btnservicos = document.getElementById('servicos');
    let btnchamado = document.getElementById('chamado');

    function verificarAcessoBotao(evento, botaoElemento) {
        evento.preventDefault();

        // Busca a tag <a> que está dentro do botão clicado
        let linkInterno = botaoElemento.querySelector('.linkbtn');
        // Pega o endereço guardado no data-url dela
        let urlDestino = linkInterno ? linkInterno.getAttribute('data-url') : null;

        let usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado'));

        // ALTERAÇÃO AQUI: Só barra se NÃO tiver usuário logado E o botão NÃO for o btnservicos
        if (!usuarioAtual && botaoElemento !== btnservicos) {
            alert('Você precisa estar logado para acessar esta função. Por favor, faça o login.');
            window.location.href = './login/Login.html'; 
            return;
        }

        // Se o usuário estiver logado OU for o botão de serviços, ele passa direto para cá:
        if (urlDestino) {
            window.location.href = urlDestino;
        }
    }

    // Vincula os cliques passando o elemento do botão
    if (btncontato) {
        btncontato.addEventListener('click', (e) => verificarAcessoBotao(e, btncontato));
    }

    // O botão de serviços ainda usa a função para conseguir ler o 'data-url' e redirecionar, 
    // mas agora ele pula o bloqueio do login.
    if (btnservicos) {
        btnservicos.addEventListener('click', (e) => verificarAcessoBotao(e, btnservicos));
    }

    if (btnchamado) {
        btnchamado.addEventListener('click', (e) => verificarAcessoBotao(e, btnchamado));
    }
});