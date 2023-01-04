# Ripple

## Examples

See the [Digital Swing website](https://www.digital-swing.com) for a real life example or the [examples page](https://github.com).

## Installation

@digital-swing/ripple is available as a npm package.

### npm

```console
npm install --save @digital-swing/ripple
```

### yarn

```console
yarn add @digital-swing/ripple
```

## Usage

### Basic

```js
import ripple from '@digital-swing/ripple';

ripple();
```

It will create an onclick ripple animation on all html element with the default `.ripple` class similar to the [Vuetify ripple effect](https://vuetifyjs.com/en/directives/ripple/).

### With custom parameters

```js
import ripple from '@digital-swing/ripple';

ripple({
    color: "red",
    gradient: true,
    duration: 0.8,
    visibility: 'always',
    initialX: '100%',
    initialY: '0',
    fadeOutOnClick: false,
    expandOnClick: false
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

## Options

### target

type: `string`

### color

type: `string`

### size

type: `string`

### gradient

type: `boolean`

### easing

type: `string`

### duration

type: `number`
second

### delay

type: `number`
seconds

### visibility

type: `['always', 'onclick', 'onhover']`

### expandOnClick

type: `boolean`

### fadeOutOnClick

type: `boolean`

### initialX

type: `string`

### initialY

type: `string`

### followCursor

type: `boolean`

### toggleDuration

type: `number`
percentage

### setTransparentText

type: `boolean`

## Preventing FOUC at initialization

When initialized, the ripple effect with `visibility: 'always'` will create a change in the appareance of your html element, resulting in a [Flash Of Unstyled Content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content). To prevent this you can add this css with your defaults values to your project:

```css
.ripple { // whatever class you use
 --ripple-x: 100%;
 --ripple-y: 0%;
 --ripple-color: 'red';
 --ripple-size: 300px;
}
```

## Known Issues

The background text clip doesn't work in chrome if the element has a transform translate.

[See this post on StackOverflow](https://stackoverflow.com/questions/55725461/webkit-background-clip-text-on-an-element-with-transition-is-not-working-after).

## Changelog

Please see CHANGELOG for more information what has changed recently.

## Testing

```console
yarn
yarn test
```

## Contributing

Please see CONTRIBUTING for details.

## Security

If you discover any security related issues, please email lucas@digital-swing.com instead of using the issue tracker.

## Credits

[Lucas Demea](https://github.com/LucasDemea)

## License
