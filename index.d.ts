declare global {
  /**
   * @see [Kakao](https://developers.kakao.com/sdk/reference/js/release/Kakao.html)
   */
  namespace Kakao {
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

    interface StatusResponse {
      /**
       * "connected" 또는 "not_connected"
       */
      status: "connected" | "not_connected";

      /**
       * 로그인 상태일 때만 전달되는 사용자 정보
       */
      user: UserInfo;
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
        data?: { [key: string]: any };

        /**
         * 파일 첨부가 필요한 API에서 이용하는 파일 파라미터
         */
        files?: FileList | Array<File> | Array<Blob>;
      }): Promise<{ [key: string]: any }>;
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
      function authorize(settings?: {
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
       * @throws {AuthError}
       */
      function getStatusInfo(): Promise<StatusResponse>;

      /**
       * 현재 로그인되어 있는 사용자를 로그아웃시키고, 액세스 토큰을 삭제합니다.
       * @param callback 로그아웃 후 호출할 콜백 함수
       * @throws {AuthError}
       */
      function logout(): Promise<LogoutResponse>;

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
     * @see [Kakao.Channel](https://developers.kakao.com/sdk/reference/js/release/Kakao.Channel.html)
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
      }): void;

      /**
       * 카카오톡 채널 1:1 채팅을 시작합니다. 사용자의 클릭 이벤트 이후에 호출되어야 브라우저에 의해 팝업이 차단되지 않습니다.
       * @param settings 카카오톡 채널 추가와 관련된 설정을 key/value로 전달합니다.
       */
      function chat(settings: {
        /**
         * 대상 카카오톡 채널 홈 URL에 포함된 카카오톡 채널 공개 ID
         */
        channelPublicId: string;
      }): void;

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
      }): void;

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
      }): void;
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
     * @see [Kakao.Navi](https://developers.kakao.com/sdk/reference/js/release/Kakao.Navi.html)
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
      }): void;

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
      }): void;
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
     * @see [Kakao.Picker](https://developers.kakao.com/sdk/reference/js/release/Kakao.Picker.html)
     */
    namespace Picker {
      /**
       * 피커를 호출하기 위해 사용한 리소스를 해제합니다.
       */
      function cleanup(): void;

      /**
       * 한 명의 친구를 선택할 때 사용합니다.
       * @param settings 친구 피커와 관련된 설정을 key/value로 전달합니다.
       * @throws {PickerError}
       */
      function selectFriend(settings?: {
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
      }): Promise<FriendsPickerResponse>;

      /**
       * 여러 명의 친구를 선택할 때 사용합니다.
       * @param settings 친구 피커와 관련된 설정을 key/value로 전달합니다.
       * @throws {PickerError}
       */
      function selectFriends(settings?: {
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
      }): Promise<FriendsPickerResponse>;
    }

    /**
     * 메시지 하단에 추가되는 버튼 오브젝트입니다.
     */
    interface ButtonObject {
      /** 버튼의 타이틀 */
      title: string;

      /** 버튼 클릭 시 이동할 링크 정보 */
      link: LinkObject;
    }

    /**
     * 가격 정보를 표현하기 위해 사용되는 오브젝트입니다.
     */
    interface CommerceObject {
      /** 정상 가격 */
      regularPrice: number;

      /** 할인 가격 */
      discountPrice?: number | undefined;

      /** 할인율 */
      discountRate?: number | undefined;

      /** 정액 할인액 (할인율과 동시 사용 불가) */
      fixedDiscountPrice?: number | undefined;

      /**
       * 화폐 단위
       * @defaultValue `"원"`
       */
      currencyUnit?: string | undefined;

      /**
       * 화폐 단위 표기 위치 (0: 가격 뒤에 표기, 1: 가격 앞에 표기)
       * @defaultValue `0`
       */
      currencyUnitPosition?: number | undefined;

      /** 상품 이름 */
      productName?: string | undefined;
    }

    /**
     * 콘텐츠의 내용을 담고 있는 오브젝트입니다.
     */
    interface ContentObject {
      /** 콘텐츠의 타이틀 */
      title: string;

      /** 콘텐츠의 이미지 URL */
      imageUrl: string;

      /** 콘텐츠 클릭 시 이동할 링크 정보 */
      link: LinkObject;

      /** 콘텐츠의 이미지 너비 (단위: px) */
      imageWidth?: number | undefined;

      /** 콘텐츠의 이미지 높이 (단위: px) */
      imageHeight?: number | undefined;

      /** 콘텐츠의 상세 설명 */
      description?: string | undefined;
    }

    /**
     * 이미지 정보
     */
    interface ImageInfos {
      original: {
        /** 이미지 Full URL */
        url: string;

        /** 이미지 사이즈, 단위: Byte */
        length: number;

        /** 이미지 포맷 */
        content_type: string;

        /** 이미지 가로 크기 */
        width: number;

        /** 이미지 세로 크기 */
        height: number;
      };
    }

    /**
     * 아이템 목록 형태의 콘텐츠를 표현할 때 사용하는 오브젝트입니다.
     */
    interface ItemContentObject {
      /**
       * 헤더 또는 프로필 영역에 출력될 텍스트
       */
      profileText?: string;

      /**
       * 프로필 영역에 출력될 이미지
       */
      profileImageUrl?: string;

      /**
       * 이미지 아이템의 제목
       */
      titleImageText?: string;

      /**
       * 이미지 아이템의 이미지
       */
      titleImageUrl?: string;

      /**
       * 이미지 아이템의 제목 아래에 회색 글씨로 출력되는 카테고리 정보
       */
      titleImageCategory?: string;

      /**
       * 각 텍스트 아이템 정보, 최대 5개의 아이템 지원
       */
      items?: Array<ItemObject>;

      /**
       * 주문금액, 결제금액 등 아이템 영역의 요약 정보 제목
       */
      sum?: string;

      /**
       * 아이템 영역의 가격 합산 정보
       */
      sumOp?: string;
    }

    /**
     * 텍스트 아이템 정보
     */
    interface ItemObject {
      /**
       * 아이템 이름
       */
      item: string;

      /**
       * 아이템 가격
       */
      itemOp: string;
    }

    /**
     * 메시지에서 콘텐츠 영역이나 버튼 클릭 시에 이동되는 링크 정보 오브젝트입니다. 오브젝트 내 프로퍼티 중 하나 이상은 반드시 존재해야 합니다.
     */
    interface LinkObject {
      /** PC 버전 카카오톡에서 사용하는 웹 링크 URL */
      webUrl?: string | undefined;

      /** 모바일 카카오톡에서 사용하는 웹 링크 URL */
      mobileWebUrl?: string | undefined;

      /** 안드로이드 카카오톡에서 사용하는 앱 링크 URL에 사용될 파라미터 */
      androidExecParams?: string | undefined;

      /** iOS 카카오톡에서 사용하는 앱 링크 URL에 사용될 파라미터 */
      iosExecParams?: string | undefined;
    }

    /**
     * 좋아요 수, 댓글 수 등의 소셜 정보를 표현하기 위해 사용되는 오브젝트입니다.
     */
    interface SocialObject {
      /** 콘텐츠의 좋아요 수 */
      likeCount?: number | undefined;

      /** 콘텐츠의 댓글 수 */
      commentCount?: number | undefined;

      /** 콘텐츠의 공유 수 */
      sharedCount?: number | undefined;

      /** 콘텐츠의 조회 수 */
      viewCount?: number | undefined;

      /** 콘텐츠의 구독 수 */
      subscriberCount?: number | undefined;
    }

    type ObjectType = "commerce" | "feed" | "list" | "location" | "text";

    interface DefaultSettings<T extends ObjectType> {
      /**
       * 고정 값들("commerce", "feed", "list", "location", "text") 중 하나
       */
      objectType: T;

      /**
       * 기본 버튼 타이틀 변경, [내 애플리케이션 > 플랫폼 > 사이트 도메인]의 첫 번째 주소 링크 (buttonTitle 보다 buttons가 우선순위 높음)
       */
      buttonTitle?: string | undefined;

      /**
       * 버튼 타이틀 및 링크 설정 가능, 최대 2개의 버튼 지원
       */
      buttons?: ButtonObject[] | undefined;

      /**
       * 카카오톡이 설치되어 있지 않은 경우 마켓의 카카오톡 설치 페이지로 이동
       * @defaultValue `false`
       */
      installTalk?: boolean;

      /**
       * 데스크톱 환경에서 카카오톡 공유를 완료했을 때 호출되는 콜백 함수 (IE 미지원)
       */
      callback?: (...args: any[]) => any;

      /**
       * 카카오톡 공유 시 전송되는 알림에 포함되는 파라미터 ([전송 성공 알림 설정하기](https://developers.kakao.com/docs/latest/ko/message/js-link#set-kakaolink-callback))
       */
      serverCallbackArgs?: { [key: string]: any } | string | undefined;
    }

    type OneOfSettings =
      | DefaultFeedSettings
      | DefaultListSettings
      | DefaultLocationSettings
      | DefaultCommerceSettings
      | DefaultTextSettings;

    interface DefaultCommerceSettings extends DefaultSettings<"commerce"> {
      /**
       * 메인 콘텐츠
       */
      content: ContentObject;

      /**
       * 격 정보
       */
      commerce: CommerceObject;
    }

    interface DefaultFeedSettings extends DefaultSettings<"feed"> {
      /**
       * 메시지의 메인 콘텐츠 정보
       */
      content: ContentObject;

      /**
       * 아이템 영역에 포함할 콘텐츠
       */
      itemContent?: ItemContentObject | undefined;

      /**
       * 콘텐츠에 대한 소셜 정보
       */
      social?: SocialObject | undefined;
    }

    interface DefaultListSettings extends DefaultSettings<"list"> {
      /**
       * 헤더 타이틀
       */
      headerTitle: string;

      /**
       * 헤더 링크
       */
      headerLink: LinkObject;

      /**
       * 메인 콘텐츠
       */
      contents: ContentObject[];
    }

    interface DefaultLocationSettings extends DefaultSettings<"location"> {
      /**
       * 메인 콘텐츠
       */
      content: ContentObject;

      /**
       * 지도 뷰에서 사용 할 주소, ex) 성남시 분당구 판교역로 235
       */
      address: string;

      /**
       * 지도 뷰에서 사용될 주소명, ex) 카카오 본사
       */
      addressTitle?: string | undefined;

      /**
       * 소셜 정보
       */
      social?: SocialObject | undefined;
    }

    interface DefaultTextSettings extends DefaultSettings<"text"> {
      /**
       * 최대 200자의 텍스트
       */
      text: string;

      /**
       * 텍스트 클릭 시 이동할 링크 정보
       */
      link: LinkObject;
    }

    /**
     * 카카오톡 공유와 관련된 함수들이 포함되어 있습니다.
     * @see [Kakao.Share](https://developers.kakao.com/sdk/reference/js/release/Kakao.Share.html)
     */
    namespace Share {
      /**
       * 카카오톡 공유와 관련된 리소스를 해제합니다.
       */
      function cleanup(): void;

      /**
       * 메시지 템플릿을 이용하여 카카오톡 공유를 하는 기능입니다. [메시지 템플릿 가이드로 이동](https://developers.kakao.com/docs/latest/ko/message/message-template)
       * @param settings 카카오톡 공유와 관련된 설정을 key/value로 전달합니다.
       */
      function createCustomButton(settings: {
        /**
         * DOM Element 또는 Element의 ID Selector를 넘기면, 해당 Element를 클릭할 때 카카오톡 공유가 됩니다.
         */
        container: string | HTMLElement;

        /**
         * 메시지 템플릿 아이디, [내 애플리케이션 > 메시지 > 메시지 템플릿]에서 확인
         */
        templateId: number;

        /**
         * 메시지 템플릿에서 활용할 arguments, ex) {'name':'kakao', 'url':'https://developers.kakao.com'}
         */
        templateArgs?: { [key: string]: any };

        /**
         * 카카오톡이 설치되어 있지 않은 경우 마켓의 카카오톡 설치 페이지로 이동
         * @defaultValue `false`
         */
        installTalk?: boolean;

        /**
         * 데스크톱 환경에서 카카오톡 공유를 완료했을 때 호출되는 콜백 함수 (IE 미지원)
         */
        callback?: (...args: any[]) => any;

        /**
         * 카카오톡 공유 시 전송되는 알림에 포함되는 파라미터 ([전송 성공 알림 설정하기](https://developers.kakao.com/docs/latest/ko/message/js-link#set-kakaolink-callback))
         */
        serverCallbackArgs?: { [key: string]: any } | string;
      }): void;

      /**
       * 기본 템플릿 타입 (Feed, List, Location, Commerce, Text)에 따라 메시지를 구성하여 카카오톡 공유를 하는 기능입니다.
       * @param settings 카카오톡 공유와 관련된 설정을 key/value로 전달합니다.
       */
      function createDefaultButton(
        settings: { container: string | HTMLElement } & OneOfSettings
      ): void;

      /**
       * 사이트의 메타 정보를 활용하여 카카오톡 공유를 하는 기능입니다.
       * @param settings 카카오톡 공유와 관련된 설정을 key/value로 전달합니다.
       */
      function createScrapButton(settings: {
        /**
         * DOM Element 또는 Element의 ID Selector를 넘기면, 해당 Element를 클릭할 때 카카오톡 공유가 됩니다.
         */
        container: string | HTMLElement;

        /**
         * 스크랩할 사이트 URL, 해당 사이트의 메타 정보를 토대로 메시지 생성
         */
        requestUrl: string;

        /**
         * 메시지 템플릿 아이디, [내 애플리케이션 > 메시지 > 메시지 템플릿]에서 확인
         */
        templateId?: number;

        /**
         * 메시지 템플릿에서 활용할 arguments, ex) {'name':'kakao', 'url':'https://developers.kakao.com'}
         */
        templateArgs?: { [key: string]: any };

        /**
         * 카카오톡이 설치되어 있지 않은 경우 마켓의 카카오톡 설치 페이지로 이동
         * @defaultValue `false`
         */
        installTalk?: boolean;

        /**
         * 데스크톱 환경에서 카카오톡 공유를 완료했을 때 호출되는 콜백 함수 (IE 미지원)
         */
        callback?: (...args: any[]) => any;

        /**
         * 카카오톡 공유 시 전송되는 알림에 포함되는 파라미터 ([전송 성공 알림 설정하기](https://developers.kakao.com/docs/latest/ko/message/js-link#set-kakaolink-callback))
         */
        serverCallbackArgs?: { [key: string]: any } | string;
      }): void;

      /**
       * 업로드된 이미지의 경로를 전달하면 이미지를 삭제할 수 있습니다.
       * @param settings 이미지와 관련된 설정을 key/value로 전달합니다.
       */
      function deleteImage(settings: {
        /**
         * 삭제할 이미지 URL
         */
        imageUrl: string;
      }): Promise<void>;

      /**
       * 스크랩하고 싶은 이미지의 경로를 전달하면 스크랩 후 업로드합니다. (이미지는 20일 동안 보관됩니다.)
       * @param settings 이미지와 관련된 설정을 key/value로 전달합니다.
       */
      function scrapImage(settings: {
        /**
         * 삭제할 이미지 URL
         */
        imageUrl: string;
      }): Promise<ImageInfos>;

      /**
       * 메시지 템플릿을 이용하여 카카오톡 공유를 하는 기능입니다. [메시지 템플릿 가이드로 이동](https://developers.kakao.com/docs/latest/ko/message/message-template)
       * @param settings 카카오톡 공유와 관련된 설정을 key/value로 전달합니다.
       */
      function sendCustom(settings: {
        /**
         * 메시지 템플릿 아이디, [내 애플리케이션 > 메시지 > 메시지 템플릿]에서 확인
         */
        templateId: number;

        /**
         * 메시지 템플릿에서 활용할 arguments, ex) {'name':'kakao', 'url':'https://developers.kakao.com'}
         */
        templateArgs?: { [key: string]: any };

        /**
         * 카카오톡이 설치되어 있지 않은 경우 마켓의 카카오톡 설치 페이지로 이동
         * @defaultValue `false`
         */
        installTalk?: boolean;

        /**
         * 데스크톱 환경에서 카카오톡 공유를 완료했을 때 호출되는 콜백 함수 (IE 미지원)
         */
        callback?: (...args: any[]) => any;

        /**
         * 카카오톡 공유 시 전송되는 알림에 포함되는 파라미터 ([전송 성공 알림 설정하기](https://developers.kakao.com/docs/latest/ko/message/js-link#set-kakaolink-callback))
         */
        serverCallbackArgs?: { [key: string]: any } | string;
      }): void;

      /**
       * 기본 템플릿 타입 (Feed, List, Location, Commerce, Text)에 따라 메시지를 구성하여 카카오톡 공유를 하는 기능입니다.
       * @param settings 카카오톡 공유와 관련된 설정을 key/value로 전달합니다.
       */
      function sendDefault(settings: OneOfSettings): void;

      /**
       * 사이트의 메타 정보를 활용하여 카카오톡 공유를 하는 기능입니다.
       * @param settings 카카오톡 공유와 관련된 설정을 key/value로 전달합니다.
       */
      function sendScrap(settings: {
        /**
         * 스크랩할 사이트 URL, 해당 사이트의 메타 정보를 토대로 메시지 생성
         */
        requestUrl: string;

        /**
         * 메시지 템플릿 아이디, [내 애플리케이션 > 메시지 > 메시지 템플릿]에서 확인
         */
        templateId?: number;

        /**
         * 메시지 템플릿에서 활용할 arguments, ex) {'name':'kakao', 'url':'https://developers.kakao.com'}
         */
        templateArgs?: { [key: string]: any };

        /**
         * 카카오톡이 설치되어 있지 않은 경우 마켓의 카카오톡 설치 페이지로 이동
         * @defaultValue `false`
         */
        installTalk?: boolean;

        /**
         * 데스크톱 환경에서 카카오톡 공유를 완료했을 때 호출되는 콜백 함수 (IE 미지원)
         */
        callback?: (...args: any[]) => any;

        /**
         * 카카오톡 공유 시 전송되는 알림에 포함되는 파라미터 ([전송 성공 알림 설정하기](https://developers.kakao.com/docs/latest/ko/message/js-link#set-kakaolink-callback))
         */
        serverCallbackArgs?: { [key: string]: any } | string;
      }): void;

      /**
       * 카카오톡 공유에 필요한 이미지를 업로드 합니다. (이미지는 20일 동안 보관됩니다.)
       * @param settings 이미지와 관련된 설정을 key/value로 전달합니다.
       */
      function uploadImage(settings: {
        /**
         * HTMLInputElement의 files property
         */
        file: FileList;
      }): Promise<ImageInfos>;
    }

    /**
     * 카카오스토리 플러그인들과 관련된 함수들이 포함되어 있습니다.
     * @see [Kakao.Story](https://developers.kakao.com/sdk/reference/js/release/Kakao.Story.html)
     */
    namespace Story {
      /**
       * 카카오스토리 공유 버튼과 관련된 리소스를 해제합니다.
       */
      function cleanup(): void;

      /**
       * 지정한 Element를 클릭할 때 카카오스토리 채널로부터 소식을 받도록 합니다.
       * @param settings 카카오스토리 소식받기 버튼과 관련된 설정을 key/value로 전달합니다.
       */
      function createFollowButton(settings: {
        /**
         * DOM Element 또는 Element의 ID Selector를 넘기면, 해당 Element를 클릭할 때 지정한 채널을 구독합니다.
         */
        container: string | HTMLElement;

        /**
         * 소식을 받을 카카오스토리 채널 ID. ex) kakao
         */
        id: string;

        /**
         * 구독자 수를 노출합니다.
         * @defaultValue `true`
         */
        showFollowerCount?: boolean;

        /**
         * 구독자 수를 노출할 형태를 정합니다.
         * @defaultValue `"horizontal"`
         */
        type?: string;
      }): void;

      /**
       * 지정한 Element를 클릭할 때 카카오스토리 공유 창이 열리도록 합니다.
       * @param settings 카카오스토리 공유 버튼과 관련된 설정을 key/value로 전달합니다.
       */
      function createShareButton(settings: {
        /**
         * DOM Element 또는 Element의 ID Selector를 넘기면, 해당 Element를 클릭할 때 지정한 채널을 구독합니다.
         */
        container: string | HTMLElement;

        /**
         * 카카오스토리로 공유할 웹 페이지의 URL.
         * @defaultValue `${current page's URL}`
         */
        url?: string;

        /**
         * 공유 창에 표시할 텍스트
         * @defaultValue `""`
         */
        text?: string;
      }): void;

      /**
       * 모바일 환경에서 카카오스토리 앱 공유 화면을 엽니다.
       * @param settings 카카오스토리 공유 버튼과 관련된 설정을 key/value로 전달합니다.
       */
      function open(settings: {
        /**
         * 카카오스토리 앱이 설치되어 있지 않은 경우 마켓의 카카오스토리 설치 페이지로 이동합니다.
         * @defaultValue `false`
         */
        install?: boolean;

        /**
         * 카카오스토리로 공유할 웹 페이지의 URL.
         * @defaultValue `${current page's URL}`
         */
        url?: string;

        /**
         * 공유 창에 표시할 텍스트
         * @defaultValue `""`
         */
        text?: string;

        /**
         * 위에 입력한 url에 대한 추가적인 정보 (입력하지 않을 경우 스크랩 서버가 자동으로 생성)
         */
        urlInfo?:
          | {
              /**
               * 스크랩 영역에 표시할 제목
               */
              title: string;
              /**
               * 스크랩 영역에 표시할 설명
               */
              desc?: string | undefined;
              /**
               * 스크랩 영역에 표시할 사이트 이름
               */
              name?: string | undefined;
              /**
               * 스크랩 영역에 표시할 대표 이미지 URL
               */
              images?: string[] | undefined;
            }
          | undefined;
      }): void;

      /**
       * 카카오스토리 웹 공유 창을 엽니다.
       * @param settings 카카오스토리 공유 버튼과 관련된 설정을 key/value로 전달합니다.
       */
      function share(settings: {
        /**
         * 카카오스토리로 공유할 웹 페이지의 URL.
         * @defaultValue `${current page's URL}`
         */
        url?: string;

        /**
         * 공유 창에 표시할 텍스트
         * @defaultValue `""`
         */
        text?: string;
      }): void;
    }

    /**
     * 공식 문서에 없는 함수
     * 카카오 동적 로딩 및 초기화
     */
    // export function initKakao(jsKey: string): void;
  }
}

/**
 * Kakao JS Script를 동적으로 불러오고 초기화 시킨다.
 * @param {string} "JavaScript 키"
 */
export function initKakao(jsKey: string): Promise<boolean> | void;

// export as namespace Kakao;
