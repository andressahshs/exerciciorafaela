export function carregarUfs() {
  
}

export function carregarCidades(uf) {
 
}

export function carregarBairros(cidade) {
 
}

import { carregarUfs, carregarCidades, carregarBairros } from './localidades.js';

carregarUfs();

document.getElementById('uf').addEventListener('change', function() {
  carregarCidades(this.value);
});

document.getElementById('cidade').addEventListener('change', function() {
  carregarBairros(this.value);
});

const formCadastro = document.getElementById('cadastro');

formCadastro.addEventListener('submit', function(event) {
  event.preventDefault();
  if (validarCampos()) {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    
    const usuario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      senha: senha,
      endereco: endereco,
      numero: numero,
      uf: uf,
      cidade: cidade,
      bairro: bairro
    };
    
    enviarDadosUsuario(usuario);
  }
});

function validarCampos() {
  let camposValidos = true;
  const camposObrigatorios = document.querySelectorAll('[required]');
  
  camposObrigatorios.forEach(function(campo) {
    if (!campo.value) {
      campo.classList.add('is-invalid');
      campo.nextElementSibling.textContent = 'Este campo é obrigatório.';
      camposValidos = false;
    } else {
      campo.classList.remove('is-invalid');
      campo.nextElementSibling.textContent = '';
    }
  });
  
  return camposValidos;
}

function enviarDadosUsuario(usuario) {
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades', {
    method: 'POST',
    body: JSON.stringify(usuario)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}