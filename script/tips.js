/**
 * Iron Tipping — Scripts de cópia rápida
 * Gerencia os botões "Copiar" da página tips.html
 */

/* ---------- utilitário ---------- */
function copiar(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[IronTipping] Elemento #${id} não encontrado`);
    return;
  }
  el.select();
  el.setSelectionRange(0, 99999);
  navigator.clipboard
    .writeText(el.value)
    .then(() => window.alert("Copiado"))
    .catch((err) => {
      console.error("[IronTipping] Falha ao copiar:", err);
      window.alert("Não foi possível copiar");
    });
}

/* ---------- exposto globalmente para os buttons onclick ---------- */
window.tip1 = () => copiar("tip1");
window.tip2 = () => copiar("tip2");
window.tip3 = () => copiar("tip3");
window.tip4 = () => copiar("tip4");
window.tip5 = () => copiar("tip5");
window.tip7 = () => copiar("tip7");
