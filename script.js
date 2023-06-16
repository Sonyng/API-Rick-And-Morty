const apiUrl = "https://rickandmortyapi.com/api/character";
//puxando as divs principais
const PersonagensContainer = document.getElementById("charactersContainer");
const PageInfo = document.getElementById("detailPage");
const Background_Header = document.getElementById("Background_Header")
const header = document.getElementById("Header")

    //Requisição Personagens
    function getPersonagens() {
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          const Personagens = data.results
          ExibirCardPerso(Personagens)
          console.log(Personagens)
        })
        //Exibir qual o erro
        .catch(error => {
          console.log("Ocorreu um erro ao obter os personagens:", error)
        });
    }



    //Function Grid Personagens
    function ExibirCardPerso(Personagens) {
      Personagens.forEach(Personagens => {
        //Cria div de cards
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
        //evento de click para chamar função de exibir detalhes do personagem
        PersoDIV.addEventListener("click", () => {
          ExibirInfoPerso(Personagens);
          header.style.width = '100%';
          Background_Header.textContent = `Personagem: ${Personagens.id}`
  
    
        });

        PersonagensContainer.appendChild(PersoDIV);
      });
    }


    // Função para exibir a página de detalhes do personagem
    function ExibirInfoPerso(Personagens) {
      //cria espaço page fora do principal
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
      backButton.textContent = "Back to Characters"
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




    