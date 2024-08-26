document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".btn");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    // Função para salvar o estado das checkboxes no localStorage
    function saveCheckboxState() {
        checkboxes.forEach((checkbox, index) => {
            localStorage.setItem(`checkbox-${index}`, checkbox.checked);
        });
    }

    // Função para carregar o estado das checkboxes do localStorage
    function loadCheckboxState() {
        checkboxes.forEach((checkbox, index) => {
            const savedState = localStorage.getItem(`checkbox-${index}`);
            checkbox.checked = savedState === "true";
        });
    }

    // Função para verificar se alguma seção tem todas as checkboxes marcadas
    function isAnySectionComplete() {
        const sections = document.querySelectorAll(".container");
        return Array.from(sections).some(section => {
            const sectionCheckboxes = section.querySelectorAll("input[type='checkbox']");
            return Array.from(sectionCheckboxes).every(checkbox => checkbox.checked);
        });
    }

    // Função para limpar as checkboxes da(s) seção(ões) completa(s)
    function clearCompletedSections() {
        const sections = document.querySelectorAll(".container");
        sections.forEach(section => {
            const sectionCheckboxes = section.querySelectorAll("input[type='checkbox']");
            const allChecked = Array.from(sectionCheckboxes).every(checkbox => checkbox.checked);
            if (allChecked) {
                sectionCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    const index = Array.from(checkboxes).indexOf(checkbox);
                    localStorage.setItem(`checkbox-${index}`, false);
                });
            }
        });
    }

    // Carrega o estado das checkboxes ao carregar a página
    loadCheckboxState();

    // Salva o estado das checkboxes ao mudar
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            saveCheckboxState();
        });
    });

    // Adiciona evento de clique aos botões "Concluir"
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            if (isAnySectionComplete()) {
                alert("Treino concluído");
                clearCompletedSections();
            } else {
                alert("Faltam exercícios");
            }
        });
    });
});
