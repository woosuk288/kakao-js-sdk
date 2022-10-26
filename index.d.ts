/**
 * @see [Kakao](https://developers.kakao.com/sdk/reference/js/release/Kakao.html)
 */
 declare namespace Kakao {
  /**
   * Kakao JavaScript SDK에서 사용한 리소스를 해제합니다.
   */
  export function cleanup(): void;

  /**
   * 카카오 JavaScript SDK를 초기화합니다. SDK를 사용하기 전에 호출해야 합니다.
   * @param appKey JavaScript 키
   */
  export function init(appKey: string): void;

  /**
   * 카카오 JavaScript SDK의 초기화 여부를 반환합니다.
   * @return 초기화되었다면 true, 초기화되지 않았다면 false.
   */
  export function isInitialized(): boolean;


    /**
     * @see (사용자 정보)[https://developers.kakao.com/docs/latest/ko/kakaologin/common#user-info]
     */
    export interface UserInfo {
      /**
       *  회원번호
       */
      id: number;

      /**
       * 카카오계정 정보
       */
      kakao_account: KakaoAccount;

      /**
       * 카카오싱크 간편가입을 통해 로그인한 시각, UTC
       */
      synched_at: string;

      /**
       * 서비스에 연결 완료된 시각, UTC
       */
      connected_at: string;

      /**
       * JSON 추가 정보
       */
      properties: Profile;
    }

    /**
     * @see (프로필 정보)[https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#profile]
     */

    interface Profile {
      /**
       * 닉네임
       */
      nickname: string;

      /**
       * 프로필 미리보기 이미지 URL, 110px * 110px 또는 100px * 100px
       */
      thumbnail_image_url: string;

      /**
       * 프로필 이미지 URL, 640px * 640px 또는 480px * 480px
       */
      profile_image_url: string;

      /**
       * 프로필 사진 URL이 기본 프로필 사진 URL인지 여부
       *
       * 사용자가 등록한 프로필 사진이 없을 경우, 기본 프로필 사진 제공
       *
       * true: 기본 프로필 사진
       *
       * false: 사용자가 등록한 프로필 사진
       */
      is_default_image: boolean;
    }

    /**
     * 카카오계정 정보
     * @see {@link https://developers.kakao.com/docs/latest/ko/kakaologin/common#kakaoaccount} 카카오계정 정보
     * @see {@link https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#kakaoaccount} REST API
     */
    interface KakaoAccount extends Record<string, any> {
      /** 프로필 정보 */
      profile: Profile;
      /**
       * 카카오계정 이름
       */
      name: string;

      /** 대표 이메일 */
      email: string;
      /**
       * 연령대 ref: https://developers.kakao.com/docs/latest/ko/kakaologin/common#user-info
       */
      age_range: string;
      /** 생일, MMDD 형식 */
      birthday: string;
      /** 태어난 해, YYYY 형식 */
      birthyear: string;
      /** 성별, female/male */
      gender: 'female' | 'male';
      /** 전화번호. 카카오톡에 등록된 전화번호 */
      phone_number: string;
      /** 연계정보. 암호화된 이용자 확인 값 */
      ci: string;

      // @see (needs_agreement)[https://developers.kakao.com/docs/latest/ko/kakaologin/common#needs_agreement]
      // ${FIELD_NAME}_needs_agreement는 사용자 정보 종류별로 포함되어 있는 키입니다. 앱에 사용 설정된 동의 항목에 한해 제공되며, 사용자 동의 필요 여부를 의미합니다.
      // @see (kakao Dev Talk 질문)[https://devtalk.kakao.com/t/needs-agreement/79875]
      // profile_needs_agreement?: boolean;
      // email_needs_agreement?: boolean;
      // phone_number_needs_agreement?: boolean;
    }

/**
 * @see [Kakao.API](https://developers.kakao.com/sdk/reference/js/release/Kakao.API.html)
 */
  namespace API {
    /**
     * API를 호출하기 위해 사용한 리소스를 해제합니다.
     */
    export function cleanup(): void;

    /**
     * 카카오 API를 호출할 수 있습니다.
     * @param settings API 호출과 관련된 설정을 key/value로 전달합니다.
     */
    export function request(settings: RequestParams): Promise<void>;

    export interface RequestParams {
      /**
       * 호출할 API URL
       */
      url: string;

      /**
       * API에 전달할 파라미터
       * @see (data: 사용자 정보 가져오기) [https://developers.kakao.com/docs/latest/ko/kakaologin/js#req-user-info-data]
       */
      data?: { property_keys: string[] };

      /**
       * 파일 첨부가 필요한 API에서 이용하는 파일 파라미터
       */
      files?: FileList | Array<File> | Array<Blob>;

      /**
       *   API 호출이 성공할 경우 결과를 받을 콜백 함수
       */
      success?: (userInfo: UserInfo) => void;

      /**
       *   API 호출이 실패할 경우 결과를 받을 콜백 함수
       */
      fail?: (error: ApiError) => void;

      /**
       * API 호출이 성공하거나 실패할 경우 항상 호출할 콜백 함수
       */
      always?: (response: UserInfo | ApiError) => void;
    }



    /**
     * @see {@link https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#user-properties} 사용자 프로퍼티
     */
    export interface UserProperties {
      /**
       * 닉네임
       */
      nickname: string;

      /**
       * 프로필 미리보기 이미지 URL, 110px * 110px 또는 100px * 100px
       */
      profile_image: string;

      /**
       * 프로필 이미지 URL, 640px * 640px 또는 480px * 480px
       */
      thumbnail_image: string;
    }



    interface ApiError {
      code: number;
      msg: string;
    }
  }

  namespace Auth {
    /**
     * 사용자가 앱에 로그인할 수 있도록 인가 코드를 요청하는 함수입니다. 인가 코드를 받을 수 있는 서버 개발이 필요합니다.
     * @param settings 인가 코드 요청과 관련된 설정을 key/value로 전달합니다.
     */
    export function authorize(settings: AuthorizeParams): string;

    interface AuthorizeParams {
      /**
       *  인가 코드를 받을 URI
       */
      redirectUri?: string;

      /**
       * 인가 코드 요청과 응답 과정에서 유지할 수 있는 파라미터
       */
      state?: string;

      /**
       * 추가 동의 받을 항목의 키 ex) "account_email,gender"
       * OpenID Connect 확장 기능 사용 시, 추가 동의 받을 항목의 키와 "openid"를 함께 전달해야 함
       */
      scope?: string;

      /**
       * 인가 코드 요청 시 추가 상호작용을 요청하고자 할 때 전달하는 파라미터 ex) "cert": 인증 로그인, "login": 다른 계정으로 로그인
       */
      prompts?: string;

      /**
       * ID 토큰 재생 공격 방지를 위한 검증 값, 임의의 문자열, ID 토큰 검증 시 사용
       */
      nonce?: string;

      /**
       * 간편 로그인 사용 여부
       * @defaultValue `true`
       */
      throughTalk?: boolean;
    }

    /**
     * 로그인 버튼을 생성하기 위해 삽입한 iframe을 삭제하고 리소스를 해제합니다.
     */
    export function cleanup(): void;

    /**
     * @return 사용중인 App Key
     */
    export function getAppKey(): string;

    /**
     * 카카오 로그인 버튼을 생성합니다.
     */
    export function createLoginButton(
      createLoginButtonParams: CreateLoginButtonParams
    ): void;

    interface CreateLoginButtonParams extends LoginParams {
      /**
       * DOM Element 또는 Element의 ID Selector를 넘기면, 해당 Element 내부에 로그인 버튼이 생성됩니다.
       */
      container: string | HTMLElement;

      /**
       * 로그인 버튼에 표시할 언어, "kr"|"en"
       * @defaultValue `"kr"`
       */
      lang?: 'kr' | 'en';

      /**
       * 로그인 버튼의 사이즈, "small"|"medium"|"large"
       * @defaultValue `"medium"`
       */
      size?: 'small' | 'medium' | 'large';
    }

    /**
     * @return 사용 중인 액세스 토큰
     */
    export function getAccessToken(): string;

    /**
     * @return 사용중인 App Key
     */
    export function getAppKey(): string;

    /**
     * 현재 로그인 상태를 반환합니다.
     * @param callback 로그인 상태를 받을 콜백 함수
     */
    export function getStatusInfo(callback?: AuthStatusCallback): void;

    interface AuthStatusCallback {
      (statusObj: {
        /**
         * "connected" 또는 "not_connected"
         */
        status: 'connected' | 'not_connected';

        /**
         * 로그인 상태일 때만 전달되는 사용자 정보
         */
        user: UserInfo;
      }): void;
    }

    /**
     * 사용자가 앱에 로그인할 수 있도록 로그인 팝업창을 띄우는 함수입니다. 사용자의 클릭 이벤트 이후에 호출되어야 브라우저에 의해 팝업이 차단되지 않습니다.
     * @param settings 로그인과 관련된 설정을 key/value로 전달합니다.
     */
    export function login(settings: LoginParams): void;

    interface LoginParams {
      /**
       * 로그인이 성공할 경우 토큰을 받을 콜백 함수
       */
      success?: AuthSuccessCallback;

      /**
       * 로그인이 실패할 경우 에러를 받을 콜백 함수
       */
      fail?: AuthFailCallback;

      /**
       * 로그인 성공 여부에 관계 없이 항상 호출되는 함수
       */
      always?: AuthSuccessCallback | AuthFailCallback;

      /**
       * 추가 동의 받을 항목의 키 ex) "account_email,gender"
       * OpenID Connect 확장 기능 사용 시, 추가 동의 받을 항목의 키와 "openid"를 함께 전달해야 함
       */
      scope?: string;

      /**
       * ID 토큰 재생 공격 방지를 위한 검증 값, 임의의 문자열, ID 토큰 검증 시 사용
       */
      nonce?: string;

      /**
       * 세션이 종료된 뒤에도 액세스 토큰을 사용할 수 있도록 로컬 스토리지 저장 여부
       * @defaultValue `true`
       */
      persistAccessToken?: boolean;

      /**
       * 간편 로그인 사용 여부
       * @defaultValue `true`
       */
      throughTalk?: boolean;
    }

    interface AuthSuccessCallback {
      (authObj: AuthObj): void;
    }

    interface AuthFailCallback {
      (errorObj: ErrorObj): void;
    }

    /**
     * 로그인 성공시 토큰이 포함된 인증 관련 객체
     */
    export interface AuthObj {
      token_type: 'bearer';

      /**
       * 사용자 액세스 토큰 값
       */
      access_token: string;

      /**
       * 액세스 토큰 만료 시간(초)
       */
      expires_in: number;

      /**
       * 사용자 리프레시 토큰 값
       */
      refresh_token: string;

      /**
       * 리프레시 토큰 만료 시간(초)
       */
      refresh_token_expires_in: string;

      /**
       * 인증된 사용자의 정보 조회 권한 범위 (범위가 여러 개일 경우, 공백으로 구분)
       */
      scope: string;

      /**
       * OpenID Connect 확장 기능을 통해 발급되는 ID 토큰, Base64 인코딩된 사용자 인증 정보 포함
       */
      id_token: string;
    }

    /**
     * 로그인 실패시 에러 객체
     */
    export interface ErrorObj {
      /**
       * 에러 메시지
       */
      error: string;

      /**
       * 에러 메시지 부가 설명
       */
      error_description: string;
    }

    /**
     * 다른 계정으로 로그인할 수 있도록 로그인 팝업창을 띄우는 함수입니다. 사용자의 클릭 이벤트 이후에 호출되어야 브라우저에 의해 팝업이 차단되지 않습니다.
     * @param settings 로그인과 관련된 설정을 key/value로 전달합니다.
     */
    export function loginForm(settings: LoginFormParams): void;

    interface LoginFormParams extends Omit<LoginParams, 'throughTalk'> {}

    /**
     * 현재 로그인되어 있는 사용자를 로그아웃시키고, Access Token을 삭제합니다.
     * @param callback 로그아웃 후 호출할 콜백 함수
     */
    export function logout(callback: LogoutCallback): void;

    interface LogoutCallback {
      (): void;
    }

    /**
     * API 호출 시 사용할 액세스 토큰을 설정합니다.
     * @param token 사용할 액세스 토큰
     * @param [persist=true] - 세션이 종료된 뒤에도 액세스 토큰을 사용할 수 있도록 로컬 스토리지 저장 여부
     */
    export function setAccessToken(
      token: string,
      /**
       * @defaultValue `true`
       */
      persist?: boolean
    ): void;
  }


}

export = Kakao