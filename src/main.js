import "./style.css";

// Two «pages» on one app: /about is served by the SPA fallback — the test that deep links work on Cloudflare.
const pages = {
  "/": `<h1>🚀 نُشر من GitHub</h1><p>هذا الموقع بُني على خوادم GitHub ونُشر في Cloudflare تلقائياً عبر سوريانا.</p>
        <p class="en">Built on GitHub Actions, deployed to Cloudflare by Syriana — no server, no secret stored.</p>
        <a href="/about" data-link>عن الموقع ←</a>`,
  "/about": `<h1>عن هذا الموقع</h1><p>كل push إلى الفرع الرئيسي يُنشر وحده خلال دقائق.</p>
             <p>وقت البناء: <b>${import.meta.env.VITE_BUILD_TIME || new Date().toISOString()}</b></p>
             <a href="/" data-link>→ الرئيسية</a>`,
};

function render() {
  const html = pages[location.pathname] || `<h1>404</h1><p>الصفحة غير موجودة.</p><a href="/" data-link>الرئيسية</a>`;
  document.querySelector("#app").innerHTML = `<main>${html}</main><footer>syriana.store</footer>`;
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a) return;
  e.preventDefault();
  history.pushState({}, "", a.getAttribute("href"));
  render();
});
window.addEventListener("popstate", render);
render();
