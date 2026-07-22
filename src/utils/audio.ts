/**
 * Real-time Cinematic Synthesizer using Web Audio API.
 * Synthesizes a deep sub-bass drone, wind/ocean breeze sweeps,
 * and warm, evolving celestial harmony that corresponds to the sunrise progress.
 */

export class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private subOsc1: OscillatorNode | null = null;
  private subOsc2: OscillatorNode | null = null;
  private subGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  
  // Harmonic chords representing "Knowledge rising" (A major / E major chords)
  private padOscs: OscillatorNode[] = [];
  private padGain: GainNode | null = null;
  private padFilter: BiquadFilterNode | null = null;

  // Noise generator for wind/ocean breeze
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private noiseLFO: OscillatorNode | null = null;

  private isInitialized = false;

  constructor() {}

  public init() {
    if (this.isInitialized) return;

    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      // Master Gain
      this.masterVolume = this.ctx.createGain();
      this.masterVolume.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterVolume.connect(this.ctx.destination);

      // Lowpass Filter for deep sub-bass
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(80, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.0, this.ctx.currentTime);
      this.filter.connect(this.masterVolume);

      // 1. Sub-Bass Drone: 43.6Hz (F1) and 65.4Hz (C2) - extremely warm and heavy
      this.subOsc1 = this.ctx.createOscillator();
      this.subOsc1.type = "triangle";
      this.subOsc1.frequency.setValueAtTime(43.65, this.ctx.currentTime); // F1
      
      this.subOsc2 = this.ctx.createOscillator();
      this.subOsc2.type = "sine";
      this.subOsc2.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2

      this.subGain = this.ctx.createGain();
      this.subGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

      this.subOsc1.connect(this.subGain);
      this.subOsc2.connect(this.subGain);
      this.subGain.connect(this.filter);

      this.subOsc1.start();
      this.subOsc2.start();

      // 2. Celestial Harmony Pad (Evolving chord: F#m7 -> A maj -> E maj as sunrise occurs)
      this.padFilter = this.ctx.createBiquadFilter();
      this.padFilter.type = "lowpass";
      this.padFilter.frequency.setValueAtTime(250, this.ctx.currentTime);
      this.padFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);
      this.padFilter.connect(this.masterVolume);

      this.padGain = this.ctx.createGain();
      this.padGain.gain.setValueAtTime(0.0, this.ctx.currentTime); // Starts silent
      this.padGain.connect(this.padFilter);

      // Chords: E3 (164.8Hz), A3 (220.0Hz), C#4 (277.2Hz), E4 (329.6Hz)
      const freqs = [164.81, 220.00, 277.18, 329.63];
      freqs.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        // Detune slightly for lush thickness
        osc.detune.setValueAtTime((Math.random() - 0.5) * 15, this.ctx.currentTime);
        
        osc.connect(this.padGain!);
        osc.start();
        this.padOscs.push(osc);
      });

      // 3. Gentle Ocean/Wind sweep (using a white noise approximation)
      this.noiseFilter = this.ctx.createBiquadFilter();
      this.noiseFilter.type = "bandpass";
      this.noiseFilter.frequency.setValueAtTime(300, this.ctx.currentTime);
      this.noiseFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);
      this.noiseFilter.connect(this.masterVolume);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      this.noiseGain.connect(this.noiseFilter);

      // Generate White Noise Buffer
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      whiteNoise.connect(this.noiseGain);
      whiteNoise.start();

      // Slow LFO to sweep the wind filter automatically
      this.noiseLFO = this.ctx.createOscillator();
      this.noiseLFO.type = "sine";
      this.noiseLFO.frequency.setValueAtTime(0.08, this.ctx.currentTime); // extremely slow

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(100, this.ctx.currentTime); // Sweeps 100Hz around center
      
      this.noiseLFO.connect(lfoGain);
      lfoGain.connect(this.noiseFilter.frequency);
      this.noiseLFO.start();

      // Smooth fade in master
      this.masterVolume.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 3.0);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Failed to initialize Cinematic Audio Engine:", e);
    }
  }

  /**
   * Update the audio state based on the sunrise progress (0 to 1).
   * 0: Pre-dawn, dark, pure wind and sub-bass
   * 0.3: First light, chords begin to whisper
   * 0.6: Sunrise, chords swell, filter opens
   * 1.0: Full gold dawn, glorious bright warmth
   */
  public updateState(progress: number) {
    if (!this.ctx || !this.isInitialized) return;

    const now = this.ctx.currentTime;

    // 1. Bass filter opens up slightly as dawn approaches, gaining warm low-mids
    if (this.filter) {
      const baseFreq = 70 + progress * 40; // 70Hz to 110Hz
      this.filter.frequency.setTargetAtTime(baseFreq, now, 0.5);
    }

    // 2. Celestial pad: Starts silent, begins to whisper at 0.15 progress, swells beautifully up to 1.0
    if (this.padGain && this.padFilter) {
      let targetPadGain = 0;
      let targetFilterFreq = 200;

      if (progress > 0.15) {
        // Linear scale from 0.15 to 1.0
        const factor = (progress - 0.15) / 0.85;
        targetPadGain = factor * 0.45; // Max 45% volume for pads
        targetFilterFreq = 200 + factor * 600; // Opens filter up to 800Hz
      }

      this.padGain.gain.setTargetAtTime(targetPadGain, now, 0.6);
      this.padFilter.frequency.setTargetAtTime(targetFilterFreq, now, 0.8);
    }

    // 3. Ocean Wind sweep: Slightly louder and more active at pre-dawn, gets tranquil and hushed at sunrise
    if (this.noiseGain && this.noiseFilter) {
      const targetNoiseGain = 0.08 * (1.0 - progress * 0.4); // slightly quieter at full dawn
      const centerFreq = 350 - progress * 100; // lower breeze frequency for a warmer feel

      this.noiseGain.gain.setTargetAtTime(targetNoiseGain, now, 0.5);
      this.noiseFilter.frequency.setTargetAtTime(centerFreq, now, 1.0);
    }
  }

  public setMute(muted: boolean) {
    if (!this.ctx || !this.isInitialized || !this.masterVolume) return;
    const now = this.ctx.currentTime;
    const targetVal = muted ? 0 : 0.8;
    this.masterVolume.gain.linearRampToValueAtTime(targetVal, now + 1.0); // 1s smooth fade
  }

  public stop() {
    if (!this.ctx || !this.isInitialized || !this.masterVolume) return;
    try {
      const now = this.ctx.currentTime;
      this.masterVolume.gain.linearRampToValueAtTime(0, now + 1.5);
      setTimeout(() => {
        if (this.ctx && this.ctx.state !== "closed") {
          this.ctx.close();
        }
        this.isInitialized = false;
      }, 1600);
    } catch (e) {
      console.error(e);
    }
  }
}
