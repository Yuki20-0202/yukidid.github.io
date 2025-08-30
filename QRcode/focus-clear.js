document.querySelectorAll(".mokuzi a").forEach(link => {
  function handleScroll(e) {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();

      link.classList.add("active-highlight");

      setTimeout(() => {
        smoothScrollToByHref(href, 1600);
        history.replaceState(null, null, href);
      }, 100); // 少しだけ待ってからスクロール開始

      setTimeout(() => {
        link.classList.remove("active-highlight");
        link.blur();
      }, 1800); // 線を消すタイミング
    }
  }

  // スマホ & PC 両対応
  link.addEventListener("touchend", handleScroll);
  link.addEventListener("click", handleScroll);
});

function smoothScrollToByHref(href, duration = 1600) {
  const target = document.querySelector(href);
  const realTarget = target?.nextElementSibling || target;

  if (!realTarget) return;

  // h1の高さ＋余白分を加算
  const header = document.querySelector("h1");
  const headerOffset = (header ? header.offsetHeight : 96) + 32; // 16px余白（お好みで調整）
  const targetY = realTarget.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  const startY = window.pageYOffset;
  const startTime = performance.now();

  function scroll() {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
    window.scrollTo(0, startY + (targetY - startY) * ease);

    if (progress < 1) requestAnimationFrame(scroll);
  }

  requestAnimationFrame(scroll);
}
