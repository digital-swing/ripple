import alpha from 'color-alpha';
import gsap from 'gsap';

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

  /** If the ripple should be a gradient.
   * @defaultValue `false`
   **/
  gradient: boolean;

  /** Function to generates the gradient spotlight
   * @defaultValue
   * ```
   * (size, x, y, deltaX, deltaY, color) => {
   * return `radial-gradient(${size} at calc(${x} + ${deltaX}) calc(${y} + ${deltaY}), ${color}, transparent)`;
   * }
   *```
   **/
  gradientSpotlight: (
    size: string,
    x: string,
    y: string,
    deltaX: string,
    deltaY: string,
    color: string
  ) => string;

  /**
   * Selector for which the ripple won't be applied.
   * @defaultValue `.disabled, [disabled]`
   */
  ignore: string;

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

  /** Rembmer the ripple position on disable in case of ulterior reenable.
   * @defaultValue `false`
   **/
  rememberPositionOnDisable: boolean;

  /** Function to generates the sharp spotlight
   * @defaultValue
   * ```
   * (size, x, y, deltaX, deltaY, color) => {
   *  return `radial-gradient(${size} at calc(${x} + ${deltaX}) calc(${y} + ${deltaY}), ${color} 0%, ${color} 100%, transparent)`;
   * }
   * ```
   **/
  sharpSpotlight: (
    size: string,
    x: string,
    y: string,
    deltaX: string,
    deltaY: string,
    color: string
  ) => string;

  /** Ripple size.
   * @defaultValue `0`
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

  /** Whether the ripple should follow the cursor.
   * @defaultValue `true`
   **/
  trackCursor: boolean;

  /** Cursor tracking animation duration.
   * @defaultValue `0.1`
   **/
  trackDuration: number;

  /**
   * Tracking easing function.
   * {@link https://greensock.com/docs/v3/Eases | GSAP Eases}
   * @defaultValue `none`
   **/
  trackEase: string;
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
    color: 'rgba(255, 255, 255, 0.7)',
    delay: 0,
    expandDuration: 0.4,
    expandEase: 'none',
    expandOnClick: true,
    expandedFactor: 2,
    fadeOutOnClick: true,
    gradient: false,
    gradientSpotlight: (size, x, y, deltaX, deltaY, color) => {
      return `radial-gradient(${size} ${size} at calc(${x} + ${deltaX}) calc(${y} + ${deltaY}), ${color}, transparent)`;
    },
    ignore: `.disabled, [disabled]`,
    initialX: '50%',
    initialY: '50%',
    on: 'click',
    prefix: 'ripple',
    rememberPositionOnDisable: false,
    sharpSpotlight: (size, x, y, deltaX, deltaY, color) => {
      return `radial-gradient(${size} ${size} at calc(${x} + ${deltaX}) calc(${y} + ${deltaY}), ${color} 0%, ${color} 100%, transparent)`;
    },
    size: '0px',
    target: '.ripple',
    textClip: false,
    toggleDuration: 0.1,
    trackCursor: true,
    trackDuration: 0.1,
    trackEase: 'power4',
  };

  config = { ...config, ...userConfig };
  const rippleTargets: NodeListOf<HTMLElement> = document.querySelectorAll(
    config.target
  );

  rippleTargets.forEach((el) => {
    const isIgnored = () => el.matches(config.ignore);
    let isInit = false;
    let isHovered = false;
    if (isIgnored()) return;

    const ripple = config.gradient
      ? config.gradientSpotlight(
          `var(--${config.prefix}-size)`,
          `var(--${config.prefix}-x)`,
          `var(--${config.prefix}-y)`,
          `var(--${config.prefix}-deltaX)`,
          `var(--${config.prefix}-deltaY)`,
          `var(--${config.prefix}-color)`
        )
      : config.sharpSpotlight(
          `var(--${config.prefix}-size)`,
          `var(--${config.prefix}-x)`,
          `var(--${config.prefix}-y)`,
          `var(--${config.prefix}-deltaX)`,
          `var(--${config.prefix}-deltaY)`,
          `var(--${config.prefix}-color)`
        );

    let initialRippleColor: string;
    let rippleColor: string;
    let initialRippleX: string;
    let rippleX: string;
    let initialRippleY: string;
    let rippleY: string;
    let initialRippleSize: string;
    let rippleSize: string;
    let newBackground: string;
    const originalBackground =
      el.style.backgroundImage !== '' && el.style.backgroundImage !== 'initial'
        ? el.style.backgroundImage
        : getComputedStyle(el).backgroundImage;

    const originalColor = getComputedStyle(el).color;

    function getInitialValues(el: HTMLElement) {
      initialRippleColor = getComputedStyle(el).getPropertyValue(
        `--${config.prefix}-color`
      );
      rippleColor =
        initialRippleColor !== '' ? initialRippleColor : config.color.trim();

      initialRippleX = getComputedStyle(el).getPropertyValue(
        `--${config.prefix}-x`
      );
      rippleX = initialRippleX !== '' ? initialRippleX : config.initialX;

      initialRippleY = getComputedStyle(el).getPropertyValue(
        `--${config.prefix}-y`
      );
      rippleY = initialRippleY !== '' ? initialRippleY : config.initialY;

      initialRippleSize = getComputedStyle(el).getPropertyValue(
        `--${config.prefix}-size`
      );
      rippleSize = initialRippleSize !== '' ? initialRippleSize : config.size;

      newBackground =
        originalBackground !== '' ? `${ripple},${originalBackground}` : ripple;
    }

    function handleMouseEnter(this: HTMLElement) {
      isHovered = true;
      show(el);
    }

    function handleMouseLeave(this: HTMLElement) {
      isHovered = false;
      if (config.on !== 'always') {
        gsap.to(this, {
          [`--${config.prefix}-size`]: 0,
          duration: config.toggleDuration,
          ease: config.trackEase,
        });
      } else {
        gsap.to(this, {
          [`--${config.prefix}-x`]: rippleX,
          [`--${config.prefix}-y`]: rippleY,
          delay: config.delay,
          duration: config.trackDuration,
          ease: config.trackEase,
        });
      }
    }

    function handleMouseMove(this: HTMLElement, e: MouseEvent) {
      if (config.trackCursor) {
        const x = getRelativeMouseX(this, e);
        const y = getRelativeMouseY(this, e);
        gsap.to(this, {
          [`--${config.prefix}-x`]: `${x}%`,
          [`--${config.prefix}-y`]: `${y}%`,
          delay: config.delay,
          duration: config.trackDuration,
          ease: config.trackEase,
        });
      }
    }

    function handleClick(this: HTMLElement): void {
      if (config.fadeOutOnClick || config.expandOnClick) {
        this.removeEventListener('mousemove', handleMouseMove);
        this.removeEventListener('mouseleave', handleMouseLeave);
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

    const show = (ripple: HTMLElement) => {
      gsap.to(ripple, {
        [`--${config.prefix}-size`]: rippleSize,
        duration: config.toggleDuration,
        ease: config.trackEase,
      });
    };

    const init = () => {
      if (config.rememberPositionOnDisable) getInitialValues(el);
      el.style.setProperty(`--${config.prefix}-size`, '0px');
      el.style.setProperty(`--${config.prefix}-x`, rippleX);
      el.style.setProperty(`--${config.prefix}-y`, rippleY);
      el.style.setProperty(`--${config.prefix}-deltaX`, '0px');
      el.style.setProperty(`--${config.prefix}-deltaY`, '0px');
      el.style.setProperty(`--${config.prefix}-color`, rippleColor);
      el.style.setProperty('background-image', newBackground);

      if (config.textClip) {
        newBackground = `${ripple},${originalBackground}, linear-gradient(${originalColor},${originalColor})`;
        el.style.setProperty('background-image', newBackground);
        el.style.setProperty('color', 'transparent');
        el.style.setProperty('-webkit-text-fill-color', 'transparent');
        el.style.setProperty('-webkit-background-clip', 'text');
        el.style.setProperty('background-clip', 'text');
      }

      if (config.on === 'always') {
        show(el);
      }

      if (isHovered) {
        show(el);
      }

      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('click', handleClick);

      isInit = true;
    };
    const disable = () => {
      el.style.removeProperty(`--${config.prefix}-size`);
      el.style.removeProperty(`--${config.prefix}-color`);
      isInit = false;
    };

    getInitialValues(el);
    init();

    const observer = new MutationObserver(() => {
      if (isIgnored()) {
        disable();
      } else if (!isInit) {
        init();
      }
    });

    observer.observe(el, {
      attributes: true,
      childList: false,
      subtree: false,
    });
  });
}
declare global {
  interface Window {
    ripple: typeof ripple;
  }
}
window.ripple = ripple;
