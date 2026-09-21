document.addEventListener('DOMContentLoaded', () => {
    // Captura os elementos dos inputs do formulário
    const inputCpf = document.getElementById('cpf');
    const inputUsuario = document.getElementById('usuario');
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const inputConfirmesenha = document.getElementById('confirmesenha');
    const inputCep = document.getElementById('cep');
    const inputRua = document.getElementById('rua');
    const inputBairro = document.getElementById('bairro');
    const inputCidade = document.getElementById('cidade');
    const inputEstado = document.getElementById('estado');
    const inputNumero = document.getElementById('numero');
    const inputComplemento = document.getElementById('complemento');

    const formPerfil = document.getElementById('formperfil');
    const btnExcluir = document.getElementById('btn-excluir');

    // 1. CARREGAR DADOS DO USUÁRIO LOGADO
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // CORREÇÃO AQUI: Se não houver usuário logado, redireciona direto para o login
    if (!usuarioLogado) 
    {
        alert('Nenhum usuário logado encontrado. Por favor, faça o login para acessar seu perfil.');
        window.location.href = '../login/Login.html';
        return; 
    }

    // Preenche os campos da tela com os dados recuperados da sessão ativa
    inputCpf.value = usuarioLogado.cpf || '';
    inputUsuario.value = usuarioLogado.usuario || '';
    inputEmail.value = usuarioLogado.email || '';
    inputSenha.value = usuarioLogado.senha || '';
    
    // CORREÇÃO AQUI: Estava 'usuarioLogado.numerocell', mudado para 'senha' ou 'confirmesenha'
    inputConfirmesenha.value = usuarioLogado.confirmesenha || usuarioLogado.senha || ''; 
    
    inputCep.value = usuarioLogado.cep || '';
    inputRua.value = usuarioLogado.rua || '';
    inputBairro.value = usuarioLogado.bairro || '';
    inputCidade.value = usuarioLogado.cidade || '';
    inputEstado.value = usuarioLogado.estado || '';
    inputNumero.value = usuarioLogado.numero || '';
    inputComplemento.value = usuarioLogado.complemento || '';

    // 2. SALVAR ALTERAÇÕES
    formPerfil.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validação básica se as senhas batem antes de salvar
        if (inputSenha.value !== inputConfirmesenha.value) 
        {
            alert('As senhas não coincidem!');
            return;
        }

        // Atualiza o objeto do usuário logado com os novos dados digitados na tela
        usuarioLogado.usuario = inputUsuario.value;
        usuarioLogado.email = inputEmail.value;
        usuarioLogado.senha = inputSenha.value;
        usuarioLogado.confirmesenha = inputConfirmesenha.value;
        usuarioLogado.cep = inputCep.value;
        usuarioLogado.rua = inputRua.value;
        usuarioLogado.bairro = inputBairro.value;
        usuarioLogado.cidade = inputCidade.value;
        usuarioLogado.estado = inputEstado.value;
        usuarioLogado.numero = inputNumero.value;
        usuarioLogado.complemento = inputComplemento.value;

        // Atualiza a sessão ativa no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        // Atualiza também esse mesmo usuário dentro da lista geral de cadastros ('usuarios')
        let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let index = listaUsuarios.findIndex(user => user.cpf === usuarioLogado.cpf);
        
        if (index !== -1) {
            listaUsuarios[index] = usuarioLogado;
            localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
        }

        alert('Dados alterados e salvos com sucesso!');
    });

    // 3. EXCLUIR DADOS E CONTA
    btnExcluir.addEventListener('click', () => {
        const confirmacao = confirm('Tem certeza absoluta que deseja excluir seus dados e sua conta? Esta ação não pode ser desfeita.');
        
        if (confirmacao) {
            let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            let listaAtualizada = listaUsuarios.filter(user => user.cpf !== usuarioLogado.cpf);
            localStorage.setItem('usuarios', JSON.stringify(listaAtualizada));

            // Limpa completamente a sessão logada ativa
            localStorage.removeItem('usuarioLogado');

            alert('Seus dados foram completamente removidos da nossa base.');
            window.location.href = '../index.html';
        }
    });
});

const btnSairPerfil = document.getElementById('btn-sair-perfil');
if (btnSairPerfil) 
{
    btnSairPerfil.addEventListener('click', () => 
    {
        if (confirm('Deseja realmente sair da sua conta?')) 
        {
            localStorage.removeItem('usuarioLogado');
            alert('Você foi deslogado. Até logo!');
            window.location.href = '../index.html';
        }
    });
}