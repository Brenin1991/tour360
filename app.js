document.addEventListener("DOMContentLoaded", function () {
  viewportUnitsBuggyfill.init();
  viewportUnitsBuggyfill.refresh();
});

document.querySelector("a-scene").addEventListener("loaded", function () {
  // Selecione o botão de tela cheia
  var fullscreenButton = document.querySelector(".a-enter-vr-button");

  // Verifique se o botão existe antes de tentar removê-lo
  if (fullscreenButton) {
    // Remova o botão de tela cheia
    fullscreenButton.style.display = "none";
  }
});
/*AFRAME.registerSystem("loading-screen", {
  init: function () {
    var loadingDiv = document.getElementById("loadingDiv");
    var loadingPercentage = document.getElementById("loadingPercentage");
    var totalAssets = document.querySelectorAll("a-asset-item, img").length; // Total de recursos a serem carregados
    var loadedAssets = 0;

    // Verifica se os recursos foram carregados
    function checkIfLoaded() {
      loadedAssets++;
      var percentage = Math.floor((loadedAssets / totalAssets) * 100);
      loadingPercentage.innerText = percentage + "%";

      if (loadedAssets >= totalAssets) {
        const loadingScreen = document.getElementById('loading');
        const content = document.getElementById('content');
      }
    }

    // Verifica quando os recursos são carregados
    document.querySelectorAll("a-asset-item, img").forEach(function (asset) {
      asset.addEventListener("loaded", checkIfLoaded);
    });
  },
});
*/

window.onload = function () {
  // Todas as imagens, vídeos e áudios foram carregados
  console.log("Página completamente carregada!");

  // Adicione aqui qualquer código que você queira executar após o carregamento completo da página.

  // Exemplo: ocultar um elemento de carregamento
  var loader = document.getElementById("loader");
  if (loader) {
    document.getElementById("loader").style.visibility = "hidden";
    document.getElementById("tela-inicio").style.display = "flex";
  }
};

var userAgent = navigator.userAgent;
const scenesJson = "scenes.json";
let scenes = [];
const cena = document.querySelector("#sceneElements");
const botaoInicar = document.querySelector("#btn-inicio");

let imagensGaleria = [];
let podeTrocar = true;
let imagemAtual = 0;

var materialVideo;
var materialSphere;
let contador = 0;

document
  .getElementById("popup-overlay-img")
  .classList.remove("overlay-horizontal");
document.getElementById("popup-overlay-img").classList.add("overlay-vertical");

var audio = document.getElementById("musica");
var botaoTocarMutar = document.getElementById("botaoTocarMutar");

function openTutorial() {
  document.getElementById("tela-tutorial-2").style.display = "flex";
  document.getElementById("tela-tutorial").style.display = "none";
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    document.getElementById("fixed-buttons-div").style.visibility = "hidden";
    document.getElementById("fixed-buttons-div-2").style.visibility = "hidden";
  }
}

function openTutorial2() {
  document.querySelector("#tela-tutorial").style.display = "flex";
            if (
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                userAgent
              )
            ) {
              document.getElementById("fixed-buttons-div").style.visibility =
                "hidden";
                document.getElementById("fixed-buttons-div-2").style.visibility =
                "hidden";
            }
            sobreposicao.style.pointerEvents = "auto";
}

// Adiciona um ouvinte de evento ao botão
botaoTocarMutar.addEventListener("click", function () {
  // Verifica se o áudio está tocando
  if (audio.muted) {
    // Se estiver pausado, toca e altera o texto do botão para 'Mutar'
    audio.muted = false;
    botaoTocarMutar.style.backgroundImage = 'url("assets/musica-on.png")';
  } else {
    // Se estiver tocando, pausa e altera o texto do botão para 'Tocar'
    audio.muted = true;

    botaoTocarMutar.style.backgroundImage = 'url("assets/musica-off.png")';
  }
});

let gyroscopeEnabled = true;

var botaoGiro = document.getElementById("botaoGiro");

botaoGiro.addEventListener("click", function () {
  toggleGyroscope();
});


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
  //document.getElementById("fixed-buttons-div").style.visibility =
  //  "hidden";
} else {
  botaoGiro.style.visibility =
  "hidden";
  document.getElementById("myCam").setAttribute("look-controls", "reverseMouseDrag", true);
}

function toggleGyroscope() {
  console.log("foi");
  const camera = document.getElementById("myCam");

  if (!camera) {
    console.error("Elemento da câmera não encontrado!");
    return;
  }

  if (gyroscopeEnabled) {
    // Desativar o giroscópio
    botaoGiro.style.backgroundImage = 'url("assets/GIRO-ativar.png")';
    camera.setAttribute("look-controls", "magicWindowTrackingEnabled", false);
  } else {
    // Ativar o giroscópio
    camera.setAttribute("look-controls", "magicWindowTrackingEnabled", true);
    botaoGiro.style.backgroundImage = 'url("assets/GIRO-desativar.png")';
  }

  gyroscopeEnabled = !gyroscopeEnabled;
}

function handleDeviceOrientation(event) {
  // Lidar com os dados do giroscópio aqui
  console.log("Gyro data:", event.alpha, event.beta, event.gamma);
}

var botaoInfoMusica = document.getElementById("botaoInfoMusica");
var infoMusica = document.getElementById("infoMusica");
var isOpenMusicInfo = false;
var timeoutId;

// Adiciona um ouvinte de evento ao botão
botaoInfoMusica.addEventListener("click", function () {
  //toggleGyroscope();
  if (isOpenMusicInfo === false) {
    infoMusica.style.display = "flex";
    botaoInfoMusica.style.backgroundImage = 'url("assets/informacao.png")';
    isOpenMusicInfo = true;

    // Configura o temporizador para fechar após 10 segundos
    timeoutId = setTimeout(function () {
      infoMusica.style.display = "none";
      botaoInfoMusica.style.backgroundImage =
        'url("assets/informacao-hover.png")';
      isOpenMusicInfo = false;
    }, 10000);
  } else {
    // Cancela o temporizador se o botão for clicado novamente
    clearTimeout(timeoutId);

    infoMusica.style.display = "none";
    botaoInfoMusica.style.backgroundImage =
      'url("assets/informacao-hover.png")';
    isOpenMusicInfo = false;
  }
});

//document.querySelector("a-scene").addEventListener("loaded", function () {
// Oculta a tela de carregamento quando a cena A-Frame é carregada

//});

function limitarTexto(texto) {
  if (texto.length > 250) {
    return texto.split(" ").slice(0, 40).join(" ") + "...";
  } else {
    return texto;
  }
}

function openPopup(i, t, titulo) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    document.getElementById("fixed-buttons-div").style.visibility = "hidden";
    document.getElementById("fixed-buttons-div-2").style.visibility = "hidden";
  }
  var img1 = document.getElementById(i);
  var img2 = document.getElementById("popup-img");
  var botaoLerMais = document.getElementById("botao-leia-mais");
  var botaoVoltar = document.getElementById("botao-voltar");
  var popupOverlay = document.getElementById("popup-overlay");
  var fechar = document.getElementById("fechar-botao");

  if (titulo.length > 1) {
    document.getElementById("popup-titulo").textContent = titulo;
  } else {
    document.getElementById("popup-titulo").textContent = "";
  }

  if (t.length > 250) {
    botaoLerMais.classList.remove("oculto");
  } else {
    botaoLerMais.classList.add("oculto");
  }

  var srcImg1 = img1.src;

  document.getElementById("carregando-popup").style.visibility = "visible";
  document.getElementById("base-galeria").style.visibility = "hidden";
  img2.style.visibility = "hidden";

  img2.onload = function () {
    img2.style.visibility = "visible";
    document.getElementById("carregando-popup").style.visibility = "hidden";
    document.getElementById("base-galeria").style.visibility = "visible";
    var galeria = document.getElementById("popup");
    if (img2.naturalWidth > img2.naturalHeight) {
      galeria.classList.remove("horizontal");
      galeria.classList.add("vertical");
      document
        .getElementById("popup-overlay-img")
        .classList.remove("overlay-vertical");
      document
        .getElementById("popup-overlay-img")
        .classList.add("overlay-horizontal");

      img2.classList.remove("galeria-img-vertical");
      img2.classList.add("galeria-img-horizontal");
    } else {
      galeria.classList.remove("vertical");
      galeria.classList.add("horizontal");

      img2.classList.remove("galeria-img-horizontal");
      img2.classList.add("galeria-img-vertical");

      document
        .getElementById("popup-overlay-img")
        .classList.remove("overlay-horizontal");
      document
        .getElementById("popup-overlay-img")
        .classList.add("overlay-vertical");
    }

    img2.style.display = "flex";
    botaoLerMais.classList.remove("oculto");
    botaoVoltar.classList.add("oculto");
    texto.textContent = textoLimitado;
    if (t.length > 250) {
      botaoLerMais.classList.remove("oculto");
    } else {
      botaoLerMais.classList.add("oculto");
    }

    const sobreposicao = document.getElementById("sobreposicao");
    sobreposicao.style.pointerEvents = "auto";
  };

  img2.src = srcImg1;

  var elemento = document.getElementById("popup");
  var texto = document.getElementById("popup-texto");

  const textoLimitado = limitarTexto(t);
  texto.textContent = textoLimitado;
  elemento.style.display = "flex";

  botaoLerMais.addEventListener("click", () => {
    img2.style.display = "none";
    botaoLerMais.classList.add("oculto");
    botaoVoltar.classList.remove("oculto");
    texto.textContent = t;

    document.getElementById("popup").classList.add("vertical");
    document.getElementById("popup").classList.remove("horizontal");
  });

  botaoVoltar.addEventListener("click", () => {
    img2.style.display = "flex";
    botaoLerMais.classList.remove("oculto");
    botaoVoltar.classList.add("oculto");
    texto.textContent = textoLimitado;

    openPopup(i, t, titulo);
  });

  img2.addEventListener("click", () => {
    popupOverlay.style.display = "flex";
    document.getElementById("popup-overlay-img").src = img2.src;
  });
}

function closePopup() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    document.getElementById("fixed-buttons-div").style.visibility = "visible";
    document.getElementById("fixed-buttons-div-2").style.visibility = "visible";
  }
  const sobreposicao = document.getElementById("sobreposicao");
  sobreposicao.style.pointerEvents = "none";
  var elemento = document.getElementById("popup");
  elemento.style.display = "none";
  console.log("fechar");
  document.querySelector("#tela-tutorial").style.display = "none";
  document.querySelector("#tela-tutorial-2").style.display = "none";
  closeGaleria();
}

function closePopupOverlay() {
  var elemento = document.getElementById("popup-overlay");
  elemento.style.display = "none";
  console.log("fechar");
}

function openGaleria(i) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    document.getElementById("fixed-buttons-div").style.visibility = "hidden";
  }
  imagemAtual = 0;
  imagensGaleria = [];
  imagensGaleria = i;
  contador = 0;
  trocarImagem(0);

  var elemento = document.getElementById("galeria");
  elemento.style.display = "flex";

  elemento.classList.remove("horizontal");
  elemento.classList.add("vertical");

  const sobreposicao = document.getElementById("sobreposicao");
  sobreposicao.style.pointerEvents = "auto";
}

function closeGaleria() {
  document.getElementById("bt-esquerdo").style.visibility = "visible";
  document.getElementById("bt-direito").style.visibility = "visible";
  const videoEl = document.querySelector("#galeria-video");
  const sobreposicao = document.getElementById("sobreposicao");
  sobreposicao.style.pointerEvents = "none";
  var elemento = document.getElementById("galeria");
  elemento.style.display = "none";
  videoEl.pause();
}

document.addEventListener("DOMContentLoaded", function () {
  const botaoFechar = document.querySelector(".fechar");
});

function audioVideo(video) {
  video.muted = !video.muted;
}

const tocarOuPausarVideo = (videoElement, botaoElement) => {
  if (videoElement && botaoElement) {
    videoElement.currentTime = 0;
    if (!videoElement.paused) {
      videoElement.pause();
      document.getElementById("01").play();
      document.getElementById("musica").play();
      botaoElement.setAttribute("src", "#video");
      materialVideo.opacity = 0;
    } else {
      videoElement.play();
      document.getElementById("01").pause();
      document.getElementById("musica").pause();
      botaoElement.setAttribute("src", "#stop");
      document.getElementById("musica").pause();
      materialVideo.opacity = 1;
    }
  } else {
    console.error("Erro ao procurar o vídeo.");
  }
};

const mutarOuDesmutarVideo = (videoElement, botaoElement) => {
  if ((videoElement, botaoElement)) {
    if (videoElement.muted) {
      videoElement.muted = false;
      botaoElement.setAttribute("src", "#audio");
      document.getElementById("musica").pause();
    } else {
      videoElement.muted = true;
      botaoElement.setAttribute("src", "#audio-off");
      document.getElementById("musica").play();
    }
  }
};

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function setPopupMobile() {}

function checkDevice() {}

botaoInicar.addEventListener("click", () => {
  iniciar();
  
});

function iniciar() {
  setTimeout(openTutorial2, 2000);
  document.getElementById("fixed-buttons-div").style.display = "flex";
  document.getElementById("01").play();
  const telaInicio = document.querySelector("#tela-inicio");

  document.getElementById("musica").play();
  document.getElementById("musica").volume = 0.2;

  telaInicio.style.display = "none";
  
}


function setUpModal() {}

function verificarOrientacao(image) {
  // Aguarde o carregamento completo da imagem antes de executar o código
  image.onload = function () {
    var galeria = document.getElementById("galeria");

    if (image.naturalWidth > image.naturalHeight) {
      galeria.classList.remove("horizontal");
      galeria.classList.add("vertical");
      document
        .getElementById("popup-overlay-img")
        .classList.remove("overlay-vertical");
      document
        .getElementById("popup-overlay-img")
        .classList.add("overlay-horizontal");

      image.classList.remove("galeria-img-vertical");
      image.classList.add("galeria-img-horizontal");
    } else {
      galeria.classList.remove("vertical");
      galeria.classList.add("horizontal");

      image.classList.remove("galeria-img-horizontal");
      image.classList.add("galeria-img-vertical");

      document
        .getElementById("popup-overlay-img")
        .classList.remove("overlay-horizontal");
      document
        .getElementById("popup-overlay-img")
        .classList.add("overlay-vertical");
    }
    document.getElementById("texto").style.visibility = "visible";
    document.querySelector("#galeria-img").style.visibility = "visible";
    document.getElementById("carregando-galeria").style.visibility = "hidden";
  };

  // Se a imagem já estiver carregada, execute a função imediatamente
  if (image.complete) {
    image.onload();
  }
}

function trocarImagem(passo) {
  document.getElementById("texto").classList.remove("openTexto");

  document.getElementById("texto").classList.add("closeTexto");

  document.getElementById("texto").style.visibility = "hidden";
  document.getElementById("carregando-galeria").style.visibility = "visible";

  imagemAtual += passo;
  contador = imagemAtual;

  var botaoVoltar = document.getElementById("botao-voltar-galeria");
  var botaoLerMais = document.getElementById("botao-leia-mais-galeria");

  if (imagemAtual <= 0) {
    document.getElementById("bt-esquerdo").style.visibility = "hidden";
    document.getElementById("bt-direito").style.visibility = "visible";
    //imagemAtual = imagensGaleria.length - 1;
  } else if (imagemAtual >= imagensGaleria.length - 1) {
    imagemAtual = imagensGaleria.length - 1;
    document.getElementById("bt-direito").style.visibility = "hidden";
    document.getElementById("bt-esquerdo").style.visibility = "visible";
  }
  else {
    document.getElementById("bt-esquerdo").style.visibility = "visible";
    document.getElementById("bt-direito").style.visibility = "visible";
  }

  const imagemEl = document.querySelector("#galeria-img");
  const videoEl = document.querySelector("#galeria-video");
  const nomeEl = document.querySelector("#galeria-titulo");
  const funcaoEl = document.querySelector("#galeria-texto");
  var popupOverlay = document.getElementById("popup-overlay");

  videoEl.pause();

  imagemEl.style.visibility = "hidden";

  console.log(imagensGaleria[imagemAtual].imagem);
  var img1 = document.getElementById(imagensGaleria[imagemAtual].imagem);

  const textoLimitado = limitarTexto(imagensGaleria[imagemAtual].texto);
  funcaoEl.innerText = textoLimitado;

  if (
    imagensGaleria[imagemAtual].imagem == "galeria-01" ||
    imagensGaleria[imagemAtual].imagem == "galeria-02" ||
    imagensGaleria[imagemAtual].imagem == "galeria-03" ||
    imagensGaleria[imagemAtual].imagem == "galeria-04" ||
    imagensGaleria[imagemAtual].imagem == "galeria-05" ||
    imagensGaleria[imagemAtual].imagem == "galeria-06" ||
    imagensGaleria[imagemAtual].imagem == "galeria-07" ||
    imagensGaleria[imagemAtual].imagem == "galeria-08"
  ) {
    imagemEl.classList.add("fixar-img");
    document.getElementById("texto").classList.add("fixar-texto");
  } else {
    imagemEl.classList.remove("fixar-img");
    document.getElementById("texto").classList.remove("fixar-texto");
  }

  botaoLerMais.classList.add("oculto");
  botaoVoltar.classList.add("oculto");
  if (img1 != null) {
    if (img1.complete) {
      if (imagensGaleria[imagemAtual].texto.length > 250) {
        botaoLerMais.classList.remove("oculto");
      } else {
        botaoLerMais.classList.add("oculto");
      }
    }

    if (img1.tagName && img1.tagName.toLowerCase() === "img") {
      document.getElementById("galeriaVideoAudio").style.visibility = "hidden";
      videoEl.style.display = "none";
      imagemEl.style.display = "block";
      var srcImg1 = img1.src;

      videoEl.pause();

      imagemEl.src = srcImg1;
      verificarOrientacao(imagemEl);

      botaoLerMais.addEventListener("click", () => {
        imagemEl.style.display = "none";
        botaoLerMais.classList.add("oculto");
        botaoVoltar.classList.remove("oculto");

        var galeria = document.getElementById("galeria");

        galeria.classList.remove("horizontal");
        galeria.classList.add("vertical");

        document.getElementById("texto").classList.add("openTexto");

        document.getElementById("texto").classList.remove("closeTexto");

        funcaoEl.innerText = imagensGaleria[imagemAtual].texto;
      });

      botaoVoltar.addEventListener("click", () => {
        if (imagensGaleria[imagemAtual].imagem.length > 1) {
          imagemEl.style.display = "flex";
        } else {
          imagemEl.style.display = "none";
        }
        botaoLerMais.classList.remove("oculto");
        botaoVoltar.classList.add("oculto");
        funcaoEl.innerText = textoLimitado;
        verificarOrientacao(imagemEl);

        document.getElementById("texto").classList.remove("openTexto");

        document.getElementById("texto").classList.add("closeTexto");
      });
    } else if (img1.tagName && img1.tagName.toLowerCase() === "video") {
      document.getElementById("galeriaVideoAudio").style.visibility = "visible";
      document.getElementById("carregando-galeria").style.visibility = "hidden";
      document.getElementById("texto").style.visibility = "visible";
      var srcImg1 = img1.src;
      videoEl.style.display = "block";
      imagemEl.style.display = "none";
      var galeria = document.getElementById("galeria");

      galeria.classList.remove("horizontal");
      galeria.classList.add("vertical");

      videoEl.src = srcImg1;

      videoEl.play();
      videoEl.muted = true;

      let galeriaVideoAudio = document.getElementById("galeriaVideoAudio");

      galeriaVideoAudio.addEventListener("click", () => {
        if (videoEl) {
          if (videoEl.muted) {
            videoEl.muted = false;
            galeriaVideoAudio.style.backgroundImage = 'url("assets/audio.png")';
            document.getElementById("musica").pause();
          } else {
            videoEl.muted = true;
            galeriaVideoAudio.style.backgroundImage = 'url("assets/audio-off.png")';
            document.getElementById("musica").play();
          }
        } 
      });

      botaoLerMais.addEventListener("click", () => {
        videoEl.style.display = "none";
        botaoLerMais.classList.add("oculto");
        botaoVoltar.classList.remove("oculto");
        var galeria = document.getElementById("galeria");

        galeria.classList.remove("horizontal");
        galeria.classList.add("vertical");

        funcaoEl.innerText = imagensGaleria[imagemAtual].texto;
      });

      botaoVoltar.addEventListener("click", () => {
        botaoLerMais.classList.remove("oculto");
        botaoVoltar.classList.add("oculto");
        funcaoEl.innerText = textoLimitado;
      });
    } else {
      document.getElementById("galeriaVideoAudio").style.visibility = "hidden";
      console.log("Este não é nem uma imagem nem um vídeo.");
    }
  } else {
    document.getElementById("galeriaVideoAudio").style.visibility = "hidden";
    var galeria = document.getElementById("galeria");
    document.getElementById("texto").style.visibility = "visible";
    funcaoEl.innerText = imagensGaleria[imagemAtual].texto;

    document.getElementById("texto").classList.add("openTexto");

    document.getElementById("texto").classList.remove("closeTexto");

    document.getElementById("carregando-galeria").style.visibility = "hidden";

    botaoLerMais.classList.add("oculto");

    galeria.classList.remove("horizontal");
    galeria.classList.add("vertical");

    videoEl.style.display = "none";
    imagemEl.style.display = "none";
  }

  nomeEl.innerText = imagensGaleria[imagemAtual].titulo;

  imagemEl.addEventListener("click", () => {
    popupOverlay.style.display = "flex";
    document.getElementById("popup-overlay-img").src = imagemEl.src;
  });
}

function setUpGalery() {}

function updateScene(sceneId) {
  if (sceneId == 6) {
    document.getElementById("02").currentTime = 0;
    document.getElementById("02").play();
  } else {
    document.getElementById("02").currentTime = 0;
    document.getElementById("02").pause();
  }

  console.log(scenes.scenes[sceneId].modelo);
  // Remover modelo atual
  const sky = document.querySelector("#modeloGltf");
  const ceu = document.querySelector("#imagem-360");
  sky.parentNode.removeChild(sky);

  // Criar novo elemento com o segundo modelo e adicioná-lo à cena
  var novoModelo = document.createElement("a-entity");
  novoModelo.setAttribute("gltf-model", "#" + scenes.scenes[sceneId].modelo);
  //novoModelo.setAttribute('id', 'modeloGltf');
  novoModelo.id = "modeloGltf";
  document.querySelector("a-scene").appendChild(novoModelo);

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    ceu.setAttribute(
      "src",
      "#" + scenes.scenes[sceneId].modelo + "-360-mobile"
    );
    console.log("Dispositivo Móvel");
  } else {
    ceu.setAttribute("src", "#" + scenes.scenes[sceneId].modelo + "-360");
    console.log("Desktop ou Dispositivo Desconhecido");
  }
  console.log(sceneId);
  //setTimeout(function() {
  setUpScene(sceneId);
}

var camera = document.getElementById("myCam");

// Configura o fator de zoom
var zoomFactor = 0.05;

// Limites para o campo de visão
var minFOV = 20;
var maxFOV = 100;
var initialDistance = 0;

camera.setAttribute("fov", 70);

// Adicionando os event listeners para toque (touch) em vez de roda (wheel)
var canvas = document.getElementById("myScene");
if (canvas) {
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchmove", handleTouchMove);
}

function handleTouchStart(event) {
  if (event.touches.length === 2) {
    initialDistance = getDistance(event.touches[0], event.touches[1]);
  }
}

function handleTouchMove(event) {
  if (event.touches.length === 2) {
    var currentDistance = getDistance(event.touches[0], event.touches[1]);
    var deltaDistance = initialDistance - currentDistance; // Invertido o sinal

    // Obtém o campo de visão atual da câmera
    var currentFOV = camera.components.camera.data.fov;

    // Calcula o novo valor do FOV com base na quantidade de rotação do gesto de pinça
    var newFOV = currentFOV + deltaDistance * zoomFactor;

    // Se o novo valor do FOV estiver fora dos limites, ajusta para o valor mais próximo dentro dos limites
    if (newFOV < minFOV) {
      newFOV = minFOV;
    } else if (newFOV > maxFOV) {
      newFOV = maxFOV;
    }

    // Atualiza o campo de visão da câmera
    camera.setAttribute("fov", newFOV);

    // Atualiza a distância inicial para a próxima iteração
    initialDistance = currentDistance;
  }
}

// Função auxiliar para calcular a distância entre dois pontos de toque
function getDistance(touch1, touch2) {
  var dx = touch1.clientX - touch2.clientX;
  var dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Adiciona um ouvinte de evento para o scroll do mouse
window.addEventListener("wheel", function (event) {
  // Obtém o campo de visão atual da câmera
  var currentFOV = camera.components.camera.data.fov;

  // Calcula o novo valor do FOV com base na quantidade de rotação do scroll
  var newFOV = currentFOV + event.deltaY * zoomFactor;

  // Se o novo valor do FOV estiver fora dos limites, ajusta para o valor mais próximo dentro dos limites
  if (newFOV < minFOV) {
    newFOV = minFOV;
  } else if (newFOV > maxFOV) {
    newFOV = maxFOV;
  }

  // Atualiza o campo de visão da câmera
  camera.setAttribute("fov", newFOV);
});

AFRAME.registerComponent("always-face-camera", {
  init: function () {
    // Defina a rotação inicial correta, se necessário
    this.el.object3D.rotation.set(0, 0, 0);

    // Defina o fator de escala fixo para manter o mesmo tamanho aparente
    this.fixedScaleFactor = 0.8; // Ajuste conforme necessário
  },
  tick: function () {
    const camera = document.querySelector("[camera]");
    const cameraPosition = camera.object3D.getWorldPosition(
      new THREE.Vector3()
    );

    // Atualize a rotação para sempre encarar a câmera
    this.el.object3D.lookAt(cameraPosition);

    // Configurar a rotação de volta para manter a escala original
    //this.el.object3D.rotation.x = 0;
    //this.el.object3D.rotation.y = 0;
    //this.el.object3D.rotation.z = 0;

    // Defina a escala com base no fator de escala fixo
    this.el.setAttribute("scale", {
      x: this.fixedScaleFactor,
      y: this.fixedScaleFactor,
      z: this.fixedScaleFactor,
    });
  },
});

AFRAME.registerComponent("hover-handler", {
  schema: {
    imagem: { type: "string", default: "hotspot" },
  },

  init: function () {
    var el = this.el;
    var imagemOriginal = "#" + this.data.imagem;
    el.setAttribute("src", imagemOriginal);

    el.addEventListener("mouseenter", function () {
      el.setAttribute(
        "src",
        "#" + el.components["hover-handler"].data.imagem + "-hover"
      );
    });

    el.addEventListener("mouseleave", function () {
      el.setAttribute("src", imagemOriginal);
    });
  },
});

function setUpScene(sceneId) {
  while (cena.firstChild) {
    cena.removeChild(cena.firstChild);
  }
  var modeloGltf = document.getElementById("modeloGltf");
  const hotspots = scenes.scenes[sceneId].hotspots;
  console.log(modeloGltf);

  modeloGltf.addEventListener("model-loaded", function () {
    var modelo = modeloGltf.getObject3D("mesh");
    let sphere = modelo.getObjectByName("Sphere");

    sphere.scale.set(0, 0, 0);

    // Iterar sobre a array de hotspots
    hotspots.forEach((hotspot, index) => {
      let itemHotspot = modelo.getObjectByName(hotspot.nome);

      if (itemHotspot) {
        // Criar um novo plano (neste caso, um a-image)
        var item = document.createElement("a-image");
        itemHotspot.scale.set(0, 0, 0);

        // Obter a posição do cubo e definir a mesma posição para o a-image
        item.object3D.position.copy(itemHotspot.position);
        item.setAttribute("class", hotspot.imagem);
        //item.setAttribute("src", "#" + hotspot.imagem);
        if (hotspot.tipo != "video-static" && hotspot.tipo != "video") {
          item.setAttribute("hover-handler", "imagem: " + hotspot.imagem);
        } else {
          item.setAttribute("src", "#" + hotspot.imagem);
        }

        item.setAttribute(
          "event-set__1",
          "_event: click; _target: #image; _delay: 300; material.src: #360-image-2"
        );
        item.setAttribute("event-set__2", "_event: mousedown; scale: 1 1 1");
        item.setAttribute("event-set__3", "_event: mouseup; scale: 1.2 1.2 1");

        if (hotspot.tipo === "info") {
          item.addEventListener("click", (event) => {
            event.preventDefault();
            let titulo = "";
            if (hotspot.info.titulo) {
              titulo = hotspot.info.titulo;
            }

            openPopup(hotspot.info.imagem, hotspot.info.texto, titulo);
          });
          item.setAttribute("scale", "0.8 0.8 0.8");
          if(hotspot.type === "float") {
            item.object3D.rotation.copy(itemHotspot.rotation);
          } else {
            item.setAttribute("always-face-camera", "");
          }

          cena.appendChild(item);
        }
        if (hotspot.tipo === "tutorial") {
          item.addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector("#tela-tutorial").style.display = "flex";
            if (
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                userAgent
              )
            ) {
              document.getElementById("fixed-buttons-div").style.visibility =
                "hidden";
                document.getElementById("fixed-buttons-div-2").style.visibility =
                "hidden";
            }
            sobreposicao.style.pointerEvents = "auto";
          });
          item.setAttribute("scale", "0.8 0.8 0.8");
          item.setAttribute("always-face-camera", "");

          cena.appendChild(item);
        }
        if (hotspot.tipo === "sala-lins") {
          item.addEventListener("click", (event) => {
            event.preventDefault();
            updateScene(hotspot.proximaCena.cena);
          });
          item.setAttribute("scale", "0.8 0.8 0.8");
          item.setAttribute("always-face-camera", "");

          cena.appendChild(item);
        }

        if (hotspot.tipo === "cena") {
          item.addEventListener("click", (event) => {
            event.preventDefault();
            updateScene(hotspot.proximaCena.cena);
          });
          item.object3D.rotation.copy(itemHotspot.rotation);

          cena.appendChild(item);
        }

        if (hotspot.tipo === "sala") {
          item.addEventListener("click", (event) => {
            event.preventDefault();
            updateScene(hotspot.proximaCena.cena);
          });
          item.object3D.rotation.copy(itemHotspot.rotation);

          cena.appendChild(item);
        }

        

        if (hotspot.tipo === "marcador") {
         // item.addEventListener("click", (event) => {
          //  event.preventDefault();
         //   //updateScene(hotspot.proximaCena.cena);
        //  });
          item.setAttribute("scale", "-3 1 1");
          item.object3D.rotation.copy(itemHotspot.rotation);

          cena.appendChild(item);
        }

        if (hotspot.tipo === "link") {
          item.setAttribute("scale", "0.8 0.8 0.8");
          item.setAttribute("scale", "0.8 0.8 0.8");
          item.addEventListener("click", (event) => {
            event.preventDefault();
            window.open(hotspot.link.url, "_blank");
          });
          item.setAttribute("always-face-camera", "");
          cena.appendChild(item);
        }

        if (hotspot.tipo === "video-static") {
          item.setAttribute("scale", "0.8 0.8 0.8");
          let itemHotspot = modelo.getObjectByName();
          if(hotspot.type === "float") {

          } else {
            item.setAttribute("always-face-camera", "");
          }
          

          var video = document.getElementById(hotspot.video.video);

          item.removeEventListener("mousedown", () =>
            mutarOuDesmutarVideo(video, item)
          );
          item.addEventListener("mousedown", () =>
            mutarOuDesmutarVideo(video, item)
          );

          modeloGltf.object3D.traverse(function (node) {
            if (node.isMesh && node.name === hotspot.video.nome) {
              var texture = new THREE.VideoTexture(
                document.getElementById(hotspot.video.video)
              );
              texture.wrapS = THREE.RepeatWrapping;
              texture.repeat.x = -1;
              var material = new THREE.MeshBasicMaterial({ map: texture });

              node.material = material;
            }
          });

          item.setAttribute("src", "#audio-off");

          cena.appendChild(item);
        }

        if (hotspot.tipo === "galeria") {
          item.setAttribute("scale", "0.8 0.8 0.8");
          item.addEventListener("click", (event) => {
            event.preventDefault();

            openGaleria(hotspot.galeria.imagens);
          });
          item.setAttribute("always-face-camera", "");

          cena.appendChild(item);
        }

        if (hotspot.tipo === "video") {
          item.setAttribute("scale", "0.8 0.8 0.8");
          //let itemHotspot = modelo.getObjectByName();
          

          var video = document.getElementById(hotspot.video.video);

          video.pause();
          video.currentTime = 0;

          item.removeEventListener("mousedown", () =>
            tocarOuPausarVideo(video, item)
          );
          item.addEventListener("mousedown", () =>
            tocarOuPausarVideo(video, item)
          );

          modeloGltf.object3D.traverse(function (node) {
            if (node.isMesh && node.name === hotspot.video.nome) {
              var texture = new THREE.VideoTexture(
                document.getElementById(hotspot.video.video)
              );
              texture.wrapS = THREE.RepeatWrapping;
              texture.repeat.x = -1;
              materialVideo = new THREE.MeshBasicMaterial({ map: texture });
              materialVideo.transparent = true; // Permite a transparência
              materialVideo.opacity = 0;

              node.material = materialVideo;
            }
          });

          if(hotspot.type === "float") {
            item.object3D.rotation.copy(itemHotspot.rotation);
          } else {
            item.setAttribute("always-face-camera", "");
          }
          cena.appendChild(item);
        }
      }
    });
  });
}

function loadJson() {
  fetch(scenesJson)
    .then((response) => response.json()) // Transforma a resposta em um objeto JSON
    .then((data) => {
      console.log(data); // Faça algo com os dados JSON, como imprimir no console
      scenes = data;
      setUpScene(0);
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao buscar o JSON:", error);
    });
}

setUpModal();
setUpGalery();
loadJson();

document.getElementById("fechar-botao").addEventListener("click", function () {
  // Coloque aqui o código que deseja executar quando o botão for clicado
  closePopup();
});
document
  .getElementById("fechar-botao-overlay")
  .addEventListener("click", function () {
    // Coloque aqui o código que deseja executar quando o botão for clicado
    closePopupOverlay();
  });

document.getElementById("bt-direito").addEventListener("click", function () {
  trocarImagem(1);
});

document.getElementById("bt-esquerdo").addEventListener("click", function () {
  trocarImagem(-1);
});

botaoTocarMutar.style.backgroundImage = 'url("assets/musica-off.png")';
botaoTocarMutar.style.backgroundImage = 'url("assets/musica-on.png")';

galeriaVideoAudio.style.backgroundImage = 'url("assets/audio.png")';
galeriaVideoAudio.style.backgroundImage = 'url("assets/audio-off.png")';



botaoInfoMusica.style.backgroundImage = 'url("assets/informacao.png")';
botaoInfoMusica.style.backgroundImage = 'url("assets/informacao-hover.png")';

//});

///////////////////////////////////////// MOBILE OR DESKTOP /////////////////////////////////////////////////
