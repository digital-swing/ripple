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

  /** Animation duration.
   * @defaultValue `0`
   **/
  duration: number;

  /**
   * Easing function.
   * {@link https://greensock.com/docs/v3/Eases | GSAP Eases}
   * @defaultValue `none`
   **/
  easing: string;

  /** Whether the ripple should grow when the target is clicked.
   * @defaultValue `true`
   **/
  expandOnClick: boolean;

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
   * Initial horizontal relative position, expressed in percent. e.g.
   * ```
   * initialX : '30%';
   * ```
   * @defaultValue `50%`
   **/
  initialX: string;

  /**
   * Initial vertical relative position, expressed in percent. e.g.
   * ```
   * initialY : '30%';
   * ```
   * @defaultValue `50%`
   **/
  initialY: string;

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

  /** Event that triggers the ripple.
   * @defaultValue `click`
   **/
  trigger: 'always' | 'click' | 'hover';
}

/**
 * Initializes the ripple effect.
 * @param  userConfig - Custom user config. {@link RippleConfig | See detailed options.}
 *
 */
export function ripple(userConfig?: Partial<RippleConfig>) {
  let config: RippleConfig = {
    color: '#ffffff42',
    // seconds
    delay: 0,
    duration: 0,
    easing: 'power4',
    expandOnClick: true,
    fadeOutOnClick: true,
    followCursor: true,
    gradient: false,
    initialX: '50%',
    initialY: '50%',
    size: '50px',
    target: '.ripple',
    textClip: false,
    toggleDuration: 0.1, // seconds
    trigger: 'click',
  };

  config = { ...config, ...userConfig };

  const rippleTargets: NodeListOf<HTMLElement> = document.querySelectorAll(
    config.target
  );

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

  rippleTargets.forEach((el) => {
    const initialRippleColor =
      getComputedStyle(el).getPropertyValue('--ripple-color');
    const rippleColor =
      initialRippleColor !== '' ? initialRippleColor : config.color.trim();
    const initialRippleX = getComputedStyle(el).getPropertyValue('--ripple-x');
    const rippleX = initialRippleX !== '' ? initialRippleX : config.initialX;
    const initialRippleY = getComputedStyle(el).getPropertyValue('--ripple-y');
    const rippleY = initialRippleY !== '' ? initialRippleY : config.initialY;
    const initialRippleSize =
      getComputedStyle(el).getPropertyValue('--ripple-size');
    const rippleSize =
      initialRippleSize !== '' ? initialRippleSize : config.size;
    const ripple = config.gradient
      ? `radial-gradient(var(--ripple-size) at var(--ripple-x) var(--ripple-y), var(--ripple-color), transparent)`
      : `radial-gradient(var(--ripple-size) at var(--ripple-x) var(--ripple-y), var(--ripple-color) 0%, var(--ripple-color) 100%, transparent)`;

    let newBackgroundImage = ripple;

    const originalColor = getComputedStyle(el).color;

    if (config.textClip) {
      newBackgroundImage = `${newBackgroundImage}, linear-gradient(${originalColor},${originalColor})`;

      el.style.setProperty('color', 'transparent');
      el.style.setProperty('-webkit-text-fill-color', 'transparent');
      el.style.setProperty('background-clip', 'text');
      el.style.setProperty('-webkit-background-clip', 'text');
    }

    if (config.trigger === 'always') {
      el.style.setProperty('--ripple-size', rippleSize);
    } else {
      el.style.setProperty('--ripple-size', '0px');
    }
    el.style.setProperty('--ripple-x', rippleX);
    el.style.setProperty('--ripple-y', rippleY);
    el.style.setProperty('--ripple-color', rippleColor);
    el.style.setProperty('background-image', newBackgroundImage);

    el.addEventListener('mouseenter', handleMouseEnter);
    function handleMouseEnter(this: HTMLElement) {
      this.style.setProperty('background-image', newBackgroundImage);
      if (config.trigger === 'hover') {
        gsap.to(this, {
          '--ripple-size': rippleSize,
          duration: config.toggleDuration,
          ease: config.easing,
        });
      }
    }

    el.addEventListener('mousemove', handleMouseMove);
    function handleMouseMove(this: HTMLElement, e: MouseEvent) {
      if (config.followCursor) {
        const x = getRelativeMouseX(this, e);
        const y = getRelativeMouseY(this, e);
        gsap.to(this, {
          '--ripple-x': `${x}%`,
          '--ripple-y': `${y}%`,
          delay: config.delay,
          duration: config.duration,
          ease: config.easing,
        });
      }
    }

    el.addEventListener('mouseleave', handleMouseLeave);
    function handleMouseLeave(this: HTMLElement) {
      if (config.trigger !== 'always') {
        gsap.to(this, {
          '--ripple-size': 0,
          duration: config.toggleDuration,
          ease: config.easing,
        });
      } else {
        gsap.to(this, {
          '--ripple-x': rippleX,
          '--ripple-y': rippleY,
          delay: config.delay,
          duration: config.duration,
          ease: config.easing,
        });
      }
    }

    el.addEventListener('click', handleClick);
    function handleClick(this: HTMLElement, e: MouseEvent) {
      if (config.fadeOutOnClick || config.expandOnClick) {
        this.removeEventListener('mousemove', handleMouseMove);
        this.removeEventListener('mouseleave', handleMouseLeave);
        this.removeEventListener('mouseenter', handleMouseEnter);
      }

      const tl = gsap.timeline();
      tl.fromTo(
        this,
        {
          '--ripple-color': rippleColor,
          '--ripple-size': rippleSize,
        },
        {
          '--ripple-color': config.fadeOutOnClick
            ? import('color-alpha').then(({ default: alpha }) =>
                alpha(rippleColor, 0)
              )
            : rippleColor,
          '--ripple-size': config.expandOnClick
            ? `${parseFloat(rippleSize) * 2}${gsap.utils.getUnit(rippleSize)}`
            : rippleSize,
          duration: 1,
          ease: 'power1.out',
          onComplete: () => {
            if (config.fadeOutOnClick) {
              this.addEventListener('mousemove', handleMouseMove);
              this.addEventListener('mouseleave', handleMouseLeave);
              this.addEventListener('mouseenter', handleMouseEnter);
            }
          },
        }
      );
      if (config.trigger !== 'click' && config.fadeOutOnClick) {
        tl.fromTo(
          this,
          {
            '--ripple-color': import('color-alpha').then(({ default: alpha }) =>
              alpha(rippleColor, 0)
            ),
            '--ripple-size': 0,
          },
          {
            '--ripple-color': rippleColor,
            '--ripple-size': rippleSize,
            duration: 1,
            ease: 'power4',
          }
        );
      }
    }
  });
}
