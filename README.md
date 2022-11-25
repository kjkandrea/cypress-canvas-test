# cypress-tamagotchi-test

## 테스트의 이유

레퍼런스 : [실용적인 프런트엔드 테스트 전략 - 김동우](https://www.youtube.com/watch?v=q9d631Nl0_4)

일정 규모 이상 개발 조직에는 제품의 품질 안정성을 테스트하는 QA 조직이 존재한다.\
그럼에도 개발자가 자동화 테스트를 작성하고 테스트 코드의 중요성이 부각되는 이유는 무엇일까?

### Confidence (자신감, 신뢰)

내가 작성한 코드가 잘 돌아갈것이라는 확신.

## 테스트의 정의

입력값과 출력값을 검증한다. 

* client : 마우스, 키보드 입력 => 화면의 변경
* server : http 요청 => http 응답 

프론트엔드 테스트의 어려움의 근본적인 이유는 입출력을 검증하고 시뮬레이션 하는것이 힘들다는 것.

> 프런트엔드 코드는 사용자 환경과 밀접하게 연결되어 있고 복잡한 시각적 요소를 다루기 때문에 테스트를 자동화하기가 어렵습니다.
 
> 구현 상세(Implementation detail)에 대한 테스트를 지양하고, 동작(Behavior)을 테스트하라.

## StoryBook

테스트 도구라기보다는 개발 도구에 가까움

컴포넌트를 쏙 빼서 별도의 환경에서 개발하는 느낌으로 사용함. 시각적 요소에 특화 됨.

* 특정한 상태의 컴포넌트를 등록해두고 재사용
* 컴포넌트의 다양한 시각적 상태를 빠르게 파악할 수 있음
* 재현하기 어려운 복잡한 상태를 빠르게 재현 후 개발/수정 가능

시각적 테스트 자동화를 위한 **보조 도구**

* 검증이 필요한 다양한 시각적 케이스를 최소한의 도구로 관리
* 수동으로 테스트 할 때에도 많은 시간과 비용을 절약
* 자동화 도구를 도입할 때 추가 비용없이 사용 가능

기획/디자인 부서와의 커뮤니케이션 

* 디자인 QA를 위한 구현 결과물 공유 
* 구현 이슈나 프로토타이핑 결과를 공유하고 피드백 반영
* 디자인 시스템 가이드 문서

개발자 사이의 커뮤니케이션 

* 공통 컴포넌트의 사용법 가이드 및 API 문서로 활용
* 예제 페이지 / 튜토리얼 등의 문서로 활용

실제 테스트로는 재현하기 번거로운 상황 테스트 용이성 

* 다국어 화/뷰포트 등 다양한 물리적 환경 변경에 대한 테스트 가능
* 결제 실패 페이지 등 재현하기 어려운 케이스

## 테스트 단위

### 단위 테스트 

모듈 단위에 대한 테스트. 모듈의 연결 부위는 테스트 X

테스트 커버리지 영역이 낮음. 

> 유닛 테스트를 철저히 했다 하더라도 실제 조합했을 때 의미가 없는 경우가 있음

복잡한 로직이 없는 코드의 단위 테스트는 동어반복적 이다.

하지만, 핵심 알고리즘을 갖는 모듈에 대한 단위 테스트는 여전히 중요하다.

### 통합 테스트

컴포넌트의 동작을 하나의 단위로 다룬다. 테스트 커버리지가 높다. 

비용 대비 채산성이 효율적임.

## Cypress

브라우저 내부에서 실행

* 브라우저의 디버깅 도구(콘솔, 인스팩터 등) 사용 가능
* 브라우저 익스텐션(React Devtools 등) 사용 가능

프런트엔드 개발을 위한 기능

* 손쉬운 서버 요청/응답 모킹
* 실행된 모든 명령의 히스토리/스냅숏/데이터 확인 가능

jest tdd => UI가 안보이고 '왜' 실패했는지 파악이 어려워 답답함

Cypress 는 '왜' 를 파악하기 용이함. 클릭은 성공했는데 서버 요청에서 실패했구나!

## 정리 

* 내가 작성한 테스트가 신뢰를 주는지 항상 의심하자.
* 테스트는 비용이다. 불필요한 테스트는 최소화 하자.
* 시각적 테스트와 기능적 테스트를 분리하자.
* 시각적 테스트를 자동화할 때는 전문 테스트 도구 사용을 고려하자.
* 모듈 단위의 테스트보다 컴포넌트 단위의 통합 테스트를 먼저 생각하자.
* StoryBook 을 사용하면 시각적 요소를 편리하게 개발/테스트 할 수 있다.
* Cypress 를 사용하면 기능적 요소를 편리하게 개발/테스트 할 수 있다.
