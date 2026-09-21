document.addEventListener('DOMContentLoaded', () => {
    // 1. VERIFICAÇÃO DE AUTENTICAÇÃO
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        alert('Você precisa estar logado para abrir um chamado.');
        window.location.href = '../login/Login.html';
        return;
    }

    // Capture dos elementos
    const inputNome = document.getElementById('nomeCliente');
    const formChamado = document.getElementById('formChamado');

    // 2. PREENCHIMENTO AUTOMÁTICO
    // Preenche o campo de nome com o usuário logado para evitar digitação manual
    if (inputNome && usuarioLogado.usuario) {
        inputNome.value = usuarioLogado.usuario;
    }

    // 3. ENVIO DO FORMULÁRIO VIA WHATSAPP
    if (formChamado) {
        formChamado.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = inputNome ? inputNome.value : usuarioLogado.usuario;
            const dataRaw = document.getElementById('dataServico').value;
            const descricao = document.getElementById('descServico').value;

            // Formata a data de AAAA-MM-DD para DD/MM/AAAA
            const dataFormatada = dataRaw ? dataRaw.split('-').reverse().join('/') : 'Não informada';

            const numeroWhatsapp = "5521987072882";

            const mensagem = `Novo Chamado - RafaTech Assistência 🛠️\n\n` +
                             `👤 Nome do Cliente: ${nome}\n` +
                             `📅 Data Pretendida: ${dataFormatada}\n` +
                             `📝 Descrição do Serviço: ${descricao}`;

            const mensagemCodificada = encodeURIComponent(mensagem);
            const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${mensagemCodificada}`;

            window.open(urlWhatsapp, '_blank');
        });
    }
});