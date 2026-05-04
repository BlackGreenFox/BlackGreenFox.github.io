/* ============================================================
 * BlackGreenFox — green retro outer page + authentic Win98 desktop.
 * Single-file React 17 + Babel-standalone.
 * ============================================================ */

const { useState, useRef, useEffect, useCallback, useMemo } = React;

const GH_USER = 'BlackGreenFox';

/* ============================================================
 * 1. PIXEL ART LIBRARY (inline SVGs)
 * ============================================================ */

const makePixelSvg = (rows, palette) => {
  const w = rows[0].length;
  const h = rows.length;
  const rects = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = rows[y][x];
      const color = palette[c];
      if (!color) continue;
      rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" style="image-rendering:pixelated;width:100%;height:100%;">${rects.join('')}</svg>`;
};

/* hero-page fox (green retro look) */
const HERO_PALETTE = { '.': null, '#': '#082108', 'G': '#33ff66', 'W': '#0a1f0a', 'B': '#aaff00' };
const HERO_ROWS = [
  '................................',
  '................................',
  '......##..................##....',
  '.....####................####...',
  '....#####................#####..',
  '....#GGG##..............##GGG#..',
  '....#GGGG##............##GGGG#..',
  '....#GGGGG##..........##GGGGG#..',
  '....##GGGGGG#........#GGGGGG##..',
  '.....##GGGGGGGGGGGGGGGGGGG##....',
  '.......#GGGGGGGGGGGGGGGGG#......',
  '.......#GGGGGGGGGGGGGGGGG#......',
  '......#GGG#WWW#GGGG#WWW#GG#.....',
  '......#GG#WWWW#GGGG#WWWW#G#.....',
  '......#GG#WWWW#GGGG#WWWW#G#.....',
  '......#GGG#WW#GGGGGG#WW#GG#.....',
  '......#GGGGGGGGGGGGGGGGGGG#.....',
  '......#GGGGGG##BBBB##GGGGG#.....',
  '.......#GGGGG#BBBBBB#GGGG#......',
  '........#GGGGG#BBBB#GGGG#.......',
  '.........#GGGGGGGGGGGGG#........',
  '..........#GGGGGGGGGGG#.........',
  '...........#GGGGGGGGG#..........',
  '............#GGGGGGG#...........',
  '.............#GGGGG#............',
  '..............#GGG#.............',
  '...............###..............',
  '...............#.#..............',
  '...............#.#..............',
  '..............##.##.............',
  '................................',
  '................................',
];
const HERO_SVG = makePixelSvg(HERO_ROWS, HERO_PALETTE);

/* small desktop-icon fox (status bar) */
const FOX_TINY = makePixelSvg([
  '................',
  '...##........##.',
  '..####......####',
  '..#GGG#....#GGG#',
  '..#GGGG#..#GGGG#',
  '...#GGGGGGGGGG#.',
  '....#GGGGGGGG#..',
  '....#GWGGGGWG#..',
  '....#GWGGGGWG#..',
  '.....#GGBBGG#...',
  '.....#GGGGGG#...',
  '......#GGGG#....',
  '.......####.....',
  '........##......',
  '................',
  '................',
], { '.': null, '#': '#0a1f0a', 'G': '#33ff66', 'W': '#c8ffd1', 'B': '#aaff00' });

/* -- Desktop icons (32x32 chunky, Win98-style) -- */

const ICON_BHOLE = makePixelSvg([
  '................................',
  '................................',
  '..........AAAAAAAAAAAA..........',
  '........AAGGGGGGGGGGGGAA........',
  '......AAGGGGGGGGGGGGGGGGAA......',
  '.....AGGGGGGGGGGGGGGGGGGGGA.....',
  '....AGGGGGGGG######GGGGGGGGA....',
  '...AGGGGGG##........##GGGGGGA...',
  '...AGGGG##............##GGGGA...',
  '..AGGGG#................#GGGGA..',
  '..AGGG##.................##GGGA.',
  '..AGGG#...................#GGGA.',
  '.AAGG##....................##GGA',
  '.AAGG#......................#GGA',
  '.AAGG#......................#GGA',
  '.AAGG#......................#GGA',
  '.AAGG##....................##GGA',
  '..AGGG#...................#GGGA.',
  '..AGGG##.................##GGGA.',
  '..AGGGG#................#GGGGA..',
  '...AGGGG##............##GGGGA...',
  '...AGGGGGG##........##GGGGGGA...',
  '....AGGGGGGGG######GGGGGGGGA....',
  '.....AGGGGGGGGGGGGGGGGGGGGA.....',
  '......AAGGGGGGGGGGGGGGGGAA......',
  '........AAGGGGGGGGGGGGAA........',
  '..........AAAAAAAAAAAA..........',
  '................................',
  '................................',
  '................................',
  '................................',
  '................................',
], { '.': null, 'A': '#aaff00', 'G': '#33ff66', '#': '#000000' });

const ICON_SNAKE = makePixelSvg([
  '................................',
  '................................',
  '...DDDDDDDDD....................',
  '..DGGGGGGGGGD...................',
  '.DGGGGGGGGGGGD..................',
  '.DGGDDD#GGGGGD..................',
  '.DGD..D#GGGGD...................',
  '.DGD..#DGGGD....................',
  '.DGD.....DGD....DDDDDDDDDD......',
  '.DGD.....DGD..DDGGGGGGGGGD......',
  '.DGD.....DGDDGGGGGGGGGGGGD......',
  '.DGD.....DGGGGGGGGGGGGGGD.......',
  '.DGD.....DGGGGGGGGD#DGGD........',
  '.DGD.....DGGGGGGGGD#DGD.........',
  '.DGD......DGGGGGGGGGGD..........',
  '.DGD........DDDDDDDDDD..........',
  '.DGD............................',
  '.DGD....DDDDDDDDDDDDDDDD........',
  '.DGD....DGGGGGGGGGGGGGGD........',
  '.DGD....DGGGGGGGGGGGGGGD........',
  '.DGD....DGD..........DGD........',
  '.DGD....DGD..........DGD........',
  '.DGGD..DGGD..........DGD........',
  '.DGGGDDGGGD..........DGD........',
  '..DGGGGGGD..DDDDDDDDDDGD........',
  '...DGGGGD...DGGGGGGGGGGD........',
  '....DGGD....DGGGGGGGGGGD........',
  '.....DD.....DDDDDDDDDDDD........',
  '................................',
  '................................',
  '................................',
  '................................',
], { '.': null, 'G': '#33ff66', 'D': '#0a3a14', '#': '#000000' });

const ICON_GALLERY = makePixelSvg([
  '################################',
  '#..............................#',
  '#..############################.#',
  '#..#YYYYYYYYYYYYYYYYYYYYYYYYYY#.#',
  '#..#YYYYY...YYYYYYYYY...YYYYYY#.#',
  '#..#YYYYY...YYYYYYYYY...YYYYYY#.#',
  '#..#YYYYY...YYYYYYYYY...YYYYYY#.#',
  '#..#YYYYYYYYYYYYYYYYYYYYYYYYYY#.#',
  '#..#YYYYYYYYYYYYYYYYYYYYYYYYYY#.#',
  '#..#GGGYYYYYYYYYYYYYYYYYYYYYYY#.#',
  '#..#GGGGGYYYYYYYYYYYYYYYYYYYYY#.#',
  '#..#GGGGGGGYYYYYYYYYYYYYYYYYYY#.#',
  '#..#GGGGGGGGGYYYYYYYYYYYYYYYYY#.#',
  '#..#GGGGGGGGGGGYYYYYYYYYYYYYYY#.#',
  '#..#GGGGGGGGGGGGGYYYY##YYYYYYY#.#',
  '#..#GGGGGGGGGGGGGGGYY####YYYYY#.#',
  '#..#GGGGGGGGGGGGGGGGY######YYY#.#',
  '#..#GGGGGGGGGGGGGGGGY########Y#.#',
  '#..#DDDGGGGGGGGGGGGGY##########.#',
  '#..#DDDDDGGGGGGGGGGY###########.#',
  '#..#DDDDDDDGGGGGGGY############.#',
  '#..#DDDDDDDDDGGGGY#############.#',
  '#..#DDDDDDDDDDDGY##############.#',
  '#..#DDDDDDDDDDDDY##############.#',
  '#..############################.#',
  '#..............................#',
  '################################',
  '................................',
  '................................',
  '................................',
  '................................',
  '................................',
], { '.': null, '#': '#0a3a14', 'Y': '#aaff00', 'G': '#33ff66', 'D': '#1f6b2a' });

const ICON_GITHUB = makePixelSvg([
  '................................',
  '................................',
  '.........DDDDDDDDDDDDD..........',
  '.......DDGGGGGGGGGGGGGDD........',
  '......DGGGGGGGGGGGGGGGGGD.......',
  '.....DGGGGGGGGGGGGGGGGGGGD......',
  '....DGG##GGGGGGGGGGGG##GGD......',
  '....DGG##GGGGGGGGGGGG##GGD......',
  '....DGGGGGGGGGGGGGGGGGGGGD......',
  '...DGGGGGGGGGGGGGGGGGGGGGGD.....',
  '...DGGGGGGGGAAAAAAGGGGGGGGD.....',
  '...DGGGGGGGAAAAAAAAGGGGGGGD.....',
  '...DGGGGGGGGAAAAAAGGGGGGGGD.....',
  '...DGGGGGGGGGGGGGGGGGGGGGGD.....',
  '...DGGGGGGGGGGGGGGGGGGGGGGD.....',
  '....DGGGGGGGGGGGGGGGGGGGGD......',
  '....DGGG.GGGGGGGGGGGGG.GGD......',
  '....DGG..DGGGGGGGGGG..DDD.......',
  '...DGG...DGGGGG..GGG...DD.......',
  '...DG....DGG..GGG..DG..DD.......',
  '..DG.....DG....G....DG.DD.......',
  '..DG.....DG.........DG..DD......',
  '.DD......DG.........DG..DD......',
  '.DD......DG.........DG...D......',
  '..D......DG.........DG...D......',
  '..........D...........D..D......',
  '................................',
  '................................',
  '................................',
  '................................',
  '................................',
  '................................',
], { '.': null, 'G': '#33ff66', 'D': '#0a3a14', '#': '#000000', 'A': '#aaff00' });

/* tray icons */
const TRAY_SPEAKER = makePixelSvg([
  '................',
  '................',
  '.....##.........',
  '.....##.....A...',
  '....###...A.....',
  '...####.A.A.....',
  '..######..A...A.',
  '..######....A...',
  '..######....A...',
  '..######..A...A.',
  '...####.A.A.....',
  '....###...A.....',
  '.....##.....A...',
  '.....##.........',
  '................',
  '................',
], { '.': null, '#': '#000000', 'A': '#aaff00' });

const TRAY_NETWORK = makePixelSvg([
  '................',
  '................',
  '....######......',
  '...#######......',
  '...#######......',
  '..########......',
  '..#######.......',
  '.########.......',
  '.#######........',
  '########........',
  '#######.........',
  '################',
  '#..............#',
  '################',
  '................',
  '................',
], { '.': null, '#': '#33ff66' });

/* gallery tiles */
const TILE_PALETTE_A = { '.': null, '#': '#0a1f0a', 'G': '#33ff66', 'A': '#aaff00', 'W': '#c8ffd1' };
const T_TREE = makePixelSvg([
  '.......AA.......','......AAAA......','.....AAAAAA.....','....AAGGGGAA....',
  '...AAGGGGGGAA...','..AAGGGGGGGGAA..','.AAGGGGAAGGGGAA.','AAGGGGGGGGGGGGAA',
  '.AAGGGGGGGGGGAA.','..AAGGGGGGGGAA..','...AAGGGGGGAA...','......##........',
  '......##........','.....####.......','....######......','................',
], TILE_PALETTE_A);
const T_GHOST = makePixelSvg([
  '....GGGGGG......','...GGGGGGGG.....','..GGGGGGGGGG....','.GG##GGGG##GG...',
  '.GG##GGGG##GG...','.GGGGGGGGGGGG...','.GGGGGGGGGGGG...','.GGGGGGGGGGGG...',
  '.GGGGGGGGGGGG...','.GGGGGGGGGGGG...','.GG.GG.GG.GGG...','.G..G..G..G.G...',
  '................','................','................','................',
], { '.': null, 'G': '#33ff66', '#': '#0a1f0a' });
const T_HEART = makePixelSvg([
  '................','..AAAA....AAAA..','.AGGGGAA.AGGGAA.','AGGGGGGAAGGGGGA.',
  'AGGGGGGGGGGGGGA.','AGGGGWWGGWWGGGA.','.AGGGGGGGGGGGAA.','..AGGGGGGGGGAA..',
  '...AGGGGGGGAA...','....AGGGGGAA....','.....AGGGAA.....','......AGAA......',
  '.......AA.......','................','................','................',
], { '.': null, 'A': '#aaff00', 'G': '#33ff66', 'W': '#c8ffd1' });
const T_SHIP = makePixelSvg([
  '................','.......AA.......','......AAAA......','......AAAA......',
  '.....AGGGAA.....','....AAGGGAAA....','...AAGGGGGAAA...','..AAGGGWWGGGAA..',
  '..AGGGWWWWGGGA..','..AGGGWWWWGGGA..','..AAGGGGGGGGAA..','...AAAA##AAAA...',
  '....A.A##A.A....','....A.A##A.A....','......##........','......##........',
], TILE_PALETTE_A);
const T_PLANET = makePixelSvg([
  '......######....','....##GGGGGG##..','...#GGGGGGGGGG#.','..#GGAAGGGGGGGG#',
  '.#GGGGGGAAGGGGG#','.#GGGGGGGGGGGAA#','.#GAAGGGGAAGGGG#','.#GGGGGAAGGGGGA#',
  '.#GGGGGGGGGGGGG#','..#GGGGGAAGGGGG.','...#GGGGGGGGGG#.','....##GGGGGG##..',
  '......######....','................','......AAAAAA....','................',
], TILE_PALETTE_A);
const T_TERMINAL = makePixelSvg([
  '################','#..............#','#.AGGGGGGGGGGG.#','#.A>.GGGGGGGGG.#',
  '#.A.AGGGGGGGGG.#','#.AAA.GGGGGGGG.#','#.AGGGGGGGGGGG.#','#..............#',
  '#.GG.GGGGG.GGG.#','#.GG.G.G.G.G.G.#','#.GG.GGG.GGGGGG#','#.GG.G.G.G.G.G.#',
  '#.GG.GGG.G.GGGG#','#..............#','#..............#','################',
], { '#': '#0a1f0a', '.': '#050d05', 'G': '#33ff66', 'A': '#aaff00', '>': '#aaff00' });
const T_KEY = makePixelSvg([
  '....AAAAAA......','...AGGGGGGA.....','..AGG####GGA....','.AGG#....#GGA...',
  '.AG#......#GA...','.AG#......#GA...','.AGG#....#GGA...','..AGG####GGAAAA.',
  '...AGGGGGGAAAGG.','....AAAGGAAAAAA.','......AGGA......','......AGGA......',
  '......AAAA......','......AGGA......','......AAAA......','................',
], { '.': null, 'A': '#aaff00', 'G': '#33ff66', '#': '#0a1f0a' });
const T_BUG = makePixelSvg([
  '.....##....##...','......##..##....','......GGGGGG....','.....GGGGGGGG...',
  '....GGGGGGGGGG..','..AAGGGGGGGGAAA.','..A.AGGGGGGGA.A.','....AGGGGGGGGA..',
  '....AGGGGGGGGA..','....AGGGGGGGGA..','....AGGGGGGGGA..','..AAGGGGGGGGAAA.',
  '..A.AGGAAGGGA.A.','....AGAAGAGGA...','......##..##....','......##..##....',
], { '.': null, 'G': '#33ff66', 'A': '#aaff00', '#': '#0a1f0a' });

const GALLERY_TILES = [
  { id: 'tree',     cap: 'pixel_tree.bmp',   svg: T_TREE },
  { id: 'ghost',    cap: 'ghost_v2.bmp',     svg: T_GHOST },
  { id: 'heart',    cap: 'heart_8bit.bmp',   svg: T_HEART },
  { id: 'ship',     cap: 'ship_demo.bmp',    svg: T_SHIP },
  { id: 'planet',   cap: 'planet_42.bmp',    svg: T_PLANET },
  { id: 'terminal', cap: 'term_boot.bmp',    svg: T_TERMINAL },
  { id: 'key',      cap: 'key_prg.bmp',      svg: T_KEY },
  { id: 'bug',      cap: 'bug_found.bmp',    svg: T_BUG },
];

/* Win98 logo for start button (pixel "fox flag") */
const START_LOGO = makePixelSvg([
  '................',
  '..GG..GG..AA....',
  '.GGGG.GG.AAAA...',
  'GG..GGGG.AA.....',
  'GG..GGGG.AAAA...',
  '.GGGGGGG.AA.A...',
  '..GG..GG.AA.AA..',
  '................',
], { '.': null, 'G': '#33ff66', 'A': '#aaff00' });

/* ============================================================
 * 2. <a-hole> custom element with runtime config
 * ============================================================ */

const easingUtils = {
  linear: (t) => t,
  easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
};

class AHole extends HTMLElement {
  static get observedAttributes() {
    return ['data-particles', 'data-discs', 'data-speed', 'data-disc-color', 'data-particle-color', 'data-aura', 'data-paused'];
  }
  connectedCallback() {
    this.canvas = this.querySelector('.js-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.discs = []; this.lines = []; this._raf = 0;
    this._init(); this._bind();
    this._raf = requestAnimationFrame(this._tick);
  }
  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
  }
  attributeChangedCallback() { if (this.canvas) this._init(); }
  _bind() { this._onResize = () => this._init(); window.addEventListener('resize', this._onResize); }
  _cfg() {
    return {
      particles: parseInt(this.getAttribute('data-particles') || '100', 10),
      discs: parseInt(this.getAttribute('data-discs') || '100', 10),
      speed: parseFloat(this.getAttribute('data-speed') || '1'),
      discColor: this.getAttribute('data-disc-color') || '#33ff66',
      particleColor: this.getAttribute('data-particle-color') || '#c8ffd1',
      aura: this.getAttribute('data-aura') !== 'off',
      paused: this.getAttribute('data-paused') === 'on',
    };
  }
  _init() {
    this._setSize(); this._setDiscs(); this._setLines(); this._setParticles();
    const aura = this.querySelector('.aura');
    if (aura) aura.style.display = this._cfg().aura ? 'block' : 'none';
  }
  _setSize() {
    this.rect = this.getBoundingClientRect();
    this.render = { width: this.rect.width, height: this.rect.height, dpi: window.devicePixelRatio || 1 };
    this.canvas.width = this.render.width * this.render.dpi;
    this.canvas.height = this.render.height * this.render.dpi;
  }
  _setDiscs() {
    const { width, height } = this.rect;
    const total = Math.max(10, Math.min(300, this._cfg().discs));
    this.discs = [];
    this.startDisc = { x: width * 0.5, y: height * 0.45, w: width * 0.75, h: height * 0.7 };
    this.endDisc = { x: width * 0.5, y: height * 0.95, w: 0, h: 0 };
    let prevBottom = height; this.clip = {};
    for (let i = 0; i < total; i++) {
      const p = i / total;
      const disc = this._tweenDisc({ p });
      const bottom = disc.y + disc.h;
      if (bottom <= prevBottom) this.clip = { disc: { ...disc }, i };
      prevBottom = bottom;
      this.discs.push(disc);
    }
    this.clip.path = new Path2D();
    this.clip.path.ellipse(this.clip.disc.x, this.clip.disc.y, this.clip.disc.w, this.clip.disc.h, 0, 0, Math.PI * 2);
    this.clip.path.rect(this.clip.disc.x - this.clip.disc.w, 0, this.clip.disc.w * 2, this.clip.disc.y);
  }
  _setLines() {
    const { width, height } = this.rect;
    const { discColor } = this._cfg();
    this.lines = [];
    const total = 100;
    const a = (Math.PI * 2) / total;
    for (let i = 0; i < total; i++) this.lines.push([]);
    this.discs.forEach((disc) => {
      for (let i = 0; i < total; i++) {
        const ang = i * a;
        this.lines[i].push({ x: disc.x + Math.cos(ang) * disc.w, y: disc.y + Math.sin(ang) * disc.h });
      }
    });
    if (typeof OffscreenCanvas === 'undefined') return;
    this.linesCanvas = new OffscreenCanvas(Math.max(1, width), Math.max(1, height));
    const ctx = this.linesCanvas.getContext('2d');
    this.lines.forEach((line) => {
      ctx.save(); let lineIsIn = false;
      line.forEach((p1, j) => {
        if (j === 0) return;
        const p0 = line[j - 1];
        if (!lineIsIn && (ctx.isPointInPath(this.clip.path, p1.x, p1.y) || ctx.isPointInStroke(this.clip.path, p1.x, p1.y))) {
          lineIsIn = true;
        } else if (lineIsIn) {
          ctx.clip(this.clip.path);
        }
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = discColor; ctx.lineWidth = 2;
        ctx.stroke(); ctx.closePath();
      });
      ctx.restore();
    });
  }
  _setParticles() {
    const { width, height } = this.rect;
    const { particles, particleColor } = this._cfg();
    this.particles = [];
    this.particleArea = { sw: this.clip.disc.w * 0.5, ew: this.clip.disc.w * 2, h: height * 0.85 };
    this.particleArea.sx = (width - this.particleArea.sw) / 2;
    this.particleArea.ex = (width - this.particleArea.ew) / 2;
    const total = Math.max(0, Math.min(500, particles));
    for (let i = 0; i < total; i++) this.particles.push(this._initParticle(true, particleColor));
  }
  _initParticle(start, color) {
    const sx = this.particleArea.sx + this.particleArea.sw * Math.random();
    const ex = this.particleArea.ex + this.particleArea.ew * Math.random();
    const dx = ex - sx;
    const y = start ? this.particleArea.h * Math.random() : this.particleArea.h;
    const r = 0.5 + Math.random() * 4;
    const vy = 0.5 + Math.random();
    const c = color || '#c8ffd1';
    const m = c.match(/^#([0-9a-f]{6})$/i);
    let rgba = c;
    if (m) {
      const n = parseInt(m[1], 16);
      const r8 = (n >> 16) & 0xff, g8 = (n >> 8) & 0xff, b8 = n & 0xff;
      rgba = `rgba(${r8},${g8},${b8},${(0.3 + Math.random() * 0.7).toFixed(2)})`;
    }
    return { x: sx, sx, dx, y, vy, p: 0, r, c: rgba };
  }
  _tweenValue(s, e, p, ease) { const fn = easingUtils[ease ? 'easeInExpo' : 'linear']; return s + (e - s) * fn(p); }
  _drawDiscs() {
    const { ctx } = this; const { discColor } = this._cfg();
    ctx.strokeStyle = discColor; ctx.lineWidth = 2;
    const o = this.startDisc;
    ctx.beginPath(); ctx.ellipse(o.x, o.y, o.w, o.h, 0, 0, Math.PI * 2); ctx.stroke(); ctx.closePath();
    this.discs.forEach((disc, i) => {
      if (i % 5 !== 0) return;
      if (disc.w < this.clip.disc.w - 5) { ctx.save(); ctx.clip(this.clip.path); }
      ctx.beginPath(); ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2); ctx.stroke(); ctx.closePath();
      if (disc.w < this.clip.disc.w - 5) ctx.restore();
    });
  }
  _drawLines() { if (this.linesCanvas) this.ctx.drawImage(this.linesCanvas, 0, 0); }
  _drawParticles() {
    const { ctx } = this;
    ctx.save(); ctx.clip(this.clip.path);
    this.particles.forEach((p) => {
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.rect(p.x, p.y, p.r, p.r); ctx.closePath(); ctx.fill();
    });
    ctx.restore();
  }
  _moveDiscs() {
    const { speed } = this._cfg();
    this.discs.forEach((d) => { d.p = (d.p + 0.001 * speed) % 1; this._tweenDisc(d); });
  }
  _moveParticles() {
    const { speed, particleColor } = this._cfg();
    this.particles.forEach((p) => {
      p.p = 1 - p.y / this.particleArea.h;
      p.x = p.sx + p.dx * p.p;
      p.y -= p.vy * speed;
      if (p.y < 0) Object.assign(p, this._initParticle(false, particleColor));
    });
  }
  _tweenDisc(d) {
    d.x = this._tweenValue(this.startDisc.x, this.endDisc.x, d.p);
    d.y = this._tweenValue(this.startDisc.y, this.endDisc.y, d.p, 'inExpo');
    d.w = this._tweenValue(this.startDisc.w, this.endDisc.w, d.p);
    d.h = this._tweenValue(this.startDisc.h, this.endDisc.h, d.p);
    return d;
  }
  _tick = () => {
    const { paused } = this._cfg();
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save(); ctx.scale(this.render.dpi, this.render.dpi);
    if (!paused) { this._moveDiscs(); this._moveParticles(); }
    this._drawDiscs(); this._drawLines(); this._drawParticles();
    ctx.restore();
    this._raf = requestAnimationFrame(this._tick);
  };
}
if (!customElements.get('a-hole')) customElements.define('a-hole', AHole);

/* ============================================================
 * 3. Hooks
 * ============================================================ */

const useDraggable = (onMove, isEnabled = true) => {
  const start = useRef({ x: 0, y: 0, dragging: false });
  return useCallback((e) => {
    if (!isEnabled) return;
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest && e.target.closest('.no-drag')) return;
    const t = e.touches ? e.touches[0] : e;
    start.current = { x: t.clientX, y: t.clientY, dragging: true };
    const onMoveEvt = (ev) => {
      if (!start.current.dragging) return;
      const m = ev.touches ? ev.touches[0] : ev;
      const dx = m.clientX - start.current.x;
      const dy = m.clientY - start.current.y;
      start.current.x = m.clientX;
      start.current.y = m.clientY;
      onMove(dx, dy, ev);
    };
    const onUp = () => {
      start.current.dragging = false;
      window.removeEventListener('mousemove', onMoveEvt);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMoveEvt);
      window.removeEventListener('touchend', onUp);
    };
    window.addEventListener('mousemove', onMoveEvt);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMoveEvt, { passive: false });
    window.addEventListener('touchend', onUp);
    e.preventDefault();
  }, [isEnabled, onMove]);
};

const useClickOutside = (ref, onOutside, enabled = true) => {
  useEffect(() => {
    if (!enabled) return undefined;
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onOutside(e);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [ref, onOutside, enabled]);
};

/* ============================================================
 * 4. Window meta + state defaults
 * ============================================================ */

const WINDOW_META = {
  blackhole: { title: 'Black Hole - blackhole.exe', icon: ICON_BHOLE },
  snake:     { title: 'Snake - snake.exe',          icon: ICON_SNAKE },
  gallery:   { title: 'My Pictures',                icon: ICON_GALLERY },
  github:    { title: 'My Repositories',            icon: ICON_GITHUB },
};

const DEFAULT_WINS = [
  { id: 'blackhole', open: true,  min: false, max: false, x: 60,  y: 30, w: 560, h: 460, z: 1, focused: true  },
  { id: 'snake',     open: false, min: false, max: false, x: 110, y: 70, w: 600, h: 500, z: 0, focused: false },
  { id: 'gallery',   open: false, min: false, max: false, x: 160, y: 110, w: 540, h: 460, z: 0, focused: false },
  { id: 'github',    open: false, min: false, max: false, x: 210, y: 50, w: 600, h: 480, z: 0, focused: false },
];

/* ============================================================
 * 5. Common bits
 * ============================================================ */

const PixelArt = ({ svg, size, style, className }) => {
  // When `size` is provided, set explicit width/height inline.
  // Otherwise let CSS (via className) decide the size — DON'T inline 100%,
  // because that would override fixed `.icon` sizing in CSS classes.
  const base = { display: 'inline-block' };
  if (size) { base.width = size; base.height = size; }
  return (
    <span
      className={className || ''}
      style={{ ...base, ...(style || {}) }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/* ============================================================
 * 6. Outer page (retro green) — unchanged
 * ============================================================ */

/* Top "MDI parent" bar — sticky, looks like a real Win98 program title bar */
const StatusBar = () => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <div className="statusbar">
      <div className="left">
        <PixelArt svg={FOX_TINY} className="icon" size="16px" />
        <span>BlackGreenFox.exe — pixel portfolio</span>
      </div>
      <div className="right">
        <span><span className="blink" /> ONLINE</span>
        <span>UPTIME {time.toTimeString().slice(0,8)}</span>
        <span>{time.toLocaleDateString()}</span>
      </div>
      <span className="tb-btns">
        <span className="tb-btn">_</span>
        <span className="tb-btn">□</span>
        <span className="tb-btn">×</span>
      </span>
    </div>
  );
};

/* Reusable: a Win98 dialog title bar — used by every outer section */
const SectionTitle = ({ icon, children }) => (
  <div className="section-title">
    {icon && <PixelArt svg={icon} className="tb-icon" size="16px" />}
    <h2>{children}</h2>
    <span className="tb-btns">
      <span className="tb-btn">_</span>
      <span className="tb-btn">□</span>
      <span className="tb-btn">×</span>
    </span>
  </div>
);

const Hero = ({ onBoot }) => (
  <section className="section" id="hero">
    <SectionTitle icon={FOX_TINY}>About BlackGreenFox.exe</SectionTitle>
    <div className="hero">
      <div>
        <h1>BLACK<span className="accent">.</span>GREEN<span className="accent">.</span>FOX</h1>
        <p className="tagline">
          Привіт. Я програміст-ентузіаст. Збираю маленькі ретро-проєкти —
          від WebAssembly-ігор до симуляцій та піксель-арту. Цей сайт — моя робоча
          станція з відкритими «вікнами» в різні штуки, які я роблю.
        </p>
        <div className="hero-cta">
          <button className="pixel-btn" onClick={() => onBoot('blackhole')}><PixelArt svg={ICON_BHOLE} className="ic" size="16px" />BOOT_OS &gt;_</button>
          <a className="pixel-btn" href="#about"><PixelArt svg={ICON_GALLERY} className="ic" size="16px" />SCROLL ↓</a>
        </div>
        <div className="meta">SYS: linux/x86_64 · LANG: c++ / py / js · STACK: react / wasm / canvas</div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="frame">
          <PixelArt svg={HERO_SVG} size="240px" />
        </div>
        <div className="props">
          <span>240×240 · 8-bit</span>
          <span>portrait.bmp</span>
        </div>
      </div>
    </div>
  </section>
);

const ColumnsSection = () => {
  const cols = [
    { h: '01 // ABOUT',    body: 'Roughly speaking — людина, яка любить рендерити пікселі. Народжений у терміналі, виріс у IDE.' },
    { h: '02 // CRAFT',    body: 'Пишу код на C++, Python, JS. Прототипую швидко, рефакторю безжально, тести люблю.' },
    { h: '03 // GAMES',    body: 'Snake — перша ціль. Далі — більше: рогалики, симуляції, маленькі ігри-есе.' },
    { h: '04 // GRAPHICS', body: 'Канвас, шейдери, особлива слабкість до CRT-естетики, ретро-палітр і піксель-арту.' },
    { h: '05 // SCIENCE',  body: 'Цікавлять чорні діри, лінзи, орбіти. Симулюю гравітаційні «штуки» — поки що стилізовано.' },
    { h: '06 // CONTACT',  body: <>github: <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">@{GH_USER}</a><br/>email: blackgreenfox0477@gmail.com</> },
  ];
  return (
    <section className="section" id="about">
      <SectionTitle icon={ICON_GALLERY}>ABOUT_ME.txt — Notepad</SectionTitle>
      <div className="cols-section">
        <div className="cols-grid">
          {cols.map((c, i) => (
            <div className="col" key={i}><h4>{c.h}</h4><p>{c.body}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
 * 7. Win98 widgets
 * ============================================================ */

const W98Button = ({ children, onClick, primary, disabled, style }) => {
  const ref = useRef(null);
  const onMouseDown = () => ref.current && ref.current.classList.add('pressed');
  const onUp = () => ref.current && ref.current.classList.remove('pressed');
  return (
    <button
      ref={ref}
      className="w98-btn no-drag"
      style={{ fontWeight: primary ? 'bold' : 'normal', outline: primary ? '1px dotted #000' : 'none', outlineOffset: '-4px', ...(style || {}) }}
      disabled={disabled}
      onMouseDown={onMouseDown}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const W98Check = ({ checked, onChange, label }) => (
  <label className="w98-check no-drag">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span className="box" />
    <span>{label}</span>
  </label>
);

const W98Group = ({ title, children, style }) => (
  <fieldset className="w98-group" style={style}>
    <legend className="legend">{title}</legend>
    {children}
  </fieldset>
);

const W98Slider = ({ value, onChange, min, max, step }) => (
  <input
    type="range" className="w98-track no-drag"
    min={min} max={max} step={step || 1}
    value={value}
    onChange={(e) => onChange(parseFloat(e.target.value))}
  />
);

/* ============================================================
 * 8. Win98 desktop icon
 * ============================================================ */

const W98Icon = ({ winId, label, svg, onOpen, selected, onSelect, onCtxMenu }) => (
  <div
    className={`w98-icon ${selected ? 'selected' : ''}`}
    tabIndex={0}
    role="button"
    onClick={(e) => { e.stopPropagation(); onSelect(winId); }}
    onDoubleClick={() => onOpen(winId)}
    onKeyDown={(e) => { if (e.key === 'Enter') onOpen(winId); }}
    onContextMenu={(e) => { e.preventDefault(); onCtxMenu(winId, e.clientX, e.clientY, e); }}
  >
    <PixelArt svg={svg} className="pic" size="32px" />
    <span className="label">{label}</span>
  </div>
);

/* ============================================================
 * 9. Win98 Window shell
 * ============================================================ */

const W98Window = ({ win, onMove, onResize, onFocus, onMin, onMax, onClose, children }) => {
  const meta = WINDOW_META[win.id];
  const onHeader = useDraggable((dx, dy) => onMove(win.id, dx, dy), !win.max);
  const onHandle = useDraggable((dx, dy) => onResize(win.id, dx, dy), !win.max);
  if (!win.open || win.min) return null;

  const style = win.max
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 28px)', zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <div
      className={`w98-win ${win.max ? 'maximized' : ''} ${win.focused ? 'focused' : ''}`}
      style={style}
      onMouseDown={() => onFocus(win.id)}
      onTouchStart={() => onFocus(win.id)}
    >
      <div
        className="w98-titlebar"
        onMouseDown={onHeader}
        onTouchStart={onHeader}
        onDoubleClick={() => onMax(win.id)}
      >
        <PixelArt svg={meta.icon} className="icon" size="16px" />
        <span className="title">{meta.title}</span>
        <span className="btns">
          <button className="w98-tb-btn min no-drag" title="Minimize" onClick={(e) => { e.stopPropagation(); onMin(win.id); }}><span className="gl" /></button>
          <button className={`w98-tb-btn ${win.max ? 'restore' : 'max'} no-drag`} title={win.max ? 'Restore' : 'Maximize'} onClick={(e) => { e.stopPropagation(); onMax(win.id); }}><span className="gl" /></button>
          <button className="w98-tb-btn close no-drag" title="Close" onClick={(e) => { e.stopPropagation(); onClose(win.id); }}><span className="gl" /></button>
        </span>
      </div>
      <div className="w98-body">{children}</div>
      {!win.max && (
        <div className="w98-resize no-drag" onMouseDown={onHandle} onTouchStart={onHandle} />
      )}
    </div>
  );
};

/* ============================================================
 * 10. Black Hole window contents (Properties dialog look)
 * ============================================================ */

const BlackHoleApp = ({ live, onLiveChange, saved, onApply, onCancel, onReset }) => {
  const [tab, setTab] = useState('viz');
  const containerRef = useRef(null);

  useEffect(() => {
    if (tab !== 'viz') return;
    const el = containerRef.current; if (!el) return;
    if (el.querySelector('a-hole')) return;
    const a = document.createElement('a-hole');
    const c = document.createElement('canvas'); c.className = 'js-canvas';
    const aura = document.createElement('div'); aura.className = 'aura';
    const ov = document.createElement('div'); ov.className = 'overlay';
    a.appendChild(c); a.appendChild(aura); a.appendChild(ov);
    el.appendChild(a);
  }, [tab]);

  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    const a = el.querySelector('a-hole'); if (!a) return;
    a.setAttribute('data-particles', live.particles);
    a.setAttribute('data-discs', live.discs);
    a.setAttribute('data-speed', live.speed);
    a.setAttribute('data-disc-color', live.discColor);
    a.setAttribute('data-particle-color', live.particleColor);
    a.setAttribute('data-aura', live.aura ? 'on' : 'off');
    a.setAttribute('data-paused', live.paused ? 'on' : 'off');
  }, [live, tab]);

  const dirty = JSON.stringify(live) !== JSON.stringify(saved);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* tabs */}
      <div className="w98-tabs">
        <div className={`w98-tab ${tab === 'viz' ? 'active' : ''}`} onClick={() => setTab('viz')}><u>V</u>isualization</div>
        <div className={`w98-tab ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}><u>S</u>ettings</div>
        <div className={`w98-tab ${tab === 'about' ? 'active' : ''}`} onClick={() => setTab('about')}><u>A</u>bout</div>
      </div>
      <div className="w98-tab-body" style={{ display: 'flex', flexDirection: 'column' }}>

        {/* VISUALIZATION */}
        <div style={{ display: tab === 'viz' ? 'flex' : 'none', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div className="bh-canvas" ref={containerRef} />
          <div className="bh-readout">
            <div className="cell">Event Horizon: <span className="v">ACTIVE</span></div>
            <div className="cell">Speed: <span className="v">x{live.speed.toFixed(2)}</span></div>
            <div className="cell">{live.paused ? <>Status: <span className="v">PAUSED</span></> : <>Status: <span className="v">STABLE</span></>}</div>
          </div>
        </div>

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ flex: 1, overflow: 'auto', paddingRight: 4 }}>
              <W98Group title="Particles">
                <div className="w98-row">
                  <label>Count:</label>
                  <W98Slider value={live.particles} min={0} max={300} onChange={(v) => onLiveChange({ particles: v })} />
                  <span className="val">{live.particles}</span>
                </div>
              </W98Group>

              <W98Group title="Discs">
                <div className="w98-row">
                  <label>Count:</label>
                  <W98Slider value={live.discs} min={20} max={200} onChange={(v) => onLiveChange({ discs: v })} />
                  <span className="val">{live.discs}</span>
                </div>
              </W98Group>

              <W98Group title="Animation">
                <div className="w98-row">
                  <label>Speed:</label>
                  <W98Slider value={live.speed} min={0.1} max={3} step={0.05} onChange={(v) => onLiveChange({ speed: v })} />
                  <span className="val">x{live.speed.toFixed(2)}</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <W98Check checked={live.paused} onChange={(b) => onLiveChange({ paused: b })} label="Paused" />
                </div>
              </W98Group>

              <W98Group title="Colors">
                <div className="w98-row">
                  <label>Disc:</label>
                  <input type="color" className="w98-color no-drag" value={live.discColor} onChange={(e) => onLiveChange({ discColor: e.target.value })} />
                  <span className="val" style={{ color: live.discColor }}>{live.discColor}</span>
                </div>
                <div className="w98-row">
                  <label>Particles:</label>
                  <input type="color" className="w98-color no-drag" value={live.particleColor} onChange={(e) => onLiveChange({ particleColor: e.target.value })} />
                  <span className="val" style={{ color: live.particleColor }}>{live.particleColor}</span>
                </div>
              </W98Group>

              <W98Group title="Effects">
                <W98Check checked={live.aura} onChange={(b) => onLiveChange({ aura: b })} label="Show aura halo" />
              </W98Group>
            </div>

            <div className="w98-actions">
              <W98Button onClick={onReset}>Reset</W98Button>
              <span style={{ flex: 1 }} />
              <W98Button onClick={onApply} primary disabled={!dirty}>OK</W98Button>
              <W98Button onClick={onCancel} disabled={!dirty}>Cancel</W98Button>
              <W98Button onClick={onApply} disabled={!dirty}>Apply</W98Button>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {tab === 'about' && (
          <div style={{ padding: 8, fontSize: 11 }}>
            <h3 style={{ font: 'inherit', fontWeight: 'bold', color: '#000', marginBottom: 6 }}>Singularity Visualization v1.0</h3>
            <p>Стилізована симуляція акреційного диска навколо чорної діри.
               Використовується <code>OffscreenCanvas</code> для попереднього рендеру
               ліній і <code>requestAnimationFrame</code> для анімації частинок.</p>
            <p style={{ marginTop: 10 }}>
              Налаштування зберігаються у <code>localStorage</code> під ключем <code>bh-settings-v1</code>.
            </p>
            <p style={{ marginTop: 14, color: '#444' }}>© BlackGreenFox · Made with React + Canvas</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
 * 11. Snake / Gallery / Github contents
 * ============================================================ */

const SnakeApp = () => (
  <iframe
    src="snake.html"
    title="Snake Game"
    style={{ width: '100%', height: '100%', border: 'none', background: '#000', display: 'block' }}
  />
);

const GalleryApp = () => {
  const [active, setActive] = useState(null);
  return (
    <>
      <div className="gallery">
        {GALLERY_TILES.map((t) => (
          <div className="tile" key={t.id} onClick={() => setActive(t)}>
            <div className="pic"><PixelArt svg={t.svg} size="86px" /></div>
            <div className="cap">{t.cap}</div>
          </div>
        ))}
      </div>
      {active && (
        <div className="gallery-modal" onClick={() => setActive(null)}>
          <div className="frame"><PixelArt svg={active.svg} size="280px" /></div>
          <div className="cap">{active.cap}  —  click to close</div>
        </div>
      )}
    </>
  );
};

const GithubApp = () => {
  const [state, setState] = useState({ status: 'loading', repos: [], err: null });
  const [q, setQ] = useState('');
  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`)
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then((d) => { if (!cancelled) setState({ status: 'ok', repos: d, err: null }); })
      .catch((e) => { if (!cancelled) setState({ status: 'error', repos: [], err: String(e.message || e) }); });
    return () => { cancelled = true; };
  }, []);
  const filtered = useMemo(() => {
    const repos = state.repos || [];
    if (!q.trim()) return repos;
    const lc = q.toLowerCase();
    return repos.filter((r) => (r.name + ' ' + (r.description || '')).toLowerCase().includes(lc));
  }, [state.repos, q]);
  return (
    <div className="repos">
      <div className="toolbar">
        <input type="text" className="w98-input no-drag" placeholder="search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <a className="w98-btn no-drag" href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">Open profile</a>
      </div>
      <div className="list">
        {state.status === 'loading' && <div className="loading">Loading repositories…</div>}
        {state.status === 'error'   && <div className="error">Failed to load: {state.err}</div>}
        {state.status === 'ok' && filtered.length === 0 && <div className="empty">No repositories found.</div>}
        {state.status === 'ok' && filtered.map((r) => (
          <a className="repo" key={r.id} href={r.html_url} target="_blank" rel="noreferrer">
            <PixelArt svg={ICON_GITHUB} className="icon" size="16px" />
            <div>
              <div className="name">{r.name}{r.fork ? ' (fork)' : ''}</div>
              {r.description && <div className="desc">{r.description}</div>}
              <div className="meta">
                {r.language && <span>{r.language}</span>}
                <span>★ {r.stargazers_count}</span>
                <span>⑃ {r.forks_count}</span>
                <span>upd: {new Date(r.updated_at).toISOString().slice(0,10)}</span>
              </div>
            </div>
            <div style={{ alignSelf: 'center' }}>›</div>
          </a>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
 * 12. Start menu + context menu
 * ============================================================ */

const StartMenu = ({ onAction, onClose }) => {
  const ref = useRef(null);
  const [sub, setSub] = useState(null);
  useClickOutside(ref, onClose);
  const items = [
    { key: 'programs', label: <><u>P</u>rograms</>, icon: ICON_GALLERY, sub: [
      { key: 'blackhole', label: 'Black Hole',   icon: ICON_BHOLE,   action: () => onAction('open', 'blackhole') },
      { key: 'snake',     label: 'Snake',        icon: ICON_SNAKE,   action: () => onAction('open', 'snake')     },
      { key: 'gallery',   label: 'My Pictures',  icon: ICON_GALLERY, action: () => onAction('open', 'gallery')   },
      { key: 'github',    label: 'My Repositories', icon: ICON_GITHUB, action: () => onAction('open', 'github')  },
    ]},
    { key: 'settings', label: <><u>S</u>ettings</>, icon: TRAY_NETWORK, sub: [
      { key: 'props', label: 'Black Hole Properties…', icon: ICON_BHOLE, action: () => onAction('properties') },
      { key: 'reset', label: 'Reset BH settings',      icon: ICON_BHOLE, action: () => onAction('reset')      },
    ]},
    { key: 'find', label: <><u>F</u>ind</>, icon: ICON_GITHUB, sub: [
      { key: 'gh', label: 'On GitHub…', icon: ICON_GITHUB, action: () => onAction('open', 'github') },
    ]},
    { key: 'help', label: <><u>H</u>elp</>, icon: TRAY_SPEAKER, action: () => onAction('about') },
    { key: 'run',  label: <><u>R</u>un…</>, icon: TRAY_NETWORK, action: () => onAction('run') },
    { key: 'sep1', sep: true },
    { key: 'shut', label: <>Sh<u>u</u>t Down…</>, icon: ICON_BHOLE, action: () => onAction('shutdown') },
  ];
  return (
    <div className="w98-startmenu" ref={ref}>
      <div className="banner"><span>BlackGreenFox<b style={{ color: 'var(--accent)' }}> 98</b></span></div>
      <div className="menu" style={{ position: 'relative' }}>
        {items.map((i) => i.sep ? (
          <div key={i.key} className="w98-mi sep" />
        ) : (
          <div
            key={i.key}
            className={`w98-mi ${i.sub ? 'has-sub' : ''}`}
            onMouseEnter={() => setSub(i.sub ? i.key : null)}
            onClick={() => { if (i.action) { i.action(); onClose(); } }}
          >
            <PixelArt svg={i.icon} className="ic" size="16px" />
            <span className="label">{i.label}</span>
            {i.sub && sub === i.key && (
              <div className="w98-submenu" style={{ left: '100%', top: -2 }}>
                {i.sub.map((s) => (
                  <div key={s.key} className="w98-mi" onClick={(e) => { e.stopPropagation(); s.action(); onClose(); }}>
                    <PixelArt svg={s.icon} className="ic" size="16px" />
                    <span className="label">{s.label}</span>
                    <span />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ContextMenu = ({ x, y, items, onClose }) => {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  return (
    <div ref={ref} className="w98-ctxmenu" style={{ left: x, top: y }}>
      {items.map((it, i) => it.sep ? (
        <div key={i} className="w98-mi sep" />
      ) : (
        <div key={i} className="w98-mi" style={{ gridTemplateColumns: '1fr' }} onClick={() => { it.action(); onClose(); }}>
          <span className="label">{it.label}</span>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
 * 13. CRT desktop composition
 * ============================================================ */

const Taskbar = ({ wins, onClick, onStartClick, startOpen }) => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  const open = wins.filter((w) => w.open);
  return (
    <div className="w98-taskbar">
      <div className={`w98-start ${startOpen ? 'pressed' : ''}`} onClick={onStartClick}>
        <PixelArt svg={START_LOGO} className="logo" size="16px" />
        <span>Start</span>
      </div>
      <div className="w98-tasks">
        {open.map((w) => (
          <div
            key={w.id}
            className={`w98-task ${w.focused && !w.min ? 'active' : ''}`}
            onClick={() => onClick(w.id)}
          >
            <PixelArt svg={WINDOW_META[w.id].icon} className="icon" size="16px" />
            <span>{WINDOW_META[w.id].title.split(' - ')[0]}</span>
          </div>
        ))}
      </div>
      <div className="w98-tray">
        <PixelArt svg={TRAY_NETWORK} className="ticon" size="16px" />
        <PixelArt svg={TRAY_SPEAKER} className="ticon" size="16px" />
        <span className="clock">{time.toTimeString().slice(0,5)}</span>
      </div>
    </div>
  );
};

const CRTMonitor = ({
  wins, setWins,
  liveSettings, onLiveChange,
  savedSettings, applySettings, cancelSettings, resetSettings,
  openWindow,
}) => {
  const screenRef = useRef(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [ctx, setCtx] = useState(null); // { x, y, items }

  const focus = useCallback((id) => {
    setWins((arr) => {
      const maxZ = Math.max(0, ...arr.map((w) => w.z));
      return arr.map((w) => ({
        ...w,
        z: w.id === id ? maxZ + 1 : w.z,
        focused: w.id === id,
        min: w.id === id ? false : w.min,
      }));
    });
  }, [setWins]);

  const move = useCallback((id, dx, dy) => {
    setWins((arr) => arr.map((w) => {
      if (w.id !== id) return w;
      const sr = screenRef.current?.getBoundingClientRect();
      const maxX = sr ? Math.max(0, sr.width - w.w) : 9999;
      const maxY = sr ? Math.max(0, sr.height - 28 - 18) : 9999;
      return {
        ...w,
        x: Math.max(0, Math.min(maxX, w.x + dx)),
        y: Math.max(0, Math.min(maxY, w.y + dy)),
      };
    }));
  }, [setWins]);

  const resize = useCallback((id, dx, dy) => {
    setWins((arr) => arr.map((w) => {
      if (w.id !== id) return w;
      const sr = screenRef.current?.getBoundingClientRect();
      const maxW = sr ? sr.width - w.x : 9999;
      const maxH = sr ? sr.height - 28 - w.y : 9999;
      return {
        ...w,
        w: Math.max(280, Math.min(maxW, w.w + dx)),
        h: Math.max(180, Math.min(maxH, w.h + dy)),
      };
    }));
  }, [setWins]);

  const minimize = useCallback((id) => {
    setWins((arr) => arr.map((w) => w.id === id ? { ...w, min: true, focused: false } : w));
  }, [setWins]);
  const maximize = useCallback((id) => {
    setWins((arr) => arr.map((w) => w.id === id ? { ...w, max: !w.max } : w));
    focus(id);
  }, [setWins, focus]);
  const close = useCallback((id) => {
    setWins((arr) => arr.map((w) => w.id === id ? { ...w, open: false, min: false, max: false, focused: false } : w));
  }, [setWins]);

  const onTaskClick = (id) => {
    const w = wins.find((x) => x.id === id);
    if (!w) return;
    if (w.min || !w.focused) focus(id);
    else minimize(id);
  };

  const onStartAction = (action, payload) => {
    setStartOpen(false);
    if (action === 'open') openWindow(payload);
    else if (action === 'properties') { openWindow('blackhole'); /* SETTINGS tab will be visible via Black Hole UI */ }
    else if (action === 'reset') resetSettings();
    else if (action === 'about') alert('BlackGreenFox 98\nA tribute to the era of beige boxes,\ndial-up modems and big chunky icons.');
    else if (action === 'run') {
      const what = prompt('Run what?', 'blackhole');
      if (what && WINDOW_META[what]) openWindow(what);
    }
    else if (action === 'shutdown') {
      if (confirm('It is now safe to turn off your computer?')) {
        setWins((arr) => arr.map((w) => ({ ...w, open: false, min: false, max: false })));
      }
    }
  };

  const onIconCtxMenu = (winId, x, y) => {
    const sr = screenRef.current.getBoundingClientRect();
    setCtx({
      x: x - sr.left, y: y - sr.top,
      items: [
        { label: <><u>O</u>pen</>,        action: () => openWindow(winId) },
        { sep: true },
        { label: <>Properties</>,        action: () => openWindow(winId) },
      ],
    });
  };

  const onDesktopCtxMenu = (e) => {
    if (e.target.closest('.w98-icon')) return;
    e.preventDefault();
    const sr = screenRef.current.getBoundingClientRect();
    setCtx({
      x: e.clientX - sr.left, y: e.clientY - sr.top,
      items: [
        { label: <><u>R</u>efresh</>,         action: () => { /* visual only */ } },
        { label: <>Arrange <u>I</u>cons</>,   action: () => { /* visual only */ } },
        { sep: true },
        { label: <><u>P</u>roperties…</>,     action: () => openWindow('blackhole') },
      ],
    });
  };

  // Use `onClick` (NOT `onMouseDown`) so that clicks on items inside the
  // Start menu / submenus / context menu can stopPropagation and run their
  // actions before the menu unmounts.
  const onDesktopClick = (e) => {
    // ignore clicks that originated inside the start menu / context menu
    // (those manage their own close logic via useClickOutside)
    if (e.target.closest && (e.target.closest('.w98-startmenu') || e.target.closest('.w98-ctxmenu') || e.target.closest('.w98-taskbar'))) {
      return;
    }
    if (!e.target.closest('.w98-icon')) setSelectedIcon(null);
    if (startOpen) setStartOpen(false);
    if (ctx) setCtx(null);
  };

  return (
    <section className="section">
      <SectionTitle icon={ICON_BHOLE}>MY_DESKTOP.scr — Display Properties</SectionTitle>
      <div className="section-body">
      <div className="crt">
        <div
          className="crt-screen"
          ref={screenRef}
          onClick={onDesktopClick}
          onContextMenu={onDesktopCtxMenu}
        >
          <div className="w98-desktop">
            <W98Icon winId="blackhole" label="Black Hole"      svg={ICON_BHOLE}   onOpen={openWindow} selected={selectedIcon === 'blackhole'} onSelect={setSelectedIcon} onCtxMenu={onIconCtxMenu} />
            <W98Icon winId="snake"     label="Snake.exe"        svg={ICON_SNAKE}   onOpen={openWindow} selected={selectedIcon === 'snake'}     onSelect={setSelectedIcon} onCtxMenu={onIconCtxMenu} />
            <W98Icon winId="gallery"   label="My Pictures"     svg={ICON_GALLERY} onOpen={openWindow} selected={selectedIcon === 'gallery'}   onSelect={setSelectedIcon} onCtxMenu={onIconCtxMenu} />
            <W98Icon winId="github"    label="My Repositories" svg={ICON_GITHUB}  onOpen={openWindow} selected={selectedIcon === 'github'}    onSelect={setSelectedIcon} onCtxMenu={onIconCtxMenu} />
          </div>

          {wins.map((w) => (
            <W98Window
              key={w.id}
              win={w}
              onMove={move} onResize={resize}
              onFocus={focus} onMin={minimize} onMax={maximize} onClose={close}
            >
              {w.id === 'blackhole' && (
                <BlackHoleApp
                  live={liveSettings}
                  onLiveChange={onLiveChange}
                  saved={savedSettings}
                  onApply={applySettings}
                  onCancel={cancelSettings}
                  onReset={resetSettings}
                />
              )}
              {w.id === 'snake'   && <SnakeApp />}
              {w.id === 'gallery' && <GalleryApp />}
              {w.id === 'github'  && <GithubApp />}
            </W98Window>
          ))}

          {startOpen && (
            <StartMenu onAction={onStartAction} onClose={() => setStartOpen(false)} />
          )}
          {ctx && (
            <ContextMenu x={ctx.x} y={ctx.y} items={ctx.items} onClose={() => setCtx(null)} />
          )}

          <Taskbar
            wins={wins}
            onClick={onTaskClick}
            onStartClick={() => setStartOpen((v) => !v)}
            startOpen={startOpen}
          />
        </div>
        <div className="crt-stand" />
      </div>
      </div>
    </section>
  );
};

/* ============================================================
 * 14. Footer — Win98 status bar with sunken segments
 * ============================================================ */

const Footer = () => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <footer className="w98-footer">
      <span className="seg"><span className="led" /> Ready</span>
      <span className="seg grow">
        <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">GITHUB</a>
        &nbsp;·&nbsp;
        <a href="mailto:blackgreenfox0477@gmail.com">EMAIL</a>
        &nbsp;·&nbsp;
        <a href="#hero">↑ TOP</a>
      </span>
      <span className="seg">© {new Date().getFullYear()} BLACKGREENFOX</span>
      <span className="seg">CP-1251 · UA</span>
      <span className="seg">{time.toLocaleDateString()} · {time.toTimeString().slice(0,5)}</span>
    </footer>
  );
};

/* ============================================================
 * 15. App: state + composition
 * ============================================================ */

const DEFAULT_SETTINGS = {
  particles: 100,
  discs: 100,
  speed: 1,
  discColor: '#33ff66',
  particleColor: '#c8ffd1',
  aura: true,
  paused: false,
};
const SETTINGS_KEY = 'bh-settings-v1';

const App = () => {
  const [wins, setWins] = useState(DEFAULT_WINS);

  // saved (persisted) and live (preview while editing) settings
  const [savedSettings, setSavedSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch (_) {}
    return DEFAULT_SETTINGS;
  });
  const [liveSettings, setLiveSettings] = useState(savedSettings);

  const onLiveChange = (patch) => setLiveSettings((s) => ({ ...s, ...patch }));
  const applySettings = () => {
    setSavedSettings(liveSettings);
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(liveSettings)); } catch (_) {}
  };
  const cancelSettings = () => setLiveSettings(savedSettings);
  const resetSettings = () => {
    setLiveSettings(DEFAULT_SETTINGS);
    setSavedSettings(DEFAULT_SETTINGS);
    try { localStorage.removeItem(SETTINGS_KEY); } catch (_) {}
  };

  const openWindow = useCallback((id) => {
    setWins((arr) => {
      const maxZ = Math.max(0, ...arr.map((w) => w.z));
      return arr.map((w) => w.id === id
        ? { ...w, open: true, min: false, focused: true, z: maxZ + 1 }
        : { ...w, focused: false }
      );
    });
  }, []);

  return (
    <>
      <StatusBar />
      <div className="shell">
        <Hero onBoot={openWindow} />
        <ColumnsSection />
        <CRTMonitor
          wins={wins} setWins={setWins}
          liveSettings={liveSettings} onLiveChange={onLiveChange}
          savedSettings={savedSettings}
          applySettings={applySettings} cancelSettings={cancelSettings} resetSettings={resetSettings}
          openWindow={openWindow}
        />
        <Footer />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
