import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";

/**
 * Usage (parent):
 *
 * const pokeRef = useRef(null);
 * <PokemonCatchController ref={pokeRef} />
 * <div onClick={(e) => pokeRef.current?.catchPokemon(e)}>Click me</div>
 *
 * Or trigger without event:
 * pokeRef.current?.catchPokemon();
 *
 * Notes:
 * - No button rendered inside this component.
 * - Parent can directly call catchPokemon(e?) to play animation.
 * - Ripple is optional: if you pass a MouseEvent, it uses viewport coords.
 */
const PokemonCatchController = forwardRef(function PokemonCatchController(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [ripples, setRipples] = useState([]);
  // add ramdom pokemon selection 1-151,finished
  const randomId = Math.floor(Math.random() * 151) + 1;
  const pokemon = `https://www.gstatic.com/videogames/pokemon/animation/${randomId}.svg`; // default pokemon image

  const open = useCallback(() => {
    setIsOpen(true);
    window.setTimeout(() => setIsOpen(false), 2600);
  }, []);

  // parent-callable function
  const catchPokemon = useCallback(
    (e) => {
      // optional ripple (if event exists)
      if (e?.clientX != null && e?.clientY != null) {
        const id = Math.random().toString(36).slice(2);
        setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }
      open();
    },
    [open]
  );

  // expose to parent
  useImperativeHandle(ref, () => ({
    catchPokemon,
    open: () => catchPokemon(),
    close: () => setIsOpen(false),
    isOpen: () => isOpen,
  }));

  const styles = useMemo(
    () => ({
      overlay: {
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,.25)",
        backdropFilter: "blur(2px)",
      },

      // ripples (viewport-based, since now no button rect)
      rippleDot: (x, y) => ({
        position: "fixed",
        left: x,
        top: y,
        width: 12,
        height: 12,
        borderRadius: 999,
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        background: "rgba(255,255,255,.35)",
        animation: "poke_ripple 560ms ease-out forwards",
        zIndex: 1000000,
      }),

      stage: {
        position: "relative",
        width: "min(520px, 92vw)",
        aspectRatio: "1 / 1",
        borderRadius: 24,
        overflow: "hidden",
      },

      close: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 12,
        border: 0,
        cursor: "pointer",
        background: "rgba(0,0,0,.08)",
        color: "#111",
        fontWeight: 900,
        zIndex: 2,
      },

      flash: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 500,
        height: 500,
        transform: "translate(-50%,-50%) scale(.9)",
        backgroundImage:
          'url("https://www.gstatic.com/videogames/pokemon/animation/flash.png")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "13500px 500px",
        opacity: 0,
        animation: "poke_flashPlay 900ms steps(27) 1 forwards",
        pointerEvents: "none",
      },

      shadow: {
        position: "absolute",
        left: "50%",
        top: "62%",
        width: "52%",
        transform: "translateX(-50%)",
        opacity: 0.25,
      },

      frame: {
        position: "absolute",
        left: "50%",
        top: "40%",
        width: "48%",
        transform: "translate(-50%,-50%)",
        filter: "drop-shadow(0 12px 16px rgba(0,0,0,.2))",
        animation:
          "poke_pokemonFlash 180ms ease-out 1 620ms, poke_pokemonCapture 520ms ease-in forwards 640ms",
      },

      ball: {
        position: "absolute",
        left: "15%",
        top: "70%",
        width: "18%",
        transform: "translate(-50%,-50%)",
        animation:
          "poke_ballThrow 1100ms cubic-bezier(.2,.9,.2,1) forwards, poke_ballShake 900ms ease-in-out 1150ms 1 forwards",
      },

      hint: {
        position: "absolute",
        left: 16,
        bottom: 14,
        font: "700 14px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial",
        color: "#333",
        opacity: 0.85,
        userSelect: "none",
      },
    }),
    []
  );

  return (
    <>
      {/* Keyframes injected once (React-friendly) */}
      <style>{`
        @keyframes poke_ripple {
          0% { opacity: .8; transform: translate(-50%,-50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(22); }
        }

        @keyframes poke_flashPlay {
          0% { opacity: 0; background-position: 0 0; }
          8% { opacity: 1; }
          100% { opacity: 0; background-position: -13000px 0; }
        }

        @keyframes poke_ballThrow {
          0%   { left: 15%; top: 78%; transform: translate(-50%,-50%) rotate(0deg) scale(1); }
          45%  { left: 55%; top: 25%; transform: translate(-50%,-50%) rotate(220deg) scale(1.02); }
          100% { left: 55%; top: 62%; transform: translate(-50%,-50%) rotate(520deg) scale(1); }
        }

        @keyframes poke_ballShake {
          0%{ transform: translate(-50%,-50%) rotate(520deg); }
          15%{ transform: translate(calc(-50% - 10px), -50%) rotate(520deg); }
          30%{ transform: translate(calc(-50% + 10px), -50%) rotate(520deg); }
          45%{ transform: translate(calc(-50% - 8px), -50%) rotate(520deg); }
          60%{ transform: translate(calc(-50% + 8px), -50%) rotate(520deg); }
          100%{ transform: translate(-50%,-50%) rotate(520deg); }
        }

        @keyframes poke_pokemonFlash {
          0%{ filter: brightness(1) drop-shadow(0 12px 16px rgba(0,0,0,.2)); }
          50%{ filter: brightness(2.2) drop-shadow(0 12px 16px rgba(0,0,0,.2)); }
          100%{ filter: brightness(1) drop-shadow(0 12px 16px rgba(0,0,0,.2)); }
        }

        @keyframes poke_pokemonCapture {
          0%{ transform: translate(-50%,-50%) scale(1); opacity: 1; }
          60%{ transform: translate(-50%,-50%) scale(.6); opacity: 1; }
          100%{ transform: translate(-46%, 22%) scale(.05); opacity: 0; }
        }
      `}</style>

      {/* Optional ripple (viewport based) */}
      {ripples.map((r) => (
        <span key={r.id} style={styles.rippleDot(r.x, r.y)} />
      ))}

      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            style={styles.stage}
            role="img"
            aria-label="Playing Pokemon catch animation"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div style={styles.flash} />

            <img
              alt=""
              style={styles.shadow}
              src="https://www.gstatic.com/videogames/pokemon/animation/shadow.png"
            />

            <img
              alt="pokemon"
              style={styles.frame}
              src={pokemon}
            />

            <img
              alt="pokeball"
              style={styles.ball}
              src="https://www.gstatic.com/videogames/pokemon/pokeball.svg"
            />

            <div style={styles.hint}>Gotcha!</div>
          </div>
        </div>
      )}
    </>
  );
});

export default PokemonCatchController;
