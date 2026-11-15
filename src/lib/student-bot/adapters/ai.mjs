// AI provider boundary. No verified provider is wired in this prototype, so the
// adapter reports "unconfigured" and callers must fall back to deterministic,
// source-backed replies. It never returns invented text.
export const AI_STATUS = Object.freeze({ UNCONFIGURED: 'unconfigured', READY: 'ready' });

export function createAiAdapter({ provider = null } = {}) {
  const configured = Boolean(provider && typeof provider.generate === 'function');
  return {
    status: () => (configured ? AI_STATUS.READY : AI_STATUS.UNCONFIGURED),
    isConfigured: () => configured,
    // Context passed here must already be published BoardPrep text; it is
    // delimited and labelled untrusted for the provider.
    async generate({ question, context }) {
      if (!configured) return { ok: false, code: 'ai_unconfigured' };
      try {
        const text = await provider.generate({ question, untrustedContext: context });
        return typeof text === 'string' && text.trim() ? { ok: true, text: text.trim() } : { ok: false, code: 'ai_empty' };
      } catch {
        return { ok: false, code: 'ai_failed' };
      }
    },
  };
}
