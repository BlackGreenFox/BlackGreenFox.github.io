const LinkStyle = {textDecoration:'none', color: 'black'};

class Draggable extends React.Component {
  constructor() {
    super();
    this.state = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2,
      dragging: false,
      relX: 0,
      relY: 0
    };
  }

  onPanStart = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX, clientY;
    
    if (e.type === 'dragstart') {
      e.dataTransfer.setDragImage(this.getDragImage(), 0, 0);
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;
    
    this.setState({ 
      dragging: true,
      relX: relX,
      relY: relY
    });
  };

  onPan = e => {
    if (!this.state.dragging) return false;
    
    let clientX, clientY;
    
    if (e.type === 'drag') {
      if (e.clientX === 0 && e.clientY === 0) return false;
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    if (clientX <= 0 || clientY <= 0) return false;
    
    this.setState({ 
      x: clientX - this.state.relX + 232,
      y: clientY - this.state.relY + 332
    });
  };

  onPanEnd = e => {
    this.setState({ dragging: false });
  };
  
  getDragImage() {
    let img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    return img;
  }
  
  render() {
    const { x, y, dragging } = this.state;
    const { children } = this.props;
    
    return (
      <div draggable="true"
        className="dib move"
        style={{
          display: 'inline-block',
          cursor: 'move',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${x - 232}px, ${y - 332}px, 0)`,
        }}
        onTouchStart={this.onPanStart}
        onDragStart={this.onPanStart}
        onDrag={this.onPan}
        onTouchMove={this.onPan}
        onTouchEnd={this.onPanEnd}
        onDragEnd={this.onPanEnd}>
        {children}
      </div>
    ); 
  }
}

const Topbar = (props) => {
  return (
  <section id='topbar'>
          <div className='flex row' id='topbarback'>
            <div className='flex row fifty'>
              <i className="fas fa-circle logo"></i>   <span className='logotext'>blackhole.exe</span>
            </div>
            <div className='flex row fifty end'>
              <div className='window button hover'>
             <i className="fas fa-minus topbarbutton minus"></i>
              </div>
                            <div className='window button hover'>
              <i className="far fa-window-maximize topbarbutton"></i>
              </div>
                            <div className='window button hover' onClick={()=>props.toggleView('closed')}>
              <i className="fas fa-times topbarbutton"></i>
              </div>
            </div>
          </div>
        </section>
  )
}

const Menu = () => {
  return (
  <section id='menu'>
            <ul className='flex row' id='menulist'>
              <li className='menuitem hover'>File</li>
              <li className='menuitem hover'>Edit</li>
              <li className='menuitem hover'>View</li>
              <li className='menuitem hover'>Options</li>
              <li className='menuitem hover'>Help</li>
            </ul>
        </section>
  )
}

const DesktopIcon = (props) => {
  return (
    <div className='flex column hover' id='desktopcontainer' onDoubleClick={()=>props.toggleView('full')}>
      <i className="fas fa-circle" style={{fontSize: '35px', color: 'black'}}></i>
      <span id='igdesktop'>Black Hole</span>
      </div>
  )
}

// Easing utilities
const easingUtils = {
  linear: (t) => t,
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
};

// Black Hole Component
class AHole extends HTMLElement {
  connectedCallback() {
    this.canvas = this.querySelector(".js-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.discs = [];
    this.lines = [];

    this.setSize();
    this.setDiscs();
    this.setLines();
    this.setParticles();

    this.bindEvents();
    requestAnimationFrame(this.tick.bind(this));
  }

  bindEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    this.setSize();
    this.setDiscs();
    this.setLines();
    this.setParticles();
  }

  setSize() {
    this.rect = this.getBoundingClientRect();
    this.render = {
      width: this.rect.width,
      height: this.rect.height,
      dpi: window.devicePixelRatio,
    };
    this.canvas.width = this.render.width * this.render.dpi;
    this.canvas.height = this.render.height * this.render.dpi;
  }

  setDiscs() {
    const { width, height } = this.rect;
    this.discs = [];

    this.startDisc = {
      x: width * 0.5,
      y: height * 0.45,
      w: width * 0.75,
      h: height * 0.7,
    };

    this.endDisc = {
      x: width * 0.5,
      y: height * 0.95,
      w: 0,
      h: 0,
    };

    const totalDiscs = 100;
    let prevBottom = height;
    this.clip = {};

    for (let i = 0; i < totalDiscs; i++) {
      const p = i / totalDiscs;
      const disc = this.tweenDisc({ p });
      const bottom = disc.y + disc.h;

      if (bottom <= prevBottom) {
        this.clip = { disc: { ...disc }, i };
      }
      prevBottom = bottom;
      this.discs.push(disc);
    }

    this.clip.path = new Path2D();
    this.clip.path.ellipse(
      this.clip.disc.x,
      this.clip.disc.y,
      this.clip.disc.w,
      this.clip.disc.h,
      0,
      0,
      Math.PI * 2
    );
    this.clip.path.rect(
      this.clip.disc.x - this.clip.disc.w,
      0,
      this.clip.disc.w * 2,
      this.clip.disc.y
    );
  }

  setLines() {
    const { width, height } = this.rect;
    this.lines = [];
    const totalLines = 100;
    const linesAngle = (Math.PI * 2) / totalLines;

    for (let i = 0; i < totalLines; i++) {
      this.lines.push([]);
    }

    this.discs.forEach((disc) => {
      for (let i = 0; i < totalLines; i++) {
        const angle = i * linesAngle;
        const p = {
          x: disc.x + Math.cos(angle) * disc.w,
          y: disc.y + Math.sin(angle) * disc.h,
        };
        this.lines[i].push(p);
      }
    });

    this.linesCanvas = new OffscreenCanvas(width, height);
    const ctx = this.linesCanvas.getContext("2d");

    this.lines.forEach((line, i) => {
      ctx.save();
      let lineIsIn = false;
      line.forEach((p1, j) => {
        if (j === 0) return;
        const p0 = line[j - 1];

        if (!lineIsIn && (ctx.isPointInPath(this.clip.path, p1.x, p1.y) ||
            ctx.isPointInStroke(this.clip.path, p1.x, p1.y))) {
          lineIsIn = true;
        } else if (lineIsIn) {
          ctx.clip(this.clip.path);
        }

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      });
      ctx.restore();
    });

    this.linesCtx = ctx;
  }

  setParticles() {
    const { width, height } = this.rect;
    this.particles = [];
    this.particleArea = {
      sw: this.clip.disc.w * 0.5,
      ew: this.clip.disc.w * 2,
      h: height * 0.85,
    };
    this.particleArea.sx = (width - this.particleArea.sw) / 2;
    this.particleArea.ex = (width - this.particleArea.ew) / 2;

    const totalParticles = 100;
    for (let i = 0; i < totalParticles; i++) {
      const particle = this.initParticle(true);
      this.particles.push(particle);
    }
  }

  initParticle(start = false) {
    const sx = this.particleArea.sx + this.particleArea.sw * Math.random();
    const ex = this.particleArea.ex + this.particleArea.ew * Math.random();
    const dx = ex - sx;
    const y = start ? this.particleArea.h * Math.random() : this.particleArea.h;
    const r = 0.5 + Math.random() * 4;
    const vy = 0.5 + Math.random();

    return {
      x: sx,
      sx,
      dx,
      y,
      vy,
      p: 0,
      r,
      c: `rgba(255, 255, 255, ${Math.random()})`,
    };
  }

  tweenValue(start, end, p, ease = false) {
    const delta = end - start;
    const easeFn = easingUtils[ease ? "easeInExpo" : "linear"];
    return start + delta * easeFn(p);
  }

  drawDiscs() {
    const { ctx } = this;
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    // Outer disc
    const outerDisc = this.startDisc;
    ctx.beginPath();
    ctx.ellipse(outerDisc.x, outerDisc.y, outerDisc.w, outerDisc.h, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    // Discs
    this.discs.forEach((disc, i) => {
      if (i % 5 !== 0) return;
      if (disc.w < this.clip.disc.w - 5) {
        ctx.save();
        ctx.clip(this.clip.path);
      }
      ctx.beginPath();
      ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      if (disc.w < this.clip.disc.w - 5) {
        ctx.restore();
      }
    });
  }

  drawLines() {
    const { ctx, linesCanvas } = this;
    ctx.drawImage(linesCanvas, 0, 0);
  }

  drawParticles() {
    const { ctx } = this;
    ctx.save();
    ctx.clip(this.clip.path);
    this.particles.forEach((particle) => {
      ctx.fillStyle = particle.c;
      ctx.beginPath();
      ctx.rect(particle.x, particle.y, particle.r, particle.r);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();
  }

  moveDiscs() {
    this.discs.forEach((disc) => {
      disc.p = (disc.p + 0.001) % 1;
      this.tweenDisc(disc);
    });
  }

  moveParticles() {
    this.particles.forEach((particle) => {
      particle.p = 1 - particle.y / this.particleArea.h;
      particle.x = particle.sx + particle.dx * particle.p;
      particle.y -= particle.vy;
      if (particle.y < 0) {
        Object.assign(particle, this.initParticle());
      }
    });
  }

  tweenDisc(disc) {
    disc.x = this.tweenValue(this.startDisc.x, this.endDisc.x, disc.p);
    disc.y = this.tweenValue(this.startDisc.y, this.endDisc.y, disc.p, "inExpo");
    disc.w = this.tweenValue(this.startDisc.w, this.endDisc.w, disc.p);
    disc.h = this.tweenValue(this.startDisc.h, this.endDisc.h, disc.p);
    return disc;
  }

  tick(time) {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.scale(this.render.dpi, this.render.dpi);
    this.moveDiscs();
    this.moveParticles();
    this.drawDiscs();
    this.drawLines();
    this.drawParticles();
    ctx.restore();
    requestAnimationFrame(this.tick.bind(this));
  }
}

// Register custom element
if (!customElements.get('a-hole')) {
  customElements.define('a-hole', AHole);
}

const BlackHoleDisplay = () => {
  const containerRef = React.useRef(null);
  
  React.useEffect(() => {
    // Create black hole element
    const aHole = document.createElement('a-hole');
    const holeCanvas = document.createElement('canvas');
    holeCanvas.className = 'js-canvas';
    
    const aura = document.createElement('div');
    aura.className = 'aura';
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    aHole.appendChild(holeCanvas);
    aHole.appendChild(aura);
    aHole.appendChild(overlay);
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(aHole);
    
    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id='blackHoleDisplay'>
      <div style={{padding: '10px', textAlign: 'center', height: '450px', overflow: 'hidden'}}>
        <h3 style={{margin: '0 0 10px 0', fontFamily: 'VT323, monospace', fontSize: '18px'}}>
          Singularity Visualization v1.0
        </h3>
        <div 
          ref={containerRef} 
          id="blackHoleContainer"
          style={{
            width: '100%',
            height: '400px',
            background: '#000',
            position: 'relative'
          }}
        />
        <div style={{marginTop: '10px', fontSize: '14px', fontFamily: 'VT323, monospace'}}>
          <div>Event Horizon: Active</div>
          <div>Gravitational Lens: Engaged</div>
          <div>Quantum State: Stable</div>
        </div>
      </div>
      <hr/>
    </section>
  );
};

const BottomNav = () => {
  return (
    <section id='bottomNav'>
      <div className='flex row'>
        <button className='window twenty hover'>
          <i className="fas fa-home"></i>
        </button>
        <button className='window twenty hover'>
          <i className="fas fa-search"></i>
        </button>
        <button className='window twenty hover'>
          <i className="fas fa-cog"></i>
        </button>
        <button className='window twenty hover'>
          <i className="fas fa-chart-bar"></i>
        </button>
        <button className='window twenty hover'>
          <i className="fas fa-info-circle"></i>
        </button>
      </div>
      </section>
  )
}
const SnakeIcon = (props) => {
  return (
    <div className='flex column hover' id='snakecontainer' style={{position: 'fixed', bottom: '100px', right: '20px'}} onDoubleClick={()=>props.toggleSnakeWindow('open')}>
      <i className="fas fa-gamepad" style={{fontSize: '35px', color: 'black'}}></i>
      <span style={{color: 'white', fontWeight: '100', marginLeft: '-10px', textShadow: '1px 1px 2px black'}}>Snake Game</span>
    </div>
  )
}
const App = () => {
  const [view, toggleView] = React.useState('full');
  const [snakeWindow, toggleSnakeWindow] = React.useState('closed');
  
  return (
    <>
      <DesktopIcon toggleView={toggleView}/>
      <SnakeIcon toggleSnakeWindow={toggleSnakeWindow}/>
      
      {/* Вікно чорної діри */}
      <Draggable>
        <section id="instagramcontainer" className={view === 'full' ? 'window' : 'closed'}>
          <Topbar toggleView={toggleView}/>
          <Menu/>
          <BlackHoleDisplay/>
          <BottomNav/>
        </section>
      </Draggable>
      
      {/* Вікно гри Snake */}
      <Draggable>
        <section id="snakeWindow" className={snakeWindow === 'open' ? 'window' : 'closed'} style={{width: '800px', height: '600px'}}>
          <section id='topbar'>
            <div className='flex row' id='topbarback'>
              <div className='flex row fifty'>
                <i className="fas fa-gamepad logo"></i>   
                <span className='logotext'>snake.exe</span>
              </div>
              <div className='flex row fifty end'>
                <div className='window button hover' onClick={()=>toggleSnakeWindow('closed')}>
                  <i className="fas fa-times topbarbutton"></i>
                </div>
              </div>
            </div>
          </section>
          <iframe 
            src="snake.html" 
            style={{
              width: '100%', 
              height: 'calc(100% - 25px)', 
              border: 'none',
              background: '#000'
            }}
            title="Snake Game"
          />
        </section>
      </Draggable>
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));