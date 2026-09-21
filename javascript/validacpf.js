const cpfInput = document.querySelector('#cpf');
const erroMensagem = document.querySelector('#cpf-erro');

// Formatação automática (000.000.000-00)
cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    e.target.value = value;
});

// Validação ao sair do campo
cpfInput.addEventListener('blur', () => {
    const cpf = cpfInput.value.replace(/\D/g, '');

    if (cpf === "") {
        erroMensagem.style.display = 'none';
        return;
    }

    if (validarCPF(cpf)) {
        erroMensagem.style.display = 'none';
        cpfInput.style.borderColor = '#059a00'; // Cor original
    } else {
        erroMensagem.style.display = 'block';
        cpfInput.style.borderColor = '#ff4d4d'; // Borda vermelha de erro
    }
});

function validarCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;
    
    // Validação do 1º dígito
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    // Validação do 2º dígito
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}