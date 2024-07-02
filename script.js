const candidatos = [
    { nome: "Candidato 1", foto: "" },
    { nome: "Candidato 2", foto: "" },
    { nome: "Candidato 3", foto: "" }
];

const votos = { brancos: 0, nulos: 0 };

let eleitores = document.querySelector('#num-eleitores').value;

// Inicializa os votos dos candidatos
candidatos.forEach(candidato => votos[candidato.nome] = 0);

const container = document.querySelector('#candidatos-container');

// Cria as seções de cada candidato com suas fotos e botão de votação
candidatos.forEach(candidato => {
    const candidatoDiv = document.createElement('div');
    candidatoDiv.classList.add('candidato');

    const img = document.createElement('img');
    img.src = candidato.foto;
    img.alt = candidato.nome;

    const nome = document.createElement('h3');
    nome.innerText = candidato.nome;

    const button = document.createElement('button');
    button.innerText = "Votar";
    button.classList.add('voto-candidato');
    button.setAttribute('data-candidato', candidato.nome);

    candidatoDiv.appendChild(img);
    candidatoDiv.appendChild(nome);
    candidatoDiv.appendChild(button);
    container.appendChild(candidatoDiv);
});

let votosTotais = 0;

function votar(tipo) {
    if (votosTotais < eleitores) {
        votos[tipo]++;
        votosTotais++;
    } else {
        alert("Todos os eleitores já votaram.");
    }
}

document.querySelectorAll('.voto-candidato').forEach(button => {
    button.addEventListener('click', function() {
        const candidato = this.getAttribute('data-candidato');
        votar(candidato);
    });
});

document.querySelector('.voto-branco').addEventListener('click', function() {
    votar('brancos');
});

document.querySelector('.voto-nulo').addEventListener('click', function() {
    votar('nulos');
});

document.querySelector('#finalizar-votacao').addEventListener('click', function() {
    const resumoContainer = document.querySelector('#resumo-container');
    resumoContainer.style.display = 'block';

    const totalVotosValidos = votosTotais - votos.brancos - votos.nulos;

    let vencedor = "";
    let maxVotos = 0;
    const percentuais = [];

    candidatos.forEach(candidato => {
        if (votos[candidato.nome] > maxVotos) {
            maxVotos = votos[candidato.nome];
            vencedor = candidato.nome;
        }
        const percentual = ((votos[candidato.nome] / votosTotais) * 100).toFixed(2);
        percentuais.push(`${candidato.nome}: ${percentual}%`);
    });

    const percentualBrancos = ((votos.brancos / votosTotais) * 100).toFixed(2);
    const percentualNulos = ((votos.nulos / votosTotais) * 100).toFixed(2);

    document.querySelector('#candidato-vencedor').innerText = `Candidato Vencedor: ${vencedor}`;
    document.querySelector('#percentuais-votos').innerText = `Percentual de votos por candidato: ${percentuais.join(", ")}`;
    document.querySelector('#percentuais-brancos-nulos').innerText = `Percentual de votos em branco: ${percentualBrancos}%, Percentual de votos nulos: ${percentualNulos}%`;
});

// Atualiza o número de eleitores
document.querySelector('#num-eleitores').addEventListener('input', function() {
    eleitores = this.value;
});