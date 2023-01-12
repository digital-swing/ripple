# Ripple
<!-- markdownlint-disable-next-line MD033-->
<div align="center">

🌈 A ripple effect, similar to the [Google Material ripple effect](https://m2.material.io/develop/ios/supporting/ripple) or the [Vuetify ripple effect](https://vuetifyjs.com/en/directives/ripple/), but with a lot of options. 🌈

[See the demo](https://digital-swing.github.io/ripple/examples).

*This package depends on Greensock GSAP. Other options coming soon...*

![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square) ![Gzip](https://img.shields.io/bundlephobia/minzip/@digital-swing/ripple?color=green&label=gzipped&style=flat-square) ![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/LucasDemea/47afa2dca4215d90df6248220a886a3e/raw/ripple__heads_main.json&style=flat-square)

</div>

## 📥 Installation

@digital-swing/ripple is available as a npm package, or as a bundle to load from CDN.

### npm

```console
npm install gsap @digital-swing/ripple
```

### yarn

```console
yarn add gsap @digital-swing/ripple
```

Then import it as a esm package in your app :

```js
import ripple from '@digital-swing/ripple';
```

### Browser

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script src="https://unpkg.com/@digital-swing/ripple"></script>
```

## 🛠️ Usage

### Basic

```js
ripple();
```

This will create an on-click ripple animation on all html element with the default `.ripple` class.

### With custom parameters

```js
ripple({
  color: 'red',
  size: '100px',
  target: '.alt-ripple',
  delay: 0,
  ease: 'power2',
  gradient: true,
  duration: 0.8,
  //...
});
```

[See the documentation](https://digital-swing.github.io/ripple/types/interfaces/RippleConfig.html) for detailed config options.

## 💡 Tips

If you want to use a global css variable to color your ripple, for example a color from your css framework, you can do:

```js
ripple(
    color: getComputedStyle(document.documentElement).getPropertyValue(
      '--bs-secondary'
    ),
    //...
    );
```

## 🎨 Initial Ripple styles

In some cases you will want to style the ripple with css before javascript sets its styles (especially with `on: 'always'`). You can do it this way :

```css
.ripple { /* or any class you're using */
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
- Doesn't work with element where the backgroundchangers on interaction. For example a button that changes its background-color when being hovered.

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
- Support touch events
