var carregando = false; // indica se uma requisição Ajax está em andamento

//chama a função quando a página carrega
window.onload = function(){
    carregarImagens();
}


function carregarImagens() {
    //se a requisição estiver em andamento, não executa
    if (carregando) {
        return;
    }
    
    //define que a função está carregando
    carregando = true;
    //cria objeto to tipo xml http request
    var ajax = new XMLHttpRequest();
    //usa o método open do objeto para configuarar a request
    ajax.open('GET', 'animals.json', true);
    //chama a função quando a página muda de estado
    ajax.onreadystatechange = function() {
        //se pegar página com sucesso
        if (ajax.readyState == 4 && ajax.status == 200) {
            //transforma o json em um vetor de strings
            var images = JSON.parse(ajax.responseText);
            //acessa a div images
            var divImagens = document.getElementById("images");
            //loopa no vetor
            for (var image of images.animals) {
                //cria elemento html img
                var img = document.createElement("img");
                //atribui a url ao src
                img.src = image.imagemUrl;
                //atribui o nome ao texto alternativo
                img.alt = image.name;
                //adiciona elemento criado na div
                divImagens.appendChild(img);
            }
            //define que a request terminou de carregar
            carregando = false;
        } 
    }
    //evia request
    ajax.send();
};

// detecta quando o usuário chegou no final da página e carrega mais imagens
window.onscroll = function (ev){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        carregarImagens();
    }
};