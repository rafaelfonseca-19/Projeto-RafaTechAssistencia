const btnAbrir = document.getElementById('btn-abrir');
const btnFechar = document.getElementById('btn-fechar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleMenu() 
{
    sidebar.classList.toggle('ativa');
    overlay.classList.toggle('visivel');
}

btnAbrir.addEventListener('click', toggleMenu);
btnFechar.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

const campoNomeUsuario = document.getElementById('nome-usuario-logado');
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (campoNomeUsuario) 
{
    if (usuarioLogado && usuarioLogado.usuario) 
    {
        campoNomeUsuario.textContent = `Olá, ${usuarioLogado.usuario}`;
    } 
    else 
    {
        campoNomeUsuario.textContent = 'Visitante';
    }
}