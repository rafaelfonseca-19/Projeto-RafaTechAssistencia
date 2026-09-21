const formularioLogin = document.getElementById('formlogin');

formularioLogin.addEventListener('submit', function(event) 
{
    event.preventDefault();
    let usuarioDigitado = document.getElementById('usuario').value;
    let senhaDigitada = document.getElementById('senha').value;
    
    let usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");
    
    const usuarioEncontrado = usuariosSalvos.find(u => 
        u.usuario === usuarioDigitado && u.senha === senhaDigitada
    );

    if (usuarioEncontrado) 
    {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

        alert(`Login realizado com sucesso! Bem-vindo, ${usuarioEncontrado.usuario}.`);
        window.location.href = "../index.html";
    } 
    else 
    {
       const formularioLogin = document.getElementById('formlogin');

        formularioLogin.addEventListener('submit', function(event) {
            event.preventDefault();
            let usuarioDigitado = document.getElementById('usuario').value;
            let senhaDigitada = document.getElementById('senha').value;
            
            let usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");
            
            // 1ª Verificação: O usuário existe na lista de cadastrados?
            const usuarioEncontrado = usuariosSalvos.find(u => u.usuario === usuarioDigitado);

            if (!usuarioEncontrado) {
                // Se a busca pelo nome do usuário voltar vazia (undefined)
                alert("Usuário não cadastrado! Verifique o nome digitado ou crie uma conta.");
            } 
            // 2ª Verificação: O usuário existe, mas a senha bate com a digitada?
            else if (usuarioEncontrado.senha !== senhaDigitada) {
                // Se o usuário existe, mas a senha está errada
                alert("Senha incorreta. Tente novamente.");
            } 
            // Se passou pelas duas validações, o login é autorizado
            else {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

                alert(`Login realizado com sucesso! Bem-vindo, ${usuarioEncontrado.usuario}.`);
                window.location.href = "../index.html";
            }
        });
    }

    
});