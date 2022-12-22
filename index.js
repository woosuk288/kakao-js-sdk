export const initKakao = (jsKey) => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      var script = document.createElement("script");
      script.onload = function () {
        // console.log("onload : ", document);
        Kakao.init(jsKey);
        resolve(true);
      };
      script.onerror = (e) => {
        reject(e);
      };
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.0.1/kakao.min.js";
      script.integrity =
        "sha384-eKjgHJ9+vwU/FCSUG3nV1RKFolUXLsc6nLQ2R1tD0t4YFPCvRmkcF8saIfOZNWf/";
      script.crossOrigin = "anonymous";

      document.head.appendChild(script);
    } else {
      // console.info("Loading Kakao...");
      resolve(false);
    }
  });
};
