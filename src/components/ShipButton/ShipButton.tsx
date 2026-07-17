import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from 'react';
import { Check, Truck, TriangleAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

type ShipState = 'idle' | 'loading' | 'shipping' | 'crashed' | 'done';

export interface ShipButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
  /**
   * Result of the next run. `'success'` drives the truck across and out;
   * `'failure'` crashes it mid-route (nose-dive, skid marks, dust, the
   * package tossed off the bed) and holds a danger "retry" state until
   * clicked again.
   */
  outcome?: 'success' | 'failure';
  idleLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  /** Fires when a run settles, with the outcome that played out. */
  onResult?: (outcome: 'success' | 'failure') => void;
}

/**
 * Primary action button where the pending state is a small logistics scene:
 * the truck pulls in from the left and stops at the dock, a package drops
 * onto its bed (suspension settles), then it drives the route. Success: it
 * exits right and the button settles into a success state. Failure: it
 * crashes mid-route and the button flips to a danger state that retries on
 * click.
 *
 * All motion is Web Animations API + the ship* keyframes in globals.css, and
 * every color is a design token — accent truck, danger crash, success arrival.
 * The scene always plays: it is the button's loading indicator, so it is not
 * gated behind prefers-reduced-motion (Windows machines with "animation
 * effects" off would otherwise see no pending state at all).
 */
export const ShipButton = ({
  outcome = 'success',
  idleLabel = 'Ship order',
  successLabel = 'Shipped',
  errorLabel = 'Delivery failed · retry',
  onResult,
  className,
  ...props
}: ShipButtonProps) => {
  const [state, setState] = useState<ShipState>('idle');
  const stateRef = useRef<ShipState>('idle');
  const btnRef = useRef<HTMLButtonElement>(null);
  const moverRef = useRef<HTMLSpanElement>(null);
  const truckRef = useRef<SVGSVGElement>(null);
  const pkgRef = useRef<HTMLSpanElement>(null);
  const animsRef = useRef<Animation[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setSt = (next: ShipState) => {
    stateRef.current = next;
    setState(next);
  };

  const track = (anim: Animation) => {
    animsRef.current.push(anim);
    return anim;
  };

  const reset = () => {
    animsRef.current.forEach((a) => a.cancel());
    animsRef.current = [];
    if (timerRef.current) clearTimeout(timerRef.current);
    setSt('idle');
  };

  useEffect(() => reset, []);

  /** Dock position the truck loads at before driving off. */
  const DOCK_X = 22;

  const go = () => {
    const willFail = outcome === 'failure';
    setSt('loading');

    const pullIn = track(
      moverRef.current!.animate(
        [{ transform: 'translateX(-90px)' }, { transform: `translateX(${DOCK_X}px)` }],
        { duration: 500, easing: 'cubic-bezier(.25,.9,.35,1)', fill: 'forwards' },
      ),
    );

    pullIn.onfinish = () => {
      if (stateRef.current !== 'loading') return;

      track(
        pkgRef.current!.animate(
          [
            { opacity: 1, transform: 'translateY(-22px)' },
            { opacity: 1, transform: 'translateY(2px)', offset: 0.7 },
            { opacity: 1, transform: 'translateY(0px)' },
          ],
          { duration: 320, easing: 'cubic-bezier(.2,.9,.3,1.4)', fill: 'forwards' },
        ),
      );
      const settle = track(
        truckRef.current!.animate(
          [
            { transform: 'translateY(0px)' },
            { transform: 'translateY(1.5px)', offset: 0.7 },
            { transform: 'translateY(0px)' },
          ],
          { duration: 320, delay: 180, easing: 'ease-out' },
        ),
      );

      settle.onfinish = () => {
        if (stateRef.current !== 'loading') return;
        timerRef.current = setTimeout(drive, 90);
      };
    };

    const drive = () => {
      setSt('shipping');
      const w = btnRef.current?.offsetWidth ?? 236;
      const driveAnim = track(
        moverRef.current!.animate(
          [
            { transform: `translateX(${DOCK_X}px)` },
            { transform: `translateX(${willFail ? w * 0.4 : w + 26}px)` },
          ],
          {
            duration: willFail ? 700 : 1500,
            easing: willFail ? 'cubic-bezier(.5,0,.85,.5)' : 'cubic-bezier(.45,0,.55,1)',
            fill: 'forwards',
          },
        ),
      );
      driveAnim.onfinish = () => {
        if (stateRef.current !== 'shipping') return;
        if (willFail) {
          setSt('crashed');
          track(
            truckRef.current!.animate(
              [
                { transform: 'rotate(0deg) translateY(0px)' },
                { transform: 'rotate(16deg) translateY(-4px)', offset: 0.35 },
                { transform: 'rotate(12deg) translateY(0px)', offset: 0.65 },
                { transform: 'rotate(14deg) translateY(-1px)' },
              ],
              { duration: 520, easing: 'cubic-bezier(.2,.9,.3,1.4)', fill: 'forwards' },
            ),
          );
          track(
            pkgRef.current!.animate(
              [
                { opacity: 1, transform: 'translateY(0px) rotate(0deg)' },
                { opacity: 1, transform: 'translate(12px, -16px) rotate(45deg)', offset: 0.55 },
                { opacity: 0, transform: 'translate(20px, 4px) rotate(90deg)' },
              ],
              { duration: 600, easing: 'cubic-bezier(.3,.6,.6,1)', fill: 'forwards' },
            ),
          );
          onResult?.('failure');
        } else {
          setSt('done');
          onResult?.('success');
          timerRef.current = setTimeout(reset, 1700);
        }
      };
    };
  };

  const handleClick = () => {
    const st = stateRef.current;
    if (st === 'loading' || st === 'shipping' || st === 'done') return;
    if (st === 'crashed') {
      reset();
      timerRef.current = setTimeout(go, 180);
      return;
    }
    go();
  };

  const busy = state === 'loading' || state === 'shipping';

  const label = (visible: boolean, extra?: string) =>
    cn(
      'absolute inset-0 flex items-center justify-center gap-2 pointer-events-none',
      '[transition:opacity_.18s_ease,transform_.35s_var(--ease-brand)]',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      extra,
    );

  const dash = (w: string) =>
    `repeating-linear-gradient(90deg, var(--text-dim) 0 ${w}, transparent ${w} 9px)`;

  return (
    <button
      ref={btnRef}
      type="button"
      data-state={state}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden w-[236px] h-12 rounded-none border font-semibold text-[15px] tracking-[0.2px] p-0 cursor-pointer',
        'transition-[background-color,border-color] duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        state === 'idle' && 'bg-accent border-accent text-text-on-accent',
        busy && 'bg-bg-card border-border-strong text-text',
        state === 'crashed' && 'bg-danger-faint border-danger text-danger',
        state === 'done' && 'bg-success-faint border-success text-success',
        className,
      )}
      {...props}>
      <span className={label(state === 'idle')}>
        <Truck size={17} aria-hidden="true" />
        {idleLabel}
      </span>
      <span className={label(state === 'done')}>
        <span className={cn('inline-flex', state === 'done' && 'ship-bang-pop')}>
          <Check size={16} aria-hidden="true" />
        </span>
        {successLabel}
      </span>
      <span className={label(state === 'crashed', 'text-[13px]')}>
        <TriangleAlert size={15} aria-hidden="true" />
        {errorLabel}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'absolute left-2 right-2 bottom-1.5 h-0.5 transition-opacity duration-200',
          busy && 'opacity-45',
          state === 'shipping' && 'ship-road-move',
          state === 'crashed' && 'opacity-35',
          (state === 'idle' || state === 'done') && 'opacity-0',
        )}
        style={{
          background:
            'repeating-linear-gradient(90deg, var(--text-dim) 0 10px, transparent 10px 18px)',
        }}
      />

      <span
        ref={moverRef}
        aria-hidden="true"
        className="absolute left-0 bottom-2 w-16 h-[30px] pointer-events-none"
        style={{ transform: 'translateX(-90px)' }}>
        <span
          className={cn(
            'absolute bottom-0 -left-7 w-6 h-[3px] transition-opacity duration-150',
            state === 'crashed' ? 'opacity-90' : 'opacity-0',
          )}
          style={{ background: dash('6px') }}
        />
        <span
          className={cn(
            'absolute bottom-1 -left-5 w-4 h-[3px] transition-opacity duration-150',
            state === 'crashed' ? 'opacity-90' : 'opacity-0',
          )}
          style={{ background: dash('6px') }}
        />
        {([[-4, 0], [4, 0.08], [-10, 0.15]] as const).map(([left, delay]) => (
          <span
            key={left}
            className={cn(
              'absolute bottom-0.5 w-2 h-2 rounded-full bg-text-dim opacity-0',
              state === 'crashed' && 'ship-puff-out',
            )}
            style={{ left, animationDelay: `${delay}s` }}
          />
        ))}
        <span
          className={cn(
            'absolute -top-4 left-[42px] font-medium text-sm text-danger opacity-0',
            state === 'crashed' && 'ship-bang-pop',
          )}>
          !
        </span>
        <span
          ref={pkgRef}
          className="absolute -top-1.5 left-[14px] w-3 h-[9px] opacity-0"
          style={{
            background: 'var(--accent-strong)',
            border: '1px solid var(--bg)',
          }}
        />
        <svg
          ref={truckRef}
          viewBox="0 0 64 30"
          width="64"
          height="30"
          className="origin-[78%_96%]">
          <rect x="1" y="3" width="34" height="17" fill="var(--accent)" />
          <line
            x1="27" y1="3" x2="27" y2="20"
            stroke="var(--bg-card)" strokeWidth="1.4" opacity=".6"
          />
          <path d="M35 8 h11 l8 7 v5 h-19 z" fill="var(--accent)" opacity=".82" />
          <rect x="38" y="10.5" width="7" height="5" fill="var(--bg)" opacity=".85" />
          <g className={cn('[transform-box:fill-box] origin-center', busy && 'ship-wheel-spin')}>
            <circle cx="12" cy="24" r="4.6" fill="none" stroke="var(--text)" strokeWidth="2" />
            <line x1="12" y1="21" x2="12" y2="27" stroke="var(--text)" strokeWidth="1.5" />
          </g>
          <g className={cn('[transform-box:fill-box] origin-center', busy && 'ship-wheel-spin')}>
            <circle cx="47" cy="24" r="4.6" fill="none" stroke="var(--text)" strokeWidth="2" />
            <line x1="47" y1="21" x2="47" y2="27" stroke="var(--text)" strokeWidth="1.5" />
          </g>
        </svg>
      </span>
    </button>
  );
};
ShipButton.displayName = 'ShipButton';
