import * as moduleApi from '../index';

const ripple = moduleApi.ripple;
// const rippleSpy = jest.spyOn(moduleApi, 'ripple');

beforeEach(() => {
  document.body.innerHTML =
    '<div id="app">' +
    '<div class="ripple">' +
    '<h1>Test test</h1>' +
    '</div>' +
    '</div>';
});

describe('--ripple-size', () => {
  it('is initially set to 0px with "click" trigger', async () => {
    await ripple({ on: 'click', size: '30px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-size')
    ).toBe('0px');
  });

  it('is initially set to 0px with "hover" trigger', async () => {
    await ripple({ on: 'hover', size: '30px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-size')
    ).toBe('0px');
  });

  it('is initially set to user defined size with "always" trigger', async () => {
    await ripple({ on: 'always', size: '30px', toggleDuration: 0 });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-size')
    ).toBe('30px');
  });
});

describe('--ripple-x', () => {
  it('is set to 50% by default', async () => {
    await ripple();
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-x')
    ).toBe('50%');
  });

  it('is set to user defined absolute position', async () => {
    await ripple({ initialX: '20px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-x')
    ).toBe('20px');
  });

  it('is set to user defined relative position', async () => {
    await ripple({ initialX: '20%' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-x')
    ).toBe('20%');
  });

  // it('is set to null if user sets wrong value', ()async  => {
  //   await ripple({ initialX: 'test' });
  //   expect(
  //     (
  //       document.getElementsByClassName('ripple')[0] as HTMLElement
  //     ).style.getPropertyValue('--ripple-x')
  //   ).toBeNull();
  // });
});

describe('--ripple-y', () => {
  it('is set to 50% by default', async () => {
    await ripple();
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-y')
    ).toBe('50%');
  });

  it('is set to user defined absolute position', async () => {
    await ripple({ initialY: '20px' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-y')
    ).toBe('20px');
  });

  it('is set to user defined relative position', async () => {
    await ripple({ initialY: '20%' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-y')
    ).toBe('20%');
  });

  // it('is set to null if user sets wrong value', ()async  => {
  //   await ripple({ initialX: 'test' });
  //   expect(
  //     (
  //       document.getElementsByClassName('ripple')[0] as HTMLElement
  //     ).style.getPropertyValue('--ripple-y')
  //   ).toBeNull();
  // });
});

describe('--ripple-color', () => {
  it('is set to #ffffff42 by default', async () => {
    await ripple();
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-color')
    ).toBe('#ffffff42');
  });

  it('is set to user defined named color', async () => {
    await ripple({ color: 'red' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-color')
    ).toBe('red');
  });

  it('is set to user defined hex color', async () => {
    await ripple({ color: '#000000' });
    expect(
      (
        document.getElementsByClassName('ripple')[0] as HTMLElement
      ).style.getPropertyValue('--ripple-color')
    ).toBe('#000000');
  });

  // it('is set to null if user sets wrong value', ()async  => {
  //   await ripple({ initialX: 'test' });
  //   expect(
  //     (
  //       document.getElementsByClassName('ripple')[0] as HTMLElement
  //     ).style.getPropertyValue('--ripple-color')
  //   ).toBeNull();
  // });
});
