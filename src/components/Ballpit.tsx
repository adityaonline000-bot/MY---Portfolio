// @ts-nocheck
// Component inspired by Kevin Levron:
// https://x.com/soju22/status/1858925191671271801
'use client';

import React, { useEffect, useRef } from 'react';
import {
  Vector3 as a,
  MeshPhysicalMaterial as c,
  InstancedMesh as d,
  Timer as e,
  AmbientLight as f,
  SphereGeometry as g,
  Scene as i,
  Color as l,
  Object3D as m,
  SRGBColorSpace as n,
  MathUtils as o,
  PMREMGenerator as p,
  Vector2 as r,
  WebGLRenderer as s,
  PerspectiveCamera as t,
  PointLight as u,
  ACESFilmicToneMapping as v,
  Plane as w,
  Raycaster as y
} from 'three';
import { RoomEnvironment as z } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface BallpitProps {
  className?: string;
  style?: React.CSSProperties;
  count?: number;
  colors?: (number | string)[];
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  minSize?: number;
  maxSize?: number;
  maxVelocity?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  materialParams?: {
    metalness?: number;
    roughness?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
  };
}

class x {
  #e;
  canvas;
  camera;
  cameraMinAspect;
  cameraMaxAspect;
  cameraFov;
  maxPixelRatio;
  minPixelRatio;
  scene;
  renderer;
  #t;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render = this.#i;
  onBeforeRender = () => {};
  onAfterRender = () => {};
  onAfterResize = () => {};
  #s = false;
  #n = false;
  #boundResize = this.#f.bind(this);
  #boundVisibilityChange = this.#v.bind(this);
  isDisposed = false;
  #o;
  #r;
  #a;
  #c = new e();
  #h = { elapsed: 0, delta: 0 };
  #l;

  constructor(e) {
    this.#e = { ...e };
    this.#m();
    this.#d();
    this.#p();
    this.resize();
    this.#g();
  }

  #m() {
    this.camera = new t();
    this.cameraFov = this.camera.fov;
  }

  #d() {
    this.scene = new i();
  }

  #p() {
    if (this.#e.canvas) {
      this.canvas = this.#e.canvas;
    } else if (this.#e.id) {
      this.canvas = document.getElementById(this.#e.id);
    } else {
      console.error('Three: Missing canvas or id parameter');
      return;
    }
    this.canvas.style.display = 'block';
    const e = {
      canvas: this.canvas,
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
      ...(this.#e.rendererOptions ?? {})
    };
    this.renderer = new s(e);
    this.renderer.outputColorSpace = n;
  }

  #g() {
    if (!(this.#e.size instanceof Object)) {
      window.addEventListener('resize', this.#boundResize);
      if (this.#e.size === 'parent' && this.canvas?.parentNode) {
        this.#r = new ResizeObserver(this.#f.bind(this));
        this.#r.observe(this.canvas.parentNode);
      }
    }
    if (this.canvas) {
      this.#o = new IntersectionObserver(this.#u.bind(this), {
        root: null,
        rootMargin: '0px',
        threshold: 0
      });
      this.#o.observe(this.canvas);
    }
    document.addEventListener('visibilitychange', this.#boundVisibilityChange);
  }

  #y() {
    window.removeEventListener('resize', this.#boundResize);
    this.#r?.disconnect();
    this.#o?.disconnect();
    document.removeEventListener('visibilitychange', this.#boundVisibilityChange);
  }

  #u(e) {
    this.#s = e[0]?.isIntersecting ?? true;
    if (this.#s) this.#w();
    else this.#z();
  }

  #v() {
    if (this.#s) {
      if (document.hidden) this.#z();
      else this.#w();
    }
  }

  #f() {
    if (this.#a) clearTimeout(this.#a);
    this.#a = setTimeout(this.resize.bind(this), 100);
  }

  resize() {
    if (!this.canvas) return;
    let w = window.innerWidth;
    let h = window.innerHeight;

    if (this.#e.size instanceof Object) {
      w = this.#e.size.width || window.innerWidth;
      h = this.#e.size.height || window.innerHeight;
    } else if (this.#e.size === 'parent' && this.canvas.parentNode) {
      w = this.canvas.parentNode.offsetWidth || window.innerWidth;
      h = this.canvas.parentNode.offsetHeight || window.innerHeight;
    }

    w = Math.max(1, w);
    h = Math.max(1, h);

    this.size.width = w;
    this.size.height = h;
    this.size.ratio = w / h;
    this.#x();
    this.#b();
    this.onAfterResize(this.size);
  }

  #x() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.#A(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.#A(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  #A(e) {
    const t = Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / e);
    this.camera.fov = 2 * o.radToDeg(Math.atan(t));
  }

  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const e = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(e / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    } else if (this.camera.isOrthographicCamera) {
      this.size.wHeight = this.camera.top - this.camera.bottom;
      this.size.wWidth = this.camera.right - this.camera.left;
    }
  }

  #b() {
    if (!this.renderer) return;
    this.renderer.setSize(this.size.width, this.size.height);
    this.#t?.setSize(this.size.width, this.size.height);
    let e = window.devicePixelRatio || 1;
    if (this.maxPixelRatio && e > this.maxPixelRatio) {
      e = this.maxPixelRatio;
    } else if (this.minPixelRatio && e < this.minPixelRatio) {
      e = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(e);
    this.size.pixelRatio = e;
  }

  get postprocessing() {
    return this.#t;
  }

  set postprocessing(e) {
    this.#t = e;
    this.render = e.render.bind(e);
  }

  #w() {
    if (this.#n) return;
    const animate = () => {
      this.#l = requestAnimationFrame(animate);
      this.#c.update();
      this.#h.delta = this.#c.getDelta();
      this.#h.elapsed += this.#h.delta;
      this.onBeforeRender(this.#h);
      this.render();
      this.onAfterRender(this.#h);
    };
    this.#n = true;
    this.#c.reset();
    animate();
  }

  #z() {
    if (this.#n) {
      cancelAnimationFrame(this.#l);
      this.#n = false;
    }
  }

  #i() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  clear() {
    if (!this.scene) return;
    this.scene.traverse(e => {
      if (e.isMesh && typeof e.material === 'object' && e.material !== null) {
        Object.keys(e.material).forEach(t => {
          const i = e.material[t];
          if (i !== null && typeof i === 'object' && typeof i.dispose === 'function') {
            i.dispose();
          }
        });
        e.material?.dispose();
        e.geometry?.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.#y();
    this.#z();
    this.#c.dispose();
    this.clear();
    this.#t?.dispose();
    if (this.renderer) {
      this.renderer.dispose();
    }
    this.isDisposed = true;
  }
}

const b = new Map(),
  A = new r();
let R = false;

function S(e) {
  const t = {
    position: new r(),
    nPosition: new r(),
    hover: false,
    touching: false,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    ...e
  };

  (function (e, t) {
    if (!b.has(e)) {
      b.set(e, t);
      if (!R && typeof document !== 'undefined') {
        document.body.addEventListener('pointermove', M, { passive: true });
        document.body.addEventListener('pointerleave', L, { passive: true });
        document.body.addEventListener('click', C, { passive: true });
        R = true;
      }
    }
  })(e.domElement, t);

  t.dispose = () => {
    const el = e.domElement;
    b.delete(el);
    if (b.size === 0 && typeof document !== 'undefined') {
      document.body.removeEventListener('pointermove', M);
      document.body.removeEventListener('pointerleave', L);
      document.body.removeEventListener('click', C);
      R = false;
    }
  };

  return t;
}

function M(e) {
  A.x = e.clientX;
  A.y = e.clientY;
  processInteraction();
}

function processInteraction() {
  for (const [elem, t] of b) {
    if (!elem) continue;
    const i = elem.getBoundingClientRect();
    if (D(i)) {
      P(t, i);
      if (!t.hover) {
        t.hover = true;
        t.onEnter(t);
      }
      t.onMove(t);
    } else if (t.hover && !t.touching) {
      t.hover = false;
      t.onLeave(t);
    }
  }
}

function C(e) {
  A.x = e.clientX;
  A.y = e.clientY;
  for (const [elem, t] of b) {
    if (!elem) continue;
    const i = elem.getBoundingClientRect();
    P(t, i);
    if (D(i)) t.onClick(t);
  }
}

function L() {
  for (const t of b.values()) {
    if (t.hover) {
      t.hover = false;
      t.onLeave(t);
    }
  }
}

function P(e, t) {
  const { position: i, nPosition: s } = e;
  i.x = A.x - t.left;
  i.y = A.y - t.top;
  s.x = t.width ? (i.x / t.width) * 2 - 1 : 0;
  s.y = t.height ? (-i.y / t.height) * 2 + 1 : 0;
}

function D(e) {
  const { x: t, y: i } = A;
  const { left: s, top: n, width: o, height: r } = e;
  return t >= s && t <= s + o && i >= n && i <= n + r;
}

const { randFloat: k, randFloatSpread: E } = o;
const F = new a();
const I = new a();
const O = new a();
const V = new a();
const B = new a();
const N = new a();
const _ = new a();
const j = new a();
const H = new a();
const T = new a();

class W {
  constructor(e) {
    this.config = e;
    this.positionData = new Float32Array(3 * e.count).fill(0);
    this.velocityData = new Float32Array(3 * e.count).fill(0);
    this.sizeData = new Float32Array(e.count).fill(1);
    this.center = new a();
    this.#R();
    this.setSizes();
  }

  #R() {
    const { config: e, positionData: t } = this;
    this.center.toArray(t, 0);
    const mx = Math.max(1, e.maxX || 5);
    const my = Math.max(1, e.maxY || 5);
    const mz = Math.max(1, e.maxZ || 2);
    for (let i = 1; i < e.count; i++) {
      const s = 3 * i;
      t[s] = E(2 * mx);
      t[s + 1] = E(2 * my);
      t[s + 2] = E(2 * mz);
    }
  }

  setSizes() {
    const { config: e, sizeData: t } = this;
    t[0] = e.size0 || 1;
    for (let i = 1; i < e.count; i++) {
      t[i] = k(e.minSize || 0.5, e.maxSize || 1);
    }
  }

  update(e) {
    const { config: t, center: i, positionData: s, sizeData: n, velocityData: o } = this;
    let r = 0;
    if (t.controlSphere0) {
      r = 1;
      F.fromArray(s, 0);
      F.lerp(i, 0.1).toArray(s, 0);
      V.set(0, 0, 0).toArray(o, 0);
    }
    const delta = Math.min(e.delta || 0.016, 0.05);
    for (let idx = r; idx < t.count; idx++) {
      const base = 3 * idx;
      I.fromArray(s, base);
      B.fromArray(o, base);
      B.y -= delta * (t.gravity ?? 0.01) * n[idx];
      B.multiplyScalar(t.friction ?? 0.9975);
      B.clampLength(0, t.maxVelocity ?? 0.15);
      I.add(B);
      I.toArray(s, base);
      B.toArray(o, base);
    }
    const maxX = Math.max(1, t.maxX || 5);
    const maxY = Math.max(1, t.maxY || 5);
    const maxZ = Math.max(1, t.maxZ || 2);

    for (let idx = r; idx < t.count; idx++) {
      const base = 3 * idx;
      I.fromArray(s, base);
      B.fromArray(o, base);
      const radius = n[idx];
      for (let jdx = idx + 1; jdx < t.count; jdx++) {
        const otherBase = 3 * jdx;
        O.fromArray(s, otherBase);
        N.fromArray(o, otherBase);
        const otherRadius = n[jdx];
        _.copy(O).sub(I);
        const dist = _.length();
        const sumRadius = radius + otherRadius;
        if (dist < sumRadius && dist > 0.0001) {
          const overlap = sumRadius - dist;
          j.copy(_)
            .normalize()
            .multiplyScalar(0.5 * overlap);
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));
          I.sub(j);
          B.sub(H);
          I.toArray(s, base);
          B.toArray(o, base);
          O.add(j);
          N.add(T);
          O.toArray(s, otherBase);
          N.toArray(o, otherBase);
        }
      }
      if (t.controlSphere0) {
        _.copy(F).sub(I);
        const dist = _.length();
        const sumRadius0 = radius + (n[0] || 1);
        if (dist < sumRadius0 && dist > 0.0001) {
          const diff = sumRadius0 - dist;
          j.copy(_.normalize()).multiplyScalar(diff);
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));
          I.sub(j);
          B.sub(H);
        }
      }
      if (Math.abs(I.x) + radius > maxX) {
        I.x = Math.sign(I.x) * (maxX - radius);
        B.x = -B.x * (t.wallBounce ?? 0.95);
      }
      if (t.gravity === 0) {
        if (Math.abs(I.y) + radius > maxY) {
          I.y = Math.sign(I.y) * (maxY - radius);
          B.y = -B.y * (t.wallBounce ?? 0.95);
        }
      } else if (I.y - radius < -maxY) {
        I.y = -maxY + radius;
        B.y = -B.y * (t.wallBounce ?? 0.95);
      }
      const maxBoundary = Math.max(maxZ, t.maxSize || 1);
      if (Math.abs(I.z) + radius > maxBoundary) {
        I.z = Math.sign(I.z) * (maxZ - radius);
        B.z = -B.z * (t.wallBounce ?? 0.95);
      }
      I.toArray(s, base);
      B.toArray(o, base);
    }
  }
}

const X = {
  count: 90,
  colors: ['#D4AF37', '#8C6D4F', '#C9A45C', '#F3E5AB', '#1A1614'],
  ambientColor: 0xffffff,
  ambientIntensity: 1.2,
  lightIntensity: 250,
  materialParams: {
    metalness: 0.85,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.01,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: false
};

const U = new m();

class Z extends d {
  constructor(renderer, t = {}) {
    const i = { ...X, ...t };
    let envTexture = null;
    try {
      const pmrem = new p(renderer);
      const room = new z();
      envTexture = pmrem.fromScene(room).texture;
      pmrem.dispose();
    } catch (error) {
      console.warn('Ballpit environment map creation failed; using the material fallback.', error);
    }

    const geom = new g(1, 24, 16);
    const mat = new c({
      envMap: envTexture,
      metalness: i.materialParams?.metalness ?? 0.85,
      roughness: i.materialParams?.roughness ?? 0.18,
      clearcoat: i.materialParams?.clearcoat ?? 1,
      clearcoatRoughness: i.materialParams?.clearcoatRoughness ?? 0.1
    });
    if (mat.envMapRotation) {
      mat.envMapRotation.x = -Math.PI / 2;
    }

    super(geom, mat, i.count);
    this.config = i;
    this.physics = new W(i);
    this.#S();
    this.setColors(i.colors);
  }

  #S() {
    this.ambientLight = new f(this.config.ambientColor || 0xffffff, this.config.ambientIntensity ?? 1.2);
    this.add(this.ambientLight);
    this.light = new u(this.config.colors?.[0] || 0xd4af37, this.config.lightIntensity ?? 250);
    this.add(this.light);
  }

  setColors(e) {
    if (Array.isArray(e) && e.length > 0) {
      const colors = e.map(col => new l(col));
      for (let idx = 0; idx < this.count; idx++) {
        const ratio = this.count > 1 ? idx / (this.count - 1) : 0;
        const scaled = ratio * (colors.length - 1);
        const i0 = Math.floor(scaled);
        const i1 = Math.min(colors.length - 1, i0 + 1);
        const f = scaled - i0;
        const col = colors[i0].clone().lerp(colors[i1], f);
        this.setColorAt(idx, col);
        if (idx === 0 && this.light) {
          this.light.color.copy(col);
        }
      }
      if (this.instanceColor) {
        this.instanceColor.needsUpdate = true;
      }
    }
  }

  update(e) {
    this.physics.update(e);
    for (let idx = 0; idx < this.count; idx++) {
      U.position.fromArray(this.physics.positionData, 3 * idx);
      if (idx === 0 && this.config.followCursor === false) {
        U.scale.setScalar(0);
      } else {
        U.scale.setScalar(this.physics.sizeData[idx]);
      }
      U.updateMatrix();
      this.setMatrixAt(idx, U.matrix);
      if (idx === 0 && this.light) {
        this.light.position.copy(U.position);
      }
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

function createBallpit(canvas, t = {}) {
  const i = new x({
    canvas,
    size: 'parent',
    rendererOptions: { antialias: true, alpha: true }
  });
  let s = null;

  if (i.renderer) {
    i.renderer.toneMapping = v;
  }
  i.camera.position.set(0, 0, 20);
  i.camera.lookAt(0, 0, 0);
  i.cameraMaxAspect = 1.5;

  function initialize(props) {
    if (s) {
      i.clear();
      i.scene.remove(s);
    }
    if (i.renderer) {
      s = new Z(i.renderer, props);
      i.scene.add(s);
      if (i.size?.wWidth && i.size?.wHeight) {
        s.config.maxX = Math.max(1, i.size.wWidth / 2);
        s.config.maxY = Math.max(1, i.size.wHeight / 2);
      }
    }
  }

  // Initialize spheres first
  initialize(t);
  i.resize();

  i.onAfterResize = size => {
    if (s && s.config) {
      s.config.maxX = Math.max(1, (size.wWidth || 10) / 2);
      s.config.maxY = Math.max(1, (size.wHeight || 10) / 2);
    }
  };

  const n = new y();
  const o = new w(new a(0, 0, 1), 0);
  const r = new a();
  let paused = false;

  canvas.style.touchAction = 'none';
  canvas.style.userSelect = 'none';

  const h = S({
    domElement: canvas,
    onMove() {
      if (!s) return;
      n.setFromCamera(h.nPosition, i.camera);
      i.camera.getWorldDirection(o.normal);
      n.ray.intersectPlane(o, r);
      s.physics.center.copy(r);
      s.config.controlSphere0 = true;
    },
    onLeave() {
      if (s) s.config.controlSphere0 = false;
    }
  });

  i.onBeforeRender = time => {
    if (!paused && s) {
      s.update(time);
    }
  };

  return {
    three: i,
    get spheres() {
      return s;
    },
    setCount(count) {
      if (s) initialize({ ...s.config, count });
    },
    updateConfig(newProps) {
      if (!s) return;
      if (newProps.count !== undefined && newProps.count !== s.config.count) {
        initialize({ ...s.config, ...newProps });
      } else {
        Object.assign(s.config, newProps);
        if (newProps.colors) {
          s.setColors(s.config.colors);
        }
        if (newProps.minSize !== undefined || newProps.maxSize !== undefined || newProps.size0 !== undefined) {
          s.physics.setSizes();
        }
      }
    },
    togglePause() {
      paused = !paused;
    },
    dispose() {
      h.dispose();
      i.dispose();
    }
  };
}

export const Ballpit: React.FC<BallpitProps> = ({ className = '', followCursor = false, style, ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spheresInstanceRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      spheresInstanceRef.current = createBallpit(canvas, { followCursor, ...props });
    } catch (err) {
      console.error('Failed to initialize Ballpit:', err);
    }

    return () => {
      if (spheresInstanceRef.current) {
        try {
          spheresInstanceRef.current.dispose();
        } catch (error) {
          console.error('Failed to dispose Ballpit:', error);
        }
        spheresInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (spheresInstanceRef.current) {
      try {
        spheresInstanceRef.current.updateConfig({ followCursor, ...props });
      } catch (error) {
        console.error('Failed to update Ballpit configuration:', error);
      }
    }
  }, [props, followCursor]);

  return <canvas className={className} ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', ...style }} />;
};

export default Ballpit;
