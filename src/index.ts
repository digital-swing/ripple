import { gsap } from 'gsap';
/**
 * TODO allow various animation libraries / custom properties animation
 * @see https://css-tricks.com/build-complex-css-transitions-using-custom-properties-and-cubic-bezier/
 *
 **/

type RippleConfig = {
  color: string;
  delay: number;
  duration: number;
  easing: string;
  expandOnClick: boolean;
  fadeOutOnClick: boolean;
  followCursor: boolean;
  gradient: boolean;
  initialX: string;
  initialY: string;
  setTransparentText: boolean;
  size: string;
  target: string;
  toggleDuration: number;
  trigger: 'always' | 'click' | 'hover';
};

export default function (userConfig?: Partial<RippleConfig>) {
  const configDefaults: RippleConfig = {
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
    setTransparentText: false,
    size: '50px',
    target: '.ripple',
    toggleDuration: 0.1, // seconds
    trigger: 'click',
  };

  const config = { ...configDefaults, ...userConfig };

  const rippleElements: NodeListOf<HTMLElement> = document.querySelectorAll(
    config.target
  );

  // if ('registerProperty' in CSS) {
  //   if (!CSS.supports('(--ripple-x: 50%)')) {
  //     // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
  //     // @ts-ignore eslint-disable-next-line  @typescript-eslint/ban-ts-comment
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     CSS.registerProperty({
  //       name: '--ripple-x',
  //       syntax: '<percentage>',
  //       inherits: false,
  //       initialValue: '50%',
  //     });
  //   }

  //   if (!CSS.supports('(--ripple-y: 50%)')) {
  //     // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     window.CSS.registerProperty({
  //       name: '--ripple-y',
  //       syntax: '<percentage>',
  //       inherits: false,
  //       initialValue: '50%',
  //     });
  //   }

  //   if (!CSS.supports('(--ripple-size: 50%)')) {
  //     // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     window.CSS.registerProperty({
  //       name: '--ripple-size',
  //       syntax: '<number>',
  //       inherits: false,
  //       initialValue: '0px',
  //     });
  //   }

  //   if (!CSS.supports('(--ripple-color: #000)')) {
  //     // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     window.CSS.registerProperty({
  //       name: '--ripple-color',
  //       syntax: '<color>',
  //       inherits: false,
  //       initialValue: 'rgba(0,0,0,0)',
  //     });
  //   }
  // }
  rippleElements.forEach((el) => {
    // el.style.setProperty('--ripple-x', `${origX}px`);
    // el.style.setProperty('--ripple-y', `${origY}px`);

    // const originalTransition = getComputedStyle(el).transition;
    // const rippleColor = Color(config.color.trim()).hex();

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

    // const originalBackgroundImage = getComputedStyle(el).backgroundImage;
    // let newBackgroundImage = originalBackgroundImage
    //   ? `${ripple}, ${originalBackgroundImage}`
    //   : ripple;
    let newBackgroundImage = ripple;

    const originalColor = getComputedStyle(el).color;

    // const rippleTransition = `--ripple-x ${config.duration}s ${config.easing} ${config.delay}s, --ripple-y ${config.duration}s ${config.easing} ${config.delay}s`;
    // const newTransition = originalTransition
    //   ? `${rippleTransition}, ${originalTransition}`
    //   : rippleTransition;

    if (config.setTransparentText) {
      newBackgroundImage = `${newBackgroundImage}, linear-gradient(currentColor,currentColor)`;

      // el.style.setProperty('color', 'transparent');
      // el.style.setProperty('background-clip', 'text');
      // el.style.setProperty('-webkit-background-clip', 'text');
    }

    if (config.trigger === 'always') {
      el.style.setProperty('--ripple-size', rippleSize);
    } else {
      el.style.setProperty('--ripple-size', '0px');
    }
    // el.style.setProperty('transition', newTransition);
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
        // if (
        //   CSS.supports('(--ripple-x: 0%)') &&
        //   CSS.supports('(--ripple-y: 0%)')
        // ) {
        // el.style.setProperty('--ripple-x', `${x}%`);
        // el.style.setProperty('--ripple-y', `${y}%`);
        // } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        gsap.to(this, {
          '--ripple-x': `${x}%`,
          '--ripple-y': `${y}%`,
          delay: config.delay,
          duration: config.duration,
          ease: config.easing,
        });
        // }
      }
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

    el.addEventListener('mouseleave', handleMouseLeave);
    function handleMouseLeave(this: HTMLElement) {
      // el.style.removeProperty('--ripple-x');
      // el.style.removeProperty('--ripple-y');
      if (config.trigger !== 'always') {
        // this.style.setProperty('background-image', originalBackgroundImage);
        // this.style.setProperty('color', originalColor);
        gsap.to(this, {
          '--ripple-size': 0,
          duration: config.toggleDuration,
          ease: config.easing,
        });
      } else {
        // if (
        //   CSS.supports('(--ripple-x: 0%)') &&
        //   CSS.supports('(--ripple-y: 0%)')
        // ) {
        //   el.style.setProperty('--ripple-x', `${config.initialX}%`);
        //   el.style.setProperty('--ripple-y', `${config.initialY}%`);
        // } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
      // this.style.setProperty('--ripple-size', rippleSize);
      // this.style.setProperty('--ripple-color', rippleColor);

      if (config.fadeOutOnClick || config.expandOnClick) {
        this.removeEventListener('mousemove', handleMouseMove);
        this.removeEventListener('mouseleave', handleMouseLeave);
        this.removeEventListener('mouseenter', handleMouseEnter);
      }
      // if (config.expandOnClick) {

      const tl = gsap.timeline();
      tl.set(this, {
        '--ripple-x': getRelativeMouseX(this, e),
        '--ripple-y': getRelativeMouseY(this, e),
      }).fromTo(
        this,
        {
          '--ripple-color': rippleColor,
          '--ripple-size': rippleSize,
        },
        {
          '--ripple-color': config.fadeOutOnClick ? '#00000000' : rippleColor,
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
            '--ripple-color': '#00000000',
            '--ripple-size': 0,
          },
          {
            '--ripple-color': rippleColor,
            '--ripple-size': rippleSize,
            duration: 1,
            ease: 'power4.in',
          }
        );
      }

      // .set(this, {
      //   '--ripple-size': rippleSize,
      //   duration: 1,
      //   ease: 'power4.out',
      // });
      // }

      // if (config.fadeOutOnClick) {
      //   gsap.timeline().to(this, {
      //     '--ripple-color': '#00000000',
      //     duration: 1,
      //     ease: 'power4.out',
      //   });
      //   // .set(this, {
      //   //   '--ripple-color': rippleColor,
      //   //   duration: 1,
      //   //   ease: 'power4.out',
      //   // });
      // }
    }
  });
}
