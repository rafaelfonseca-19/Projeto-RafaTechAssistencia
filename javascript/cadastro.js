const formulario = document.getElementById('formcadastro');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    let cpf = document.getElementById('cpf').value;
    let usuario = document.getElementById('usuario').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let confirmesenha = document.getElementById('confirmesenha').value;
    let cep = document.getElementById('cep').value;
    let rua = document.getElementById('rua').value;
    let bairro = document.getElementById('bairro').value;
    let cidade = document.getElementById('cidade').value;
    let estado = document.getElementById('estado').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;

    let cadastroUsuario = {
        cpf,
        usuario,
        email,
        senha,
        confirmesenha,
        cep,
        rua,
        bairro,
        cidade,
        estado,
        numero,
        complemento
    }

    // 1ª Validação: Verificação de senha
    if (senha !== confirmesenha) {
        window.alert("As senhas não coincidem!");
    } 
    else {
        // Puxamos a lista do localStorage antes de salvar o novo
        let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        // 2ª Validação: Procura se já existe alguém com o mesmo Usuário, E-mail ou CPF
        const usuarioExistente = usuarios.find(u => u.usuario === usuario);
        const emailExistente = usuarios.find(u => u.email === email);
        const cpfExistente = usuarios.find(u => u.cpf === cpf);

        if (usuarioExistente) {
            window.alert("Este nome de usuário já está em uso!");
        } 
        else if (emailExistente) {
            window.alert("Este e-mail já está cadastrado!");
        } 
        else if (cpfExistente) {
            window.alert("Este CPF já está cadastrado!");
        } 
        // Se passou por todos os filtros, o cadastro é permitido
        else {
            usuarios.push(cadastroUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Dados cadastrados com sucesso!"); 
            formulario.reset();
        }
    }
});