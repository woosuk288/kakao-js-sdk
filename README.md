# kakao-js-sdk

[Docs](https://developers.kakao.com/docs/latest/ko/kakaologin/js) |
[Reference](https://developers.kakao.com/sdk/reference/js/release/Kakao.html)

[Kakao SDK for JavaScript(2.0.0)](https://developers.kakao.com/docs/latest/ko/sdk-download/js)

## Notice

테스트가 제대로 되지 않았습니다. 개선 사항이나 문제가 되는 부분들에 도움 주시면 감사하겠습니다.


## Installation

```
$ npm i kakao-js-sdk
```

## Usage

```ts
function doWithKakao() {
    const { default: Kakao } = await import("kakao-js-sdk");
    Kakao.isInitialized() === false && Kakao.init("YOUR_JAVASCRIPT_KEY");
};
```

### <center> OR </center>
```ts
import Kakao from "kakao-js-sdk";

    //
    Kakao.isInitialized() === false && Kakao.init("YOUR_JAVASCRIPT_KEY");
```

## Contribute

언제나 환영입니다.
