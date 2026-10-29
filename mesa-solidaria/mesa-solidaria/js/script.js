// Menu responsivo
const menuBtn = document.getElementById("menu-btn");
const menuLista = document.getElementById("menu-lista");
if (menuBtn && menuLista) {
  menuBtn.addEventListener("click", () => {
    menuLista.classList.toggle("aberto");
  });
}

const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

document.querySelectorAll("[data-contar]").forEach((el) => {
  const alvo = Number(el.dataset.contar);
  let atual = 0;
  const passo = Math.max(1, Math.ceil(alvo / 60));
  const timer = setInterval(() => {
    atual += passo;
    if (atual >= alvo) {
      atual = alvo;
      clearInterval(timer);
    }
    el.textContent = atual.toLocaleString("pt-BR");
  }, 25);
});

const calc = document.getElementById("calc-form");
if (calc) {
  calc.addEventListener("submit", (e) => {
    e.preventDefault();
    const kg = Number(document.getElementById("kg").value);
    const saida = document.getElementById("calc-resultado");
    if (!kg || kg <= 0) {
      saida.textContent = "Informe uma quantidade válida de alimentos.";
      return;
    }
    const refeicoes = kg * 2;
    const familias = Math.ceil(refeicoes / 12);
    saida.textContent =
      `${kg} kg rendem cerca de ${refeicoes} refeições e ajudam aproximadamente ${familias} família(s).`;
  });
}
function validarFormulario(formId, sucessoId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    form.querySelectorAll("[data-obrigatorio]").forEach((campo) => {
      const erro = campo.parentElement.querySelector(".erro");
      let msg = "";
      const valor = campo.value.trim();

      if (!valor) {
        msg = "Campo obrigatório.";
      } else if (campo.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        msg = "Digite um e-mail válido.";
      } else if (campo.dataset.tipo === "telefone" && valor.replace(/\D/g, "").length < 10) {
        msg = "Digite um telefone com DDD.";
      }

      if (erro) erro.textContent = msg;
      if (msg) valido = false;
    });

    const sucesso = document.getElementById(sucessoId);
    if (valido) {
      sucesso.style.display = "block";
      form.reset();
    } else {
      sucesso.style.display = "none";
    }
  });
}

validarFormulario("form-voluntario", "sucesso-voluntario");
validarFormulario("form-contato", "sucesso-contato");
