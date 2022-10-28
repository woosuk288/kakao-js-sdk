/**
 * @see [Kakao](https://developers.kakao.com/sdk/reference/js/release/Kakao.html)
 */
declare namespace Kakao {
  /**
   * Kakao JavaScript SDK에서 사용한 리소스를 해제합니다.
   */
  function cleanup(): void;

  /**
   * 카카오 JavaScript SDK를 초기화합니다. SDK를 사용하기 전에 호출해야 합니다.
   * @param appKey JavaScript 키
   */
  function init(appKey: string): void;

  /**
   * 카카오 JavaScript SDK의 초기화 여부를 반환합니다.
   * @return 초기화되었다면 true, 초기화되지 않았다면 false.
   */
  function isInitialized(): boolean;

  interface KeyValue {
    [key: string]: any;
  }

  interface StatusResponse {
    (statusObj: {
      /**
       * "connected" 또는 "not_connected"
       */
      status: "connected" | "not_connected";

      /**
       * 로그인 상태일 때만 전달되는 사용자 정보
       */
      user: UserInfo;
    }): void;
  }

  interface AuthError {
    /**
     * 에러 코드
     */
    code: number;
    /**
     * 에러 메시지
     */
    msg: string;
  }

  interface LogoutResponse {
    /**
     * 회원번호
     */
    id: number;
  }

  /**
   * @see (사용자 정보)[https://developers.kakao.com/docs/latest/ko/kakaologin/common#user-info]
   */
  interface UserInfo {
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
    gender: "female" | "male";
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
   * @see {@link https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#user-properties} 사용자 프로퍼티
   */
  interface UserProperties {
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

  /**
   * 카카오 API와 관련된 함수들이 포함되어 있습니다.
   * @see [Kakao.API](https://developers.kakao.com/sdk/reference/js/release/Kakao.API.html)
   */
  namespace API {
    /**
     * API를 호출하기 위해 사용한 리소스를 해제합니다.
     */
    function cleanup(): void;

    /**
     * @see [REST API 레퍼런스](https://developers.kakao.com/docs/latest/ko/reference/rest-api-reference) 각 API에 대한 요청 파라미터와 응답은 REST API와 동일합니다
     *
     * 카카오 API를 호출할 수 있습니다.
     * @param settings API 호출과 관련된 설정을 key/value로 전달합니다.
     */
    function request(settings: {
      /**
       * 호출할 API의 URL path (호스트가 https://kapi.kakao.com인 API만 지원합니다.)
       */
      url: string;

      /**
       * API에 전달할 파라미터
       * @see (data: 사용자 정보 가져오기) [https://developers.kakao.com/docs/latest/ko/kakaologin/js#req-user-info-data]
       */
      data?: KeyValue;

      /**
       * 파일 첨부가 필요한 API에서 이용하는 파일 파라미터
       */
      files?: FileList | Array<File> | Array<Blob>;
    }): Promise<KeyValue>;
  }

  /**
   * 사용자 인증과 관련된 함수들이 포함되어 있습니다.
   * @see [Kakao.Auth](https://developers.kakao.com/sdk/reference/js/release/Kakao.Auth.html)
   */
  namespace Auth {
    /**
     * 사용자가 앱에 로그인할 수 있도록 인가 코드를 요청하는 함수입니다. 인가 코드를 받을 수 있는 서버 개발이 필요합니다.
     * @param settings 인가 코드 요청과 관련된 설정을 key/value로 전달합니다.
     */
    function authorize(settings: {
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
    }): string;

    /**
     * 로그인 버튼을 생성하기 위해 삽입한 iframe을 삭제하고 리소스를 해제합니다.
     */
    function cleanup(): void;

    /**
     * @return 사용 중인 액세스 토큰
     */
    function getAccessToken(): string;

    /**
     * @return 사용중인 App Key
     */
    function getAppKey(): string;

    /**
     * 현재 로그인 상태를 반환합니다.
     * @param callback 로그인 상태를 받을 콜백 함수
     */
    function getStatusInfo(): Promise<StatusResponse | AuthError>;

    /**
     * 현재 로그인되어 있는 사용자를 로그아웃시키고, 액세스 토큰을 삭제합니다.
     * @param callback 로그아웃 후 호출할 콜백 함수
     */
    function logout(): Promise<LogoutResponse | AuthError>;

    /**
     * API 호출 시 사용할 액세스 토큰을 설정합니다.
     * @param token 사용할 액세스 토큰
     * @param [persist=true] - 세션이 종료된 뒤에도 액세스 토큰을 사용할 수 있도록 로컬 스토리지 저장 여부
     */
    function setAccessToken(
      token: string,
      /**
       * @defaultValue `true`
       */
      persist?: boolean
    ): void;
  }

  /**
   * 카카오톡 채널 플러그인과 관련된 함수들이 포함되어 있습니다.
   * @see [Kakao.Channel](https://developers.kakao.com/sdk/reference/js/release/Kakao.Channel.html#.addChannel)
   */
  namespace Channel {
    /**
     * 카카오톡 채널 추가 팝업창을 띄웁니다. 사용자의 클릭 이벤트 이후에 호출되어야 브라우저에 의해 팝업이 차단되지 않습니다.
     * @param settings 카카오톡 채널 추가와 관련된 설정을 key/value로 전달합니다.
     */
    function addChannel(settings: {
      /**
       * 대상 카카오톡 채널 홈 URL에 포함된 카카오톡 채널 공개 ID
       */
      channelPublicId: string;
    });

    /**
     * 카카오톡 채널 1:1 채팅을 시작합니다. 사용자의 클릭 이벤트 이후에 호출되어야 브라우저에 의해 팝업이 차단되지 않습니다.
     * @param settings 카카오톡 채널 추가와 관련된 설정을 key/value로 전달합니다.
     */
    function chat(settings: {
      /**
       * 대상 카카오톡 채널 홈 URL에 포함된 카카오톡 채널 공개 ID
       */
      channelPublicId: string;
    });

    /**
     * 카카오톡 채널과 관련된 리소스를 해제합니다.
     */
    function cleanup(): void;

    /**
     * 카카오톡 채널 추가 버튼을 생성합니다.
     * @param settings 카카오톡 채널 추가 버튼 생성과 관련된 설정을 key/value로 전달합니다.
     */
    function createAddChannelButton(settings: {
      /**
       * DOM Element 또는 Element의 ID Selector
       */
      container: string | HTMLElement;
      /**
       * 대상 카카오톡 채널 홈 URL에 포함된 카카오톡 채널 공개 ID
       */
      channelPublicId: string;
      /**
       * 채널추가 버튼의 사이즈, "small"|"large"
       * @defaultValue `small`
       */
      size?: string;

      /**
       * 화면 배율에 따라 2x 3x 이미지를 사용, IE 미지원
       * @defaultValue `false`
       */
      supportMultipleDensities?: boolean;
    });

    /**
     * 카카오톡 채널 1:1 채팅 버튼을 생성합니다.
     * @param settings 카카오톡 채널 1:1 채팅 버튼 생성과 관련된 설정을 key/value로 전달합니다.
     */
    function createChatButton(settings: {
      /**
       * DOM Element 또는 Element의 ID Selector
       */
      container: string | HTMLElement;
      /**
       * 대상 카카오톡 채널 홈 URL에 포함된 카카오톡 채널 공개 ID
       */
      channelPublicId: string;
      /**
       * 1:1 채팅 버튼에 들어갈 제목, "consult"|"question"
       * @defaultValue `consult`
       */
      title?: string;

      /**
       * 채널추가 버튼의 사이즈, "small"|"large"
       * @defaultValue `small`
       */
      size?: string;

      /**
       * 1:1 채팅 버튼의 배경색, "yellow"|"black"
       * @defaultValue `yellow`
       */
      color?: string;

      /**
       * 1:1 채팅 버튼의 모양, "pc"|"mobile"
       * @defaultValue `pc`
       */
      shape?: string;

      /**
       * 화면 배율에 따라 2x 3x 이미지를 사용, IE 미지원
       * @defaultValue `false`
       */
      supportMultipleDensities?: boolean;
    });
  }

  interface ViaPoint {
    /**
     * 목적지 이름
     */
    name: string;
    /**
     * 목적지의 x 좌표 (경도). wgs84 또는 katec 좌표계의 값
     */
    x: string;

    /**
     * 목적지의 y 좌표 (위도). wgs84 또는 katec 좌표계의 값
     */
    y: string;
  }

  /**
   * 카카오내비 앱을 통해 목적지 공유 및 길 안내 기능을 실행합니다. 카카오내비 앱이 설치돼 있다면 앱, 그렇지 않다면 설치 페이지를 엽니다.
   * @see [Kakao.Navi](https://developers.kakao.com/sdk/reference/js/release/Kakao.Navi.html#.addChannel)
   */
  namespace Navi {
    /**
     * 카카오내비 앱으로 목적지를 공유합니다. 모바일 기기에서만 동작합니다.
     * @param settings 카카오내비 앱을 실행할 때의 옵션
     */
    function share(settings: {
      /**
       * 목적지 이름
       */
      name: string;
      /**
       * 목적지의 x 좌표 (경도). wgs84 또는 katec 좌표계의 값
       */
      x: string;

      /**
       * 목적지의 y 좌표 (위도). wgs84 또는 katec 좌표계의 값
       */
      y: string;

      /**
       * 좌표 타입, "wgs84"|"katec"
       * @defaultValue `katec`
       */
      coordType?: string;
    });

    /**
     * 카카오내비 앱으로 길 안내를 시작합니다. 모바일 기기에서만 동작합니다.
     * @param settings 카카오내비 앱을 실행할 때의 옵션
     */
    function start(settings: {
      /**
       * 목적지 이름
       */
      name: string;
      /**
       * 목적지의 x 좌표 (경도). wgs84 또는 katec 좌표계의 값
       */
      x: string;

      /**
       * 목적지의 y 좌표 (위도). wgs84 또는 katec 좌표계의 값
       */
      y: string;

      /**
       * 좌표 타입, "wgs84"|"katec"
       * @defaultValue `katec`
       */
      coordType?: string;

      /**
       * 차종 (1: 1종 (승용차/소형승합차/소형화물화), 2: 2종 (중형승합차/중형화물차), 3: 3종 (대형승합차/2축 대형화물차), 4: 4종 (3축 대형화물차), 5: 5종 (4축이상 특수화물차), 6: 6종 (경차), 7: 이륜차)
       * @defaultValue `1`
       */
      vehicleType?: number;

      /**
       * 경로 옵션 (1: 가장 빠른 경로, 2: 무료 도로, 3: 가장 짧은 경로, 4: 자동차 전용 도로 제외, 5: 큰길 우선, 6: 고속도로 우선, 8: 일반 도로 우선, 100: 추천 경로)
       * @defaultValue `100`
       */
      rpOption?: number;

      /**
       * 전체 경로 보기 여부
       * @defaultValue `false`
       */
      routeInfo?: boolean;

      /**
       * 시작 좌표 x
       */
      sX?: number;

      /**
       * 시작 좌표 y
       */
      sY?: number;

      /**
       * 시작 앵글 (0~359)
       */
      sAngle?: number;

      /**
       * 경유지 정보 (최대 3개)
       */
      returnUri?: number;

      /**
       * 시작 좌표 x
       */
      viaPoints?: Array<ViaPoint>;
    });
  }

  interface FriendsPickerResponse {
    /**
     * 피커에서 선택한 친구 수
     */
    selectedTotalCount: number;

    /**
     * 피커에서 선택한 친구 정보
     */
    users: Array<SelectedUser>;
  }

  interface PickerError {
    /**
     * 에러 코드
     */
    code: number;
    /**
     * 에러 메시지
     */
    msg: string;
  }

  interface SelectedUser {
    /**
     * 고유 식별자
     */
    uuid: string;

    /**
     * 회원번호
     */
    id?: string;

    /**
     * 프로필 닉네임
     */
    profile_nickname?: string;

    /**
     * 프로필 썸네일 이미지
     */
    profile_thumbnail_image?: string;

    /**
     * 즐겨찾기 설정 여부
     */
    favorite?: boolean;
  }

  /**
   * 피커와 관련된 함수들이 포함되어 있습니다.
   * @see [Kakao.Picker](https://developers.kakao.com/sdk/reference/js/release/Kakao.Picker.html#.addChannel)
   */
  namespace Picker {
    /**
     * 피커를 호출하기 위해 사용한 리소스를 해제합니다.
     */
    function cleanup(): void;

    /**
     * 한 명의 친구를 선택할 때 사용합니다.
     * @param settings 친구 피커와 관련된 설정을 key/value로 전달합니다.
     */
    function selectFriend(settings: {
      /**
       * 친구 피커 타이틀 영역에 표시될 텍스트
       * @defaultValue `"카카오톡 친구 선택"`
       */
      title?: string;

      /**
       * 검색 기능 사용 여부
       * @defaultValue `true`
       */
      enableSearch?: boolean;

      /**
       * 내 프로필 표시 여부
       * @defaultValue `true`
       */
      showMyProfile?: boolean;

      /**
       * 즐겨찾기 표시 여부
       * @defaultValue `true`
       */
      showFavorite?: boolean;

      /**
       * [검수 필요] 친구 관계 유형 (카카오톡/카카오스토리/카카오톡 & 카카오스토리), "talk"|"story"|"talkstory"
       * @defaultValue `"talk"`
       */
      serviceTypeFilter?: string;

      /**
       * 뒤로가기 버튼 노출 유무
       * @defaultValue `true`
       */
      enableBackButton?: boolean;

      /**
       * 선택한 친구 정보를 받을 서비스 URL (리다이렉트 방식 사용 시 필수)
       */
      returnUrl?: string;
    }): Promise<FriendsPickerResponse | PickerError>;

    /**
     * 여러 명의 친구를 선택할 때 사용합니다.
     * @param settings 친구 피커와 관련된 설정을 key/value로 전달합니다.
     */
    function selectFriends(settings: {
      /**
       * 친구 피커 타이틀 영역에 표시될 텍스트
       * @defaultValue `"카카오톡 친구 선택"`
       */
      title?: string;

      /**
       * 검색 기능 사용 여부
       * @defaultValue `true`
       */
      enableSearch?: boolean;

      /**
       * 내 프로필 표시 여부
       * @defaultValue `true`
       */
      showMyProfile?: boolean;

      /**
       * 즐겨찾기 표시 여부
       * @defaultValue `true`
       */
      showFavorite?: boolean;

      /**
       * 선택된 친구 표시 여부
       * @defaultValue `true`
       */
      showPickedFriend?: boolean;

      /**
       * 최대 선택 가능 친구 수 (최대 100명)
       * @defaultValue `30`
       */
      maxPickableCount?: number;

      /**
       * 최소 선택 가능 친구 수 (최대 100명)
       * @defaultValue `1`
       */
      minPickableCount?: number;

      /**
       * [검수 필요] 친구 관계 유형 (카카오톡/카카오스토리/카카오톡 & 카카오스토리), "talk"|"story"|"talkstory"
       * @defaultValue `"talk"`
       */
      serviceTypeFilter?: string;

      /**
       * 뒤로가기 버튼 노출 유무
       * @defaultValue `true`
       */
      enableBackButton?: boolean;

      /**
       * 선택한 친구 정보를 받을 서비스 URL (리다이렉트 방식 사용 시 필수)
       */
      returnUrl?: string;
    }): Promise<FriendsPickerResponse | PickerError>;
  }
}

export = Kakao;
