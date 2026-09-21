const cepInput = document.querySelector('#cep');
const ruaInput = document.querySelector('#rua');
const bairroInput = document.querySelector('#bairro');
const cidadeInput = document.querySelector('#cidade');
const estadoInput = document.querySelector('#estado');

// Evento que dispara quando o usuário sai do campo CEP (blur)
cepInput.addEventListener('blur', async () => {
    // Remove tudo que não for número
    const cep = cepInput.value.replace(/\D/g, '');

    // Verifica se o CEP tem o tamanho correto
    if (cep.length !== 8) 
    {
        return; // Sai da função se estiver incompleto
    }

    try 
    {
        // Faz a chamada para a API
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) 
        {
            alert("CEP não encontrado.");
            limparFormulario();
        } 
        else 
        {
            // Preenche os campos com os dados retornados
            ruaInput.value = dados.logradouro;
            bairroInput.value = dados.bairro;
            cidadeInput.value = dados.localidade;
            estadoInput.value = dados.uf;
        }
    } 
    catch (error) 
    {
        console.error("Erro ao buscar CEP:", error);
    }
});

function limparFormulario() 
{
    ruaInput.value = "";
    bairroInput.value = "";
    cidadeInput.value = "";
    estadoInput.value = "";
}