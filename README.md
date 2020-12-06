# Thinking process

### Preparation

when I first got the code test, my think process:

1. which public api should use: after a research, I choosed `weatherstack`
2. as we need to support accessbility, use `axe-core/react` will help me on the code
3. use UI pacakge `material ui` for quick layout design

### Usage

Living website is at: http://yanlin-weather-test.s3-website-ap-southeast-2.amazonaws.com/

To start the project locally

```js
git clone https://github.com/yanlin96/weather-forecast.git
cd weather-forecast;

npm install;
npm run start:
```

To run the test cases

```js
npm run test
```

### My consideration for improvements

1. We can get user current location throught the `window.navigator.geolocation.getCurrentPosition` api, however, user need to allow this permission. Need to think a more polite way
2. test cases need to be more detailed
