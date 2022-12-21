# kakao-js-sdk

[Docs](https://developers.kakao.com/docs/latest/ko/kakaologin/js) |
[Reference](https://developers.kakao.com/sdk/reference/js/release/Kakao.html)

[Kakao SDK for JavaScript(2.0.1)](https://developers.kakao.com/docs/latest/ko/sdk-download/js)

## Notice

Kakao Javascript SDK를 쪼끔 더 편하게 사용하고 싶다면 👋👋👋


## Feature

- <b>initKakao</b> (Kakao Javascript SDK를 동적으로 불러와 초기화하는 함수)
- <b>window.Kakao</b> (typescript namespace, type 사용 가능)

## Installation

```
$ npm i kakao-js-sdk
```

## Usage

- #### type만 사용할 경우
```js
// 패키지 설치 후
window.Kakao......
```

- #### React(CRA, NextJS) 등의 최상위 파일(App.js, _app.js)에서 동적으로 로드 후 사용할 경우

```ts
// App.js,_app.js 등
import { initKakao } from 'kakao-js-sdk';
initKakao('YOUR_JAVASCRIPT_KEY');

// Login.js, Share.js 등
window.Kakao......
```

- #### 특정 함수나 파일에서만 사용할 경우

```ts
import { initKakao } from 'kakao-js-sdk';

function handleYourLogin () {
    initKakao('YOUR_JAVASCRIPT_KEY').then((isloaded) => {
        window.Kakao......
    })
}
```

## Contribute

언제나 환영입니다.
