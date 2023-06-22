const apiUrl = "https://rickandmortyapi.com/api/character";
//puxando as divs principais
const PersonagensContainer = document.getElementById("charactersContainer")// page primaria / secundaria
const PageInfo = document.getElementById("detailPage") // Background page secundaria
const Background_Header = document.getElementById("Background_Header") //Background parte superior
const header = document.getElementById("Header") // Parte superior fixa

    //Requisição Personagens
    function getPersonagens() {
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          const Personagens = data.results
          ExibirCardPerso(Personagens)
        })
        //Exibir qual o erro
        .catch(error => {
          console.log("Ocorreu um erro ao obter os personagens:", error)
        });
    }

    //Function Grid Personagens
    function ExibirCardPerso(Personagens) {
      //puxa info do fech
      Personagens.forEach(Personagens => {
        
        //Cria div de cards Page primaria 
        const PersoDIV = document.createElement("div")
        PersoDIV.classList.add("character")

        //IMG
        const CardImage = document.createElement("img")
        CardImage.src = Personagens.image;
        CardImage.alt = Personagens.name;
        //INFO
        const CardInfo = document.createElement("div")
        CardInfo.classList.add("character-info")
        //NAME
        const PersoName = document.createElement("h2")
        PersoName.classList.add("character-name")
        PersoName.textContent = Personagens.name
        //ORIGIN
        const PersoOrigin = document.createElement("p")
        PersoOrigin.classList.add("character-origin")
        PersoOrigin.textContent = `Origin: ${Personagens.origin.name}`
    

        //Anexar Info Filha
        CardInfo.appendChild(PersoName)
        CardInfo.appendChild(PersoOrigin)

        PersoDIV.appendChild(CardImage)
        PersoDIV.appendChild(CardInfo)


        PersonagensContainer.appendChild(PersoDIV)       
        //evento de click para chamar função de exibir page secundaria dos personagens
        PersoDIV.addEventListener("click", () => {
          ExibirInfoPerso(Personagens);
          header.style.width = '390px';
          Background_Header.textContent = `Personagem: ${Personagens.id}`
          header.style.width = "100%"
          PageInfo.style.height = "93.8vh"
          PageInfo.style.backgroundImage = "none" 
  
         //const URL clicada
        const imagemURL = Personagens.image;
    
        //chamada function obter cor
        obterCorPredominante(imagemURL)
          .then((corPredominante) => {
            PageInfo.style.backgroundColor = corPredominante;
          })
          .catch((error) => {
            console.error('Ocorreu um erro: ', error);
          });
        
        });
        
      });
  }

    // Função para exibir a página de detalhes do personagem
    function ExibirInfoPerso(Personagens) {
      //Display none para sobrepor page 1 com background page 2
      PersonagensContainer.style.display = "none"
      PageInfo.innerHTML = ""

//INFO
      //IMG
      const detailImage = document.createElement("img")
      detailImage.src = Personagens.image
      detailImage.alt = Personagens.name

      //Info
      const detailInfo = document.createElement("div")
      detailInfo.classList.add("character-info")
      //name
      const detailName = document.createElement("h2")
      detailName.classList.add("character-name")
      detailName.textContent = Personagens.name
      //ogrigin
      const detailOrigin = document.createElement("p")
      detailOrigin.classList.add("character-origin")
      detailOrigin.textContent = `Origin: ${Personagens.origin.name}`
      //gender
      const gender = document.createElement("p")
      gender.classList.add("gender-Perso")
      gender.textContent = "gender:"+ Personagens.gender
      //Status
      const Status = document.createElement("p")
      Status.classList.add("Status-Perso")
      Status.textContent = "Status:"+ Personagens.status
      //Location
      const LocationPerson = document.createElement("p")
      LocationPerson.classList.add("character-origin")
      LocationPerson.textContent = `Locale: ${Personagens.location.name}`
      //Type
      const TypePerson = document.createElement("p")
      TypePerson.classList.add("character-origin")
      TypePerson.textContent = `Type: ${Personagens.Type}`

      //Button voltar para page principal
      const backButton = document.createElement("a")
      backButton.href = "#"
      backButton.classList.add("back-button")
      backButton.textContent = "Voltar aos personagens"
      //evento de click para requisição
      backButton.addEventListener("click", () => {
        PersonagensContainer.style.display = "grid"
        PageInfo.innerHTML = ""
        window.location.reload(true);
      });

      //Anexar Info Filha
      detailInfo.appendChild(detailName)
      detailInfo.appendChild(detailOrigin)
      detailInfo.appendChild(Status)
      detailInfo.appendChild(LocationPerson)
      detailInfo.appendChild(TypePerson)
      detailInfo.appendChild(gender)

      PageInfo.appendChild(detailImage)
      PageInfo.appendChild(detailInfo)
      PageInfo.appendChild(backButton)

}


    // Chamada de personagens
    getPersonagens()

    //Function obter cor IMG com node-vibrant 
    function obterCorPredominante(imagemURL) {
      return new Promise((resolve, reject) => {
        Vibrant.from(imagemURL)
          .getPalette()
          .then((palette) => {
            const corPredominante = palette.Vibrant.getHex();
            resolve(corPredominante);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }