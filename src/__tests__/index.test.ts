import * as moduleApi from '../index';

const ripple = moduleApi.ripple;

beforeEach(() => {
  document.body.innerHTML =
    '<div id="app">' +
    '<div class="ripple">' +
    '<h1>Test test</h1>' +
    '</div>' +
    '</div>';
});

// describe('Library', () => {
//   it("should log warning if gsap wasn't found",  () => {
//     const warnSpy = jest.spyOn(global.console, 'warn');
//     document.body.innerHTML =
//       '<div id="app">' +
//       '<div class="ripple">' +
//       '<h1>Test test</h1>' +
//       '</div>' +
//       '</div>';
//      ripple();
//     expect(warnSpy).toHaveBeenCalledWith(
//       'gsap could not be loaded. Skipping ripple initialization.'
//     );
//   });

//   it('should not log warning if gsap is loaded as an inline script',  () => {
//     const warnSpy = jest.spyOn(global.console, 'warn');
//     const gsapScript = document.createElement('script');
//     gsapScript.type = 'text/javascript';
//     gsapScript.src =
//       'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
//     document.body.append(gsapScript);
//      ripple();
//     expect(warnSpy).not.toHaveBeenCalled();
//   });

// it('should not log warning if gsap is loaded as a node module',  () => {
//   const warnSpy = jest.spyOn(global.console, 'warn');
//   const gsapScript = document.createElement('script');
//   gsapScript.type = 'text/javascript';
//   gsapScript.src =
//     'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
//   document.body.append(gsapScript);
//    ripple();
//   expect(warnSpy).not.toHaveBeenCalled();
// });
// });

describe('--ripple-size', () => {
  it('is initially set to 0px with "click" trigger', () => {
    ripple({ on: 'click', size: '30px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-size')
    ).toBe('0px');
  });

  it('is initially set to 0px with "hover" trigger', () => {
    ripple({ on: 'hover', size: '30px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-size')
    ).toBe('0px');
  });

  it('is initially set to user defined size with "always" trigger', () => {
    ripple({ on: 'always', size: '30px', toggleDuration: 0 });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-size')
    ).toBe('30px');
  });
});

describe('--ripple-x', () => {
  it('is set to 50% by default', () => {
    ripple();
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-x')
    ).toBe('50%');
  });

  it('is set to user defined absolute position', () => {
    ripple({ initialX: '20px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-x')
    ).toBe('20px');
  });

  it('is set to user defined relative position', () => {
    ripple({ initialX: '20%' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-x')
    ).toBe('20%');
  });

  // it('is set to null if user sets wrong value', ()  => {
  //    ripple({ initialX: 'test' });
  //   expect(
  //     (
  //       document.getElementsByClassName('ripple')[0] as HTMLElement
  //     ).style.getPropertyValue('--ripple-x')
  //   ).toBeNull();
  // });
});

describe('--ripple-y', () => {
  it('is set to 50% by default', () => {
    ripple();
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-y')
    ).toBe('50%');
  });

  it('is set to user defined absolute position', () => {
    ripple({ initialY: '20px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-y')
    ).toBe('20px');
  });

  it('is set to user defined relative position', () => {
    ripple({ initialY: '20%' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-y')
    ).toBe('20%');
  });

  // it('is set to null if user sets wrong value', ()  => {
  //    ripple({ initialX: 'test' });
  //   expect(
  //     (
  //       document.getElementsByClassName('ripple')[0] as HTMLElement
  //     ).style.getPropertyValue('--ripple-y')
  //   ).toBeNull();
  // });
});

describe('--ripple-color', () => {
  it('is set to #ffffff42 by default', () => {
    ripple();
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-color')
    ).toBe('#ffffff42');
  });

  it('is set to user defined named color', () => {
    ripple({ color: 'red' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-color')
    ).toBe('red');
  });

  it('is set to user defined hex color', () => {
    ripple({ color: '#000000' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-color')
    ).toBe('#000000');
  });

  // it('is set to null if user sets wrong value', ()  => {
  //    ripple({ initialX: 'test' });
  //   expect(
  //     (
  //       document.getElementsByClassName('ripple')[0] as HTMLElement
  //     ).style.getPropertyValue('--ripple-color')
  //   ).toBeNull();
  // });
});
