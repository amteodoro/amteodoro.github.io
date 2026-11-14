/* Signature: the portrait is briefly corrupted with Gaussian noise and then
   restored, and hovering shows the noisy observation under a lens.
   It is the problem my PhD was about (y = x + n, recover x).
   Purely decorative: the <img> underneath is always the real content. */
(function () {
  "use strict";
  const box = document.querySelector(".spec-photo");
  const img = box && box.querySelector("img");
  if (!box || !img || !window.HTMLCanvasElement) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const N = 360;            // working resolution (px)
  const SIGMA = 58;         // peak noise standard deviation (0-255 scale)
  const LENS = 0.34;        // lens size as a fraction of the photo

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = N;
  canvas.className = "spec-noise";
  canvas.setAttribute("aria-hidden", "true");
  const cap = document.createElement("span");
  cap.className = "spec-cap";
  cap.setAttribute("aria-hidden", "true");
  const REST = "FIG. 1 · DENOISING, MY PHD TOPIC";
  cap.textContent = REST;

  let ctx, base, noise, out, ready = false;

  function prepare() {
    if (ready) return true;
    try {
      ctx = canvas.getContext("2d", { willReadFrequently: false });
      // cover-crop the source into the square working canvas
      const s = Math.min(img.naturalWidth, img.naturalHeight);
      ctx.drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, 0, 0, N, N);
      base = ctx.getImageData(0, 0, N, N);
      out = ctx.createImageData(N, N);
      noise = new Float32Array(N * N);
      for (let i = 0; i < noise.length; i++) {
        // Box-Muller: standard normal samples
        const u = 1 - Math.random(), v = Math.random();
        noise[i] = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      }
      ready = true;
    } catch (_) { ready = false; }
    return ready;
  }

  // Draw the photo with noise of the given sigma inside rect (or everywhere).
  function draw(sigma, rect) {
    const b = base.data, o = out.data;
    const x0 = rect ? rect.x : 0, y0 = rect ? rect.y : 0;
    const x1 = rect ? rect.x + rect.s : N, y1 = rect ? rect.y + rect.s : N;
    for (let y = 0, p = 0, k = 0; y < N; y++) {
      const inY = y >= y0 && y < y1;
      for (let x = 0; x < N; x++, p += 4, k++) {
        const n = inY && x >= x0 && x < x1 ? noise[k] * sigma : 0;
        o[p] = b[p] + n; o[p + 1] = b[p + 1] + n; o[p + 2] = b[p + 2] + n; o[p + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
    if (rect) {
      ctx.lineWidth = 2; ctx.strokeStyle = "#0e0d0a";
      ctx.strokeRect(rect.x + 1, rect.y + 1, rect.s - 2, rect.s - 2);
    }
  }

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  let raf = 0;

  function play() {
    if (!prepare()) return;
    cancelAnimationFrame(raf);
    canvas.style.clipPath = "none";
    box.classList.add("is-noisy");
    const IN = 160, HOLD = 140, OUT = 950;
    const t0 = performance.now();
    (function frame(now) {
      const t = now - t0;
      let s;
      if (t < IN) s = SIGMA * (t / IN);
      else if (t < IN + HOLD) s = SIGMA;
      else s = SIGMA * (1 - easeOut(Math.min(1, (t - IN - HOLD) / OUT)));
      draw(s);
      cap.textContent = "DENOISING · σ " + String(Math.round(s)).padStart(2, "0");
      if (t < IN + HOLD + OUT) raf = requestAnimationFrame(frame);
      else { box.classList.remove("is-noisy"); cap.textContent = REST; }
    })(t0);
  }

  function lens(e) {
    if (!prepare()) return;
    cancelAnimationFrame(raf);
    const r = box.getBoundingClientRect();
    const s = Math.round(N * LENS);
    const cx = ((e.clientX - r.left) / r.width) * N, cy = ((e.clientY - r.top) / r.height) * N;
    const x = Math.max(0, Math.min(N - s, Math.round(cx - s / 2)));
    const y = Math.max(0, Math.min(N - s, Math.round(cy - s / 2)));
    draw(SIGMA, { x, y, s });
    // Show the canvas only inside the lens so the full-resolution photo stays crisp around it.
    const pc = (v) => (v / N * 100).toFixed(2) + "%";
    canvas.style.clipPath = `inset(${pc(y)} ${pc(N - x - s)} ${pc(N - y - s)} ${pc(x)})`;
    box.classList.add("is-noisy");
    cap.textContent = "y = x + n · σ " + SIGMA + " · NOISY INPUT";
  }

  function start() {
    box.append(canvas, cap);
    if (canHover) {
      box.addEventListener("pointermove", lens);
      box.addEventListener("pointerleave", () => { box.classList.remove("is-noisy"); cap.textContent = REST; });
    }
    if (reduced) return;
    // Once per browser session: a signature, not a tax on every visit.
    let seen = false;
    try { seen = sessionStorage.getItem("amt-sig") === "1"; sessionStorage.setItem("amt-sig", "1"); } catch (_) {}
    if (!seen && document.body.dataset.view !== "terminal") play();
  }

  if (img.complete && img.naturalWidth) start();
  else img.addEventListener("load", start, { once: true });
})();
