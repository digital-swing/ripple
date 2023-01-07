import alpha from 'color-alpha';
import { gsap } from 'gsap';

/**
 * TODO allow various animation libraries / custom properties animation
 * {@link https://css-tricks.com/build-complex-css-transitions-using-custom-properties-and-cubic-bezier/}
 *
 **/
/** Ripple parameters. */
export interface RippleConfig {
  /**
   * Ripple color.
   * @defaultValue `#ffffff42`
   **/
  color: string;

  /** Lag before the ripple moves.
   * @defaultValue `0`
   */
  delay: number;

  /**
   * Easing function.
   * {@link https://greensock.com/docs/v3/Eases | GSAP Eases}
   * @defaultValue `none`
   **/
  ease: string;

  /** Ripple display animation duration in seconds.
   * @defaultValue `0.4`
   **/
  expandDuration: number;

  /**
   * Grow animation easing function.
   * @remarks
   * See {@link https://greensock.com/docs/v3/Eases | GSAP Eases} for possible easings.
   * @defaultValue `none`
   **/
  expandEase: string;

  /** Whether the ripple should grow when the target is clicked.
   * @defaultValue `true`
   **/
  expandOnClick: boolean;

  /** Target element size multiplier to determine ripple expanded size (when `expandOnClick: true`). Rela
   * @defaultValue `2`
   **/
  expandedFactor: number;

  /** Whether the ripple should fade out when the target is clicked.
   * @defaultValue `true`
   **/
  fadeOutOnClick: boolean;

  /** Whether the ripple should follow the cursor.
   * @defaultValue `true`
   **/
  followCursor: boolean;

  /** If the ripple should be a gradient.
   * @defaultValue `false`
   **/
  gradient: boolean;

  /**
   * Initial horizontal relative position, expressed in percent.
   * @defaultValue `50%`
   **/
  initialX: string;

  /**
   * Initial vertical relative position, expressed in percent.
   * @defaultValue `50%`
   **/
  initialY: string;

  /** Event that triggers the ripple.
   * @defaultValue `click`
   **/
  on: 'always' | 'click' | 'hover';

  /** Prefix to css vars.
   * @defaultValue `ripple`
   **/
  prefix: string;

  /** Ripple size.
   * @defaultValue `50px`
   **/
  size: string;

  /** Target selector. e.g.
   * ```
   * target : '.ripple-text';
   * ```
   * @defaultValue `.ripple`
   */
  target: string;

  /** Whether the ripple should apply as a text clip.
   * @defaultValue `false`
   **/
  textClip: boolean;

  /** Ripple display animation duration in seconds.
   * @defaultValue `0.1`
   **/
  toggleDuration: number;

  /** Cursor tracking animation duration.
   * @defaultValue `0.1`
   **/
  trackDuration: number;
}

function getRelativeMouseX(element: HTMLElement, mouseEvent: MouseEvent) {
  const rect = element.getBoundingClientRect();
  const x =
    (100 * (mouseEvent.pageX - rect.left - window.scrollX)) /
    element.offsetWidth;
  return x;
}

function getRelativeMouseY(element: HTMLElement, mouseEvent: MouseEvent) {
  const rect = element.getBoundingClientRect();
  const y =
    (100 * (mouseEvent.pageY - rect.top - window.scrollY)) /
    element.offsetHeight;
  return y;
}

/**
 * Initializes the ripple effect.
 * @param  userConfig - Custom user config. {@link RippleConfig | See detailed options.}
 *
 */
export function ripple(userConfig?: Partial<RippleConfig>) {
  let config: RippleConfig = {
    color: '#ffffff42',
    delay: 0, // seconds
    ease: 'power4',
    expandDuration: 0.4, // seconds
    expandEase: 'none',
    expandOnClick: true,
    expandedFactor: 2,
    fadeOutOnClick: true,
    followCursor: true,
    gradient: false,
    initialX: '50%',
    initialY: '50%',
    on: 'click',
    prefix: 'ripple',
    size: '50px',
    target: '.ripple',
    textClip: false,
    toggleDuration: 0.1,
    // seconds
    trackDuration: 0.1,
  };

  config = { ...config, ...userConfig };
  if (config.textClip && !CSS.supports('background-clip', 'text')) {
    console.warn(
      "Browser doesn't support background-clip:'text' property. Skipping ripple initialization."
    );
    return;
  }

  const rippleTargets: NodeListOf<HTMLElement> = document.querySelectorAll(
    config.target
  );

  rippleTargets.forEach((el) => {
    const initialRippleColor = getComputedStyle(el).getPropertyValue(
      `--${config.prefix}-color`
    );
    const rippleColor =
      initialRippleColor !== '' ? initialRippleColor : config.color.trim();
    const initialRippleX = getComputedStyle(el).getPropertyValue(
      `--${config.prefix}-x`
    );
    const rippleX = initialRippleX !== '' ? initialRippleX : config.initialX;
    const initialRippleY = getComputedStyle(el).getPropertyValue(
      `--${config.prefix}-y`
    );
    const rippleY = initialRippleY !== '' ? initialRippleY : config.initialY;
    const initialRippleSize = getComputedStyle(el).getPropertyValue(
      `--${config.prefix}-size`
    );
    const rippleSize =
      initialRippleSize !== '' ? initialRippleSize : config.size;
    const ripple = config.gradient
      ? `radial-gradient(var(--${config.prefix}-size) at var(--${config.prefix}-x) var(--${config.prefix}-y), var(--${config.prefix}-color), transparent)`
      : `radial-gradient(var(--${config.prefix}-size) at var(--${config.prefix}-x) var(--${config.prefix}-y), var(--${config.prefix}-color) 0%, var(--${config.prefix}-color) 100%, transparent)`;

    let newBackgroundImage = ripple;

    const originalColor = getComputedStyle(el).color;
    el.style.setProperty(`--${config.prefix}-size`, '0px');
    el.style.setProperty(`--${config.prefix}-x`, rippleX);
    el.style.setProperty(`--${config.prefix}-y`, rippleY);
    el.style.setProperty(`--${config.prefix}-color`, rippleColor);

    if (config.textClip) {
      newBackgroundImage = `${newBackgroundImage}, linear-gradient(${originalColor},${originalColor})`;
      el.style.setProperty('color', 'transparent');
      el.style.setProperty('-webkit-text-fill-color', 'transparent');
      el.style.setProperty('background-clip', 'text');
    }
    if (config.on === 'always') {
      gsap.to(el, {
        [`--${config.prefix}-size`]: rippleSize,
        duration: config.toggleDuration,
        ease: config.ease,
      });
    }

    el.addEventListener('mouseenter', handleMouseEnter);
    function handleMouseEnter(this: HTMLElement) {
      this.style.setProperty('background-image', newBackgroundImage);
      if (config.on === 'hover') {
        gsap.to(this, {
          [`--${config.prefix}-size`]: rippleSize,
          duration: config.toggleDuration,
          ease: config.ease,
        });
      }
    }

    el.addEventListener('mousemove', handleMouseMove);
    function handleMouseMove(this: HTMLElement, e: MouseEvent) {
      if (config.followCursor) {
        const x = getRelativeMouseX(this, e);
        const y = getRelativeMouseY(this, e);
        gsap.to(this, {
          [`--${config.prefix}-x`]: `${x}%`,
          [`--${config.prefix}-y`]: `${y}%`,
          delay: config.delay,
          duration: config.trackDuration,
          ease: config.ease,
        });
      }
    }

    el.addEventListener('mouseleave', handleMouseLeave);
    function handleMouseLeave(this: HTMLElement) {
      if (config.on !== 'always') {
        gsap.to(this, {
          [`--${config.prefix}-size`]: 0,
          duration: config.toggleDuration,
          ease: config.ease,
        });
      } else {
        gsap.to(this, {
          [`--${config.prefix}-x`]: rippleX,
          [`--${config.prefix}-y`]: rippleY,
          delay: config.delay,
          duration: config.trackDuration,
          ease: config.ease,
        });
      }
    }

    el.addEventListener('click', handleClick);
    function handleClick(this: HTMLElement): void {
      if (config.fadeOutOnClick || config.expandOnClick) {
        this.removeEventListener('mousemove', handleMouseMove);
        this.removeEventListener('mouseleave', handleMouseLeave);
        this.removeEventListener('mouseenter', handleMouseEnter);
      }

      const transparentColor = alpha(rippleColor, 0);
      const rippleExpandedSize = `${
        Math.max(el.offsetHeight, el.offsetWidth) * config.expandedFactor
      }px`;
      const tl = gsap.timeline();
      tl.fromTo(
        this,
        {
          [`--${config.prefix}-color`]: rippleColor,
          [`--${config.prefix}-size`]: rippleSize,
        },
        {
          [`--${config.prefix}-color`]: config.fadeOutOnClick
            ? transparentColor
            : rippleColor,
          [`--${config.prefix}-size`]: config.expandOnClick
            ? `${rippleExpandedSize}`
            : rippleSize,
          duration: config.expandDuration,
          ease: config.expandEase,
          onComplete: () => {
            if (config.fadeOutOnClick) {
              this.addEventListener('mousemove', handleMouseMove);
              this.addEventListener('mouseleave', handleMouseLeave);
              this.addEventListener('mouseenter', handleMouseEnter);
            }
          },
        }
      );
      if (config.on !== 'click' && config.fadeOutOnClick) {
        tl.fromTo(
          this,
          {
            [`--${config.prefix}-color`]: transparentColor,
            [`--${config.prefix}-size`]: 0,
          },
          {
            [`--${config.prefix}-color`]: rippleColor,
            [`--${config.prefix}-size`]: rippleSize,
            duration: config.expandDuration,
            ease: config.expandEase,
          }
        );
      }
    }
  });
}
