"use client";

import React, { useEffect, useRef } from "react";

export interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  className?: string;
}

// Bayer 8x8 ordered dithering matrix as LUMINANCE uint8 texture data
const BAYER_SRC = [
   0, 48, 12, 60,  3, 51, 15, 63,
  32, 16, 44, 28, 35, 19, 47, 31,
   8, 56,  4, 52, 11, 59,  7, 55,
  40, 24, 36, 20, 43, 27, 39, 23,
   2, 50, 14, 62,  1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29,
  10, 58,  6, 54,  9, 57,  5, 53,
  42, 26, 38, 22, 41, 25, 37, 21,
];
const BAYER_8X8 = new Uint8Array(BAYER_SRC.map((v) => Math.round((v / 64) * 255)));

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
  precision mediump float;
  uniform vec2  u_res;
  uniform float u_time;
  uniform vec3  u_color;
  uniform float u_colorNum;
  uniform float u_freq;
  uniform float u_amp;
  uniform float u_pixel;
  uniform sampler2D u_bayer;

  vec3 _m3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 _m2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 _p3(vec3 x) { return _m3(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865, 0.366025404, -0.577350270, 0.024390244);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy  -= i1;
    i = _m2(i);
    vec3 p = _p3(_p3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m  = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m * m * m;
    vec3 x2 = 2.0 * fract(p * C.www) - 1.0;
    vec3 h   = abs(x2) - 0.5;
    vec3 a0  = x2 - floor(x2 + 0.5);
    m *= 1.79284291 - 0.85373472 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 1.0;
    for (int i = 0; i < 3; i++) {
      v += a * abs(snoise(p));
      p *= u_freq;
      a *= u_amp;
    }
    return v;
  }

  void main() {
    vec2 fc = floor(gl_FragCoord.xy / u_pixel) * u_pixel + 0.5;
    vec2 uv = (fc / u_res) - 0.5;
    uv.x   *= u_res.x / u_res.y;

    vec2  pp = uv - u_time;
    float f1 = fbm(pp);
    float f  = fbm(uv + f1);

    vec2  bp    = mod(floor(gl_FragCoord.xy / u_pixel), 8.0);
    float bayer = texture2D(u_bayer, (bp + 0.5) / 8.0).r - 0.25;

    float inv       = u_colorNum - 1.0;
    float colorStep = 1.0 / inv;
    float val       = clamp(f + bayer * colorStep - 0.2, 0.0, 1.0);
    float quantized = floor(val * inv + 0.5) / inv;

    gl_FragColor = vec4(u_color * quantized, 1.0);
  }
`;

function makeShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("[Dither] Shader compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function makeProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const v = makeShader(gl, gl.VERTEX_SHADER,   VERT);
  const f = makeShader(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!v || !f) return null;
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("[Dither] Program link error:", gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

function DitherComponent({
  waveSpeed = 0.02,
  waveFrequency = 2.5,
  waveAmplitude = 0.35,
  waveColor = [0.85, 0.85, 0.85],
  colorNum = 4,
  pixelSize = 3,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.4,
  className = "",
}: DitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  const pr = useRef({ waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, disableAnimation, enableMouseInteraction, mouseRadius });
  pr.current = { waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, disableAnimation, enableMouseInteraction, mouseRadius };

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const gl = (
      canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl")
    ) as WebGLRenderingContext | null;

    if (!gl) return;

    const program = makeProgram(gl);
    if (!program) return;

    const quadBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const bayerTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, bayerTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 8, 8, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, BAYER_8X8);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    const aPos  = gl.getAttribLocation(program,  "a_pos");
    const uRes  = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uCol  = gl.getUniformLocation(program, "u_color");
    const uCN   = gl.getUniformLocation(program, "u_colorNum");
    const uFreq = gl.getUniformLocation(program, "u_freq");
    const uAmp  = gl.getUniformLocation(program, "u_amp");
    const uPx   = gl.getUniformLocation(program, "u_pixel");
    const uBay  = gl.getUniformLocation(program, "u_bayer");

    let W = 0, H = 0;
    let time = 0;

    const drawFrame = (currentTime: number) => {
      if (W <= 0 || H <= 0) return;
      const p = pr.current;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uRes,  W, H);
      gl.uniform1f(uTime, currentTime);
      gl.uniform3f(uCol,  p.waveColor[0], p.waveColor[1], p.waveColor[2]);
      gl.uniform1f(uCN,   p.colorNum);
      gl.uniform1f(uFreq, p.waveFrequency);
      gl.uniform1f(uAmp,  p.waveAmplitude);
      gl.uniform1f(uPx,   Math.max(1, p.pixelSize));

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, bayerTex);
      gl.uniform1i(uBay, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const resize = () => {
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0 && (W !== newW || H !== newH)) {
        W = newW;
        H = newH;
        canvas.width  = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
        // Redraw immediately when resized so canvas buffer is never left empty/black
        drawFrame(time);
      }
    };

    // Initial resize + synchronous first frame paint immediately!
    resize();
    drawFrame(0);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf = 0;
    const render = () => {
      const p = pr.current;
      if (!p.disableAnimation) time += p.waveSpeed * 0.25;

      drawFrame(time);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(quadBuf);
      gl.deleteTexture(bayerTex);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full pointer-events-none"
      />
    </div>
  );
}

const Dither = React.memo(DitherComponent);
export default Dither;

