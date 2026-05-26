const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const profileResults = document.querySelector(".profile-results");

const BASE_URL = "https://api.github.com";

btnSearch.addEventListener("click", async () => {
    const userName = inputSearch.value;

    if (userName) {
        try {
            // Mostrar estado de carregamento enquanto a requisição está em andamento
            profileResults.innerHTML =
                '<div class="loading">Carregando...</div>';

            // Aqui você pode adicionar a lógica para usar o valor do input
            const response = await fetch(`${BASE_URL}/users/${userName}`);

            if (!response.ok) {
                // Esconder carregamento e notificar
                profileResults.innerHTML = "";
                alert(
                    "Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente",
                );
                return;
            }

            const userData = await response.json();
            console.log(userData);
            // Substitui o estado de carregamento pelo conteúdo do perfil
            profileResults.innerHTML = `
        <div class="profile-card">
            <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
            <div class="profile-info">
                <h2>${userData.name}</h2>
                <p>${userData.bio || "Sem biografia disponível 😢."}</p>
            </div>
        </div>`;
        } catch (error) {
            console.error("Erro ao buscar o perfil do usuário:", error);
            // Esconder carregamento em caso de erro
            profileResults.innerHTML = "";
            alert(
                "Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente mais tarde",
            );
        }
    } else {
        alert("Por favor, digite um nome de usuário do GitHub.");
    }
});
