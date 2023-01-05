# Ripple

<div align="center">
![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/LucasDemea/47afa2dca4215d90df6248220a886a3e/raw/ripple__heads_main.json)

A ripple effect, similar to the [Google Material ripple effect](https://m2.material.io/develop/ios/supporting/ripple) or the [Vuetify ripple effect](https://vuetifyjs.com/en/directives/ripple/), but with a lot of options. Have fun !

*This package depends on Greensock GSAP. Other options will be added soon...*
</div>

## Installation

@digital-swing/ripple is available as a npm package.

### npm

```console
npm install gsap @digital-swing/ripple
```

### yarn

```console
yarn add gsap @digital-swing/ripple
```

## Usage

### Basic

```js
import ripple from '@digital-swing/ripple';

ripple();
```

This will create an on-click ripple animation on all html element with the default `.ripple` class.

### With custom parameters

```js
import ripple from '@digital-swing/ripple';

ripple({
  color: 'red',
  size: '100px',
  target: '.alt-ripple',
  delay: 0,
  ease: 'power2',
  gradient: true,
  duration: 0.8,
  visibility: 'always',
  initialX: '100%',
  initialY: '0',
  textClip: true,
  fadeOutOnClick: false,
  expandOnClick: false,
  toggleDuration: 0.1,
  expandDuration: 0.2,
  expandEase: 'power2.out',
  on: 'click',
});
```

If you want to use a global css variable to color your ripple, you can do:

```js
import ripple from '@digital-swing/ripple';

ripple(
    color: getComputedStyle(document.documentElement).getPropertyValue(
      '--bs-secondary'
    ),
    //...
    );
```

This example uses a [Bootstrap5 css variable](https://getbootstrap.com/docs/5.0/customize/css-variables/).

[See the documentation](https://digital-swing.github.io/ripple/interfaces/RippleConfig.html) for detailed config options.

## Initial Ripple styles

In some cases you will want to style the ripple with css before javascript sets its styles (especially with `on: 'always'`). You can do it this way :

```css
.ripple { // or whatever class you want to use
  --ripple-x: 100%;
  --ripple-y: 0%;
  --ripple-color: 'red';
  --ripple-size: 300px;
}
```

This can prevent a [Flash Of Unstyled Content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) that happens in rare cases.

## Limitations

- You can't have a css background on element with `textClip: true` option. If you need a background on these element, it should be setup on a wrapping element instead.

## Known Issues

- The background text clip doesn't work in chrome if the element has a transform translate set.

[See this post on StackOverflow](https://stackoverflow.com/questions/55725461/webkit-background-clip-text-on-an-element-with-transition-is-not-working-after).

## Changelog

Please [see the CHANGELOG](https://github.com/digital-swing/ripple/blob/main/CHANGELOG.md) for more information about what has changed recently.

## Testing

```console
yarn
yarn test
```

## Contributing

Please [see CONTRIBUTING](https://github.com/digital-swing/ripple/blob/main/CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email lucas@digital-swing.com instead of using the issue tracker.

## Credits

[Lucas Demea](https://github.com/LucasDemea)

## Roadmap

- Add compatibility with other animation libraries : anime.js, shifty, popmotion...
- Add a `background-clip: text` polyfill
