# SuQuiz(수퀴즈) : 수어 학습 서비스


# 서비스 소개
> **💡 후천적 청각 장애인 또는 그들과 소통하고 싶은 사람들을 위한
 퀴즈 기반 수어 교육 서비스💡**


> **Easy Peasy Lemon SuQuizy!** 
> 수퀴즈와 함께라면 수어 학습도 식은 죽 먹기!

> 수어를 뜻하는 手와, 문제를 뜻하는 영단어 Quiz 를 합친 **수퀴즈(SuQuiz)는 게이미피케이션을 접목하여 사용자가 서로 경쟁하고 협동하며 즐겁게 수어를 학습할 수 있는 서비스**입니다.



# 제작 기간 및 참여 인원


## 제작 기간

2024.01.08 ~ 2024.02.16 (6주)

## 참여 인원


| 📌 **조담현** | 📌 **김현준** | 📌 **안윤철** | 📌 **최은희** | 📌 **정혜진** |
| ------ | ------ | ------ | ------ | ------ |
|<img src="/uploads/47ea2c79c838ee8fcc9244acd2d976a1/해적담현.png" height="120"/>|<img src="/uploads/8dd637d3d146e3abd751672dcf9c7f2f/다오현준.jfif" height="120"/>|<img src="/uploads/7c1a56575129252aad34ab1fb1a5729d/모스윤철.jpg"  height="120"/>|<img src="/uploads/d968a8f64979b765c4c27dcc5e664975/은희우니.png" height="120"/>|<img src="/uploads/7e0975dda902668908f3a503680849c3/마리드혜진.png" height="120"/>
|**👑팀장**|🖥️**개발 팀장**|👨‍💻**BE 팀장**|👩‍💻**FE 팀장**|📝**형상 관리자**|
|백엔드|백엔드|백엔드|프론트엔드|프론트엔드|
| 커뮤니케이션, 발표 |  개발 총괄, git 관리 | 간식 수급, DB | UI/UX 디자인 | 형상 관리(노션, JIRA) |
|[![Github](https://img.shields.io/badge/soberdam-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/soberdam)|[![Github](https://img.shields.io/badge/HyunEnn-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HyunEnn)|[![Github](https://img.shields.io/badge/yuncheol%20AHN-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yuncheol-AHN)|[![Github](https://img.shields.io/badge/gilukji226-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gilukji226) |[![Github](https://img.shields.io/badge/pado7sea-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pado7sea)




# 사용 기술


## 🚀  Stacks


<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> **HTML**


  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">  **CSS(SCSS)**


  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> **JavaScript**


  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  **React.js**


<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> **redux**


  
<img src="https://img.shields.io/badge/spring%20boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">  **Spring boot**


<img src="https://img.shields.io/badge/spring%20data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> **Spring data JPA**


<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">  **MySQL**



## 🔨  Tools

<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" alt="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" width="40px" /> **Figma**


<img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" width="40px" /> **Git**



## 👥  Collaboration


<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white"> **Gitlab**


<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> **Notion**


<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jirasoftware&logoColor=white"> **Jira**


# 기획 배경


- 청각장애 발생의 주된 원인 중 후천적 원인의 비율은 2008년 87.2%에서 2017년 92.4%로 5.2% 증가하였으며, **선천적 원인에 비해 후천적 청각장애 발생 비율이 더 높습니다.**
[참고자료 - 기사1](https://www.e-asr.org/m/journal/view.php?number=498)

- 청각장애인은 손을 이용하는 언어인 수어(手語)를 주된 의사소통 수단으로 쓰지만, 이들에 대한 **전문적 수어 교육은 제대로 이뤄지지 않는다**는 조사 결과가 나왔습니다.[참고자료 - 기사2](https://www.yna.co.kr/view/AKR20200111044600004)
- '청각장애인 고용차별 및 고용개선방안 실태조사'에서 청각장애인 응답자 과반(55.6%)이 수어를 학교 선후배나 친구에게 배웠다고 응답했습니다.
- 그러나 정식적인 수어 교육을 받았다는 응답 비율은 학교 교사에게서 배웠다는 응답은 29.1%, 전문 수어 강사로부터 교육받은 비율은 5.9%에 그쳤습니다.
- **청각장애인 교육을 위해 가장 필요한 지원으로 17.5%의 응답자가 '농인에게 맞는 교재개발'(17.5%)** 이라고 답했습니다.
- 혼자 학습하고 복습하는 인터넷 강의는 **지속적이지 못한 학습 방식**입니다. (참고자료 - 그림1)

- 이에 **지속적이며 즐거운 방식으로 수어를 학습할 수 있는 창구의 필요성**을 느껴, **게이미피케이션을 접목한 수화 교육 서비스 ‘수퀴즈’를 기획**하였습니다.

<details><summary>참고 자료</summary>

[기사1. 청각 장애 발생의 주된 원인 중 후천적 원인의 비율](https://www.e-asr.org/m/journal/view.php?number=498)  

[기사2. 청각장애인 수어교육 부실…정식으로 배운 이는 35%뿐 | 연합뉴스](https://www.yna.co.kr/view/AKR20200111044600004)

[기사3. 청각장애 아동이 게임을 통해 수화를 배운다면](https://www.earnews.org/news/articleView.html?idxno=341)

[기사4. 법만 만들고 공식 수어 교육기관은 '0'](https://news.sbs.co.kr/news/endPage.do?news_id=N1006682335)

<img src="/uploads/1d7827d66f8913dc2129643c6f33e50b/조회수.png" width="500"/>

[그림1. 차시가 늘어날수록 반비례하는 조회수.
출처 : 경기도평생학습포털](https://www.gseek.kr/member/rl/courseInfo/onCourseCsInfo.do?p=pMenuId=OTOP&courseSeq=1424&courseCsSeq=1&courseCateCode=E540) </details>

## 페르소나


<img src="/uploads/4ef8caff27a77e8360ef5192400156ea/페르소나1.png" width="800"/>

<img src="/uploads/aca7f9c2ab4bb496e8f81620ef8f38e5/페르소나2.png" width="800"/>

- 후천적으로 장애를 얻게 된 장애인
- 장애가 있는 사람과 소통하고 싶은 비 장애인 (가족, 주변 친구들)

# 📌 핵심 기능

- **웹 화상 RTC**를 통해서 다같이 모여 실시간으로 퀴즈를 맞추는 방식으로 학습합니다.
- 제시어를 단어나 그림으로 제시하고, 참가자가 이 제시어를 **수어에 해당하는 동작으로 맞췄을 시에 정답**
- 퀴즈의 정답 유무를 판별하는 기능은 **모션인식**과 **Teachable Machine**을 통해 구현합니다.
- 수어학습자료는 **국립국어원 open API**를 이용합니다.


### 학습하기

- 스테이지: 난이도별, 주제별로 구성된 학습 스테이지가 있습니다.
- 학습 영상: 국립국어원 API를 활용하여 제공되는 학습 영상과 단어 카드를 통해 학습할 수 있습니다.
- 학습 모드: 채팅 및 알림 기능 비활성화로 집중된 학습 환경을 제공합니다.

### 퀴즈 - 대전 모드

- 웹 기반 화상 채팅: 다른 사용자와 화상으로 수어동작과 얼굴을 보면서 실시간으로 경쟁합니다.
- 그림 그리기 : 한명씩 출제자가 돌아가며, 제시어에 해당되는 단어를 그림으로 그립니다. 
- 정답 채점 : 나머지 참가자는 단어를 추론하고 해당하는 수어 동작을 따라하여 점수를 획득합니다.

### 퀴즈 - 협동 모드

- 웹 기반 화상 채팅: 다른 사용자와 화상으로 수어동작과 얼굴을 보면서 실시간으로 협동합니다.
- 카운트다운 : 화면이 블라인드 되고, 카운트다운이 끝나면 참가자는 제시어에 해당하는 수어 동작을 따라합니다. 
- 정답 채점 : 모든 참가자가 수어 동작에 해당하는 자세를 동시에 취하면 점수를 획득합니다.


# 플로우 차트

![플로우차트](/uploads/a3fa27830e4017dfd2a154811a269ad0/플로우차트.png)


# 기능 명세서


# ERD 설계

![SUQUIZ_ERD]()

# 와이어 프레임

![피그마](/uploads/239aae282084bbea202efce42a4e57c2/피그마.PNG)

# 코드 컨벤션


```
1️⃣ 들여쓰기 (Indentation): Tab(space 2개) 사용

2️⃣ 문장이 종료될 때는 세미콜론을 사용한다.

3️⃣ 함수명, 변수명은 카멜케이스로 작성한다.

4️⃣ public과 private가 한 파일 안에 작성될 경우 첫 번째 클래스 혹은 인터페이스는 public이 먼저 위치하도록 한다.

5️⃣ 하나의 파일 안에 여러 개의 구조가 들어갈 경우에는, 공백 및 주석을 통해서 구분을 철저히 해준다.

6️⃣ 코드를 작성함에 있어, 한 줄에 80자가 넘어가면 무조건 줄바꿈을 통해서 코드 가독성을 높이도록 한다.

7️⃣ 선언은 한 줄에 하나씩 선언한다.

8️⃣ K&R 스타일로 중괄호 선언한다. 줄 마지막에 '{'를 사용하고 블럭을 종료할 때는 새줄을 삽입하고 '}'를 사용하여 종료한다.

```

## 상세 컨벤션

<details><summary>깃 커밋 메시지 컨벤션</summary>

## 커밋 메시지 컨벤션

<aside>

### 1. 커밋 유형 지정

- 커밋 유형은 영어 대문자로 작성하기
    
    
    | 커밋 유형 | 의미 |
    | --- | --- |
    | Feat | 새로운 기능 추가 |
    | Fix | 버그 수정 |
    | Docs | 문서 수정 |
    | Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
    | Refactor | 코드 리팩토링 |
    | Test | 테스트 코드, 리팩토링 테스트 코드 추가 |
    | Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
    | Design | CSS 등 사용자 UI 디자인 변경 |
    | Comment | 필요한 주석 추가 및 변경 |
    | Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
    | Remove | 파일을 삭제하는 작업만 수행한 경우 |
    | !BREAKING CHANGE | 커다란 API 변경의 경우 |
    | !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우 |

### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)
- 커밋 리뷰

### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

### 4. 제목은 영문 기준 50자 이내로 할 것

### 5. 자신의 코드가 직관적으로 바로 파악할 수 있다고 생각하지 말자

### 6. 여러가지 항목이 있다면 글머리 기호를 통해 가독성 높이기

```
- 변경 내용 1
- 변경 내용 2
- 변경 내용 3
```

</aside>

### CLI에서 커밋 메시지 여러 줄로 작성하는 방법

<aside>
✅ **쌍따옴표를 닫지 말고 개행하며 작성 → 다 작성한 후에 쌍따옴표를 닫으면 작성 완료**

```bash
git commit -m "FEAT: 회원가입 기능 추가

- 회원가입 기능 추가"
```

</aside>
</details>

<details><summary>Java 컨벤션</summary>

### 1. 파일 공통

**1.1. encoding : UTF-8**

모든 파일의 인코딩은 UTF-8로 통일

**1.2. 새줄 문자는 CRLF**

IDEA에서 설정 가능

### 2. 이름(Naming)

**2.1. 식별자에는 영문/숫자/언더스코어만 허용**

변수, 클래스, 메서드명 등에는 영어와 숫자만 사용

단어 사이를 구분하기 위해 ( _ ) 사용

**2.2. 한국어 발음대로 표기 금지**

*나쁜 예*

`moohyungJasan` (무형자산)

*좋은 예*

`intangibleAssets` (무형자산)

**2.3. 패키지 이름은 소문자로 구성**

*나쁜 예*

`package com.navercorp.apiGateway
 package com.navercorp.api_gateway`

*좋은 예*

`package com.navercorp.apigateway`

**2.4. 클래스/인터페이스 이름에 대문자 카멜표기법(파스칼 표기법) 적용**

*나쁜 예*

`public class reservation
 public class Accesstoken`

*좋은 예*

`public class Reservation
 public class AccessToken`

**2.5. 클래스 이름에 명사 사용**

클래스 이름은 명사나 명사절로 짓는다.

**2.6. 인터페이스 이름은 명사/형용사 사용**

인터페이스 이름은 명사/명사절 혹은 형용사/형용사절로 짓는다

*좋은 예*

`public interface RowMapper {
 public interface AutoClosable {`

**2.7. 테스트 클래스는 ‘Test’로 끝남**

*좋은 예*

`public class WatcherTest {`

**2.8. 메서드 이름에 소문자 카멜표기법 적용**

### 3. 선언(Declarations)

클래스, 필드, 메서드, 변수값, import문 등의 소스 구성요소를 선언할 때 고려해야할 규칙이다.

**3.1. 소스파일 당 1개의 탑레벨 클래스를 담기**

*나쁜 예*

`public class LogParser { }
 class LogType { }`

*좋은 예*

inner class

`public class LogParser {
    // 굳이 한 파일안에 선언해야 한다면 내부 클래스로 선언
    class LogType {
    }
}`

**3.2. static import에만 와일드 카드 허용**

*나쁜 예*

`import java.util.*;`

*좋은 예*

`import java.util.List;
 import java.util.ArrayList;`

**3.3. 제한자 선언의 순서**

클래스/메서드/멤버변수의 제한자는 Java Language Specification에서 명시한 아래의 순서로 쓴다.

`public protected private abstract static final transient volatile synchronized native strictfp`

( [Java Language Specification - Chapter 18. Syntax](http://docs.oracle.com/javase/specs/jls/se7/html/jls-18.html) 참조)

**3.4. 하나의 선언문에는 하나의 변수만**

변수 선언문은 한 문장에서 하나의 변수만을 다룬다.

*나쁜 예*

`int base, weight;`

*좋은 예*

`int base;
 int weight;`

**3.5. 배열에서 대괄호는 타입 뒤에 선언**

배열 선언에 오는 대괄호(`[]`)는 타입의 바로 뒤에 붙인다. 변수명 뒤에 붙이지 않는다.

*나쁜 예*

`String names[];`

*좋은 예*

`String[] names;`

**3.6. `long`형 값의 마지막에 `L`붙이기**

long형의 숫자에는 마지막에 대문자 'L’을 붙인다. 소문자 'l’보다 숫자 '1’과의 차이가 커서 가독성이 높아진다.

*나쁜 예*

`long base = 54423234211l;`

*좋은 예*

`long base = 54423234211L;`

### 4. 들여쓰기 (Indentation)

들여쓰기는 코드의 계층을 구분하기 위해

**4.1. 하드 탭 사용**

탭(tab) 문자를 사용하여 들여쓴다. 스페이스 X

**4.2. 탭의 크기 4개의 스페이스**

1개의 탭의 크기는 스페이스 4개와 같도록 에디터에서 설정한다.

### 5. 중괄호 (Braces)

**5.1. K&R 스타일로 중괄호 선언**

클래스 선언, 메서드 선언, 조건/반복문 등의 코드 블럭을 감싸는 중괄호에 적용되는 규칙이다. 중괄호 선언은 K&R 스타일(Kernighan and Ritchie style)을 따른다. 줄의 마지막에서 시작 중괄호`{`를 쓰고 열고 새줄을 삽입한다. 블럭을 마친후에는 새줄 삽입 후 중괄호를 닫는다.

*나쁜 예*

`public class SearchConditionParser
{
    public boolean isValidExpression(String exp)
    {
        if (exp == null)
        {
            return false;
        }
        for (char ch : exp.toCharArray())
        {
             ....
        }
        return true;
    }
}`

*좋은 예*

`public class SearchConditionParser {
    public boolean isValidExpression(String exp) {
        if (exp == null) {
            return false;
        }
        for (char ch : exp.toCharArray()) {
            ....
        }
        return true;
    }
}`

**5.2. 닫는 중괄호와 같은 줄에 `else`, `catch`, `finally`, `while` 선언**

아래의 키워드는 닫는 중괄호(`}`) 와 같은 줄에 쓴다.

- else
- catch, finaly
- do-while 문에서의 while
    
    *나쁜 예*
    
    `if (line.startWith(WARNING_PREFIX)) {
        return LogPattern.WARN;
    }
    else if (line.startWith(DANGER_PREFIX)) {
        return LogPattern.DANGER;
    }
    else {
        return LogPattern.NORMAL;
    }`
    
    *좋은 예*
    
    `if (line.startWith(WARNING_PREFIX)) {
        return LogPattern.WARN;
    } else if (line.startWith(DANGER_PREFIX)) {
        return LogPattern.NORMAL;
    } else {
        return LogPattern.NORMAL;
    }`
    
    5.3. 빈 블럭에 새줄 없이 중괄호 닫기 허용
    
    내용이 없는 블럭을 선언할 때는 같은 줄에서 중괄호를 닫는 것을 허용한다.
    
    *좋은 예*
    
    `public void close() {}`
    

**5.4. 조건/반복문에 중괄호 필수 사용**

조건, 반복문이 한 줄로 끝더라도 중괄호를 활용한다. 이 문서에 언급된 중괄호의 전후의 공백, 제어문 앞 뒤의 새줄 규칙도 함께 고려한다.

*나쁜 예*

`if (exp == null) return false;`

*좋은 예*

`if (exp == null) {
    return false;
}`

### 6**. 공백 (Whitespace)**

**6.1. 주석문 기호 전후의 공백 삽입**

주석의 전후에는 아래와 같이 공백을 삽입한다.

- 명령문과 같은 줄에 주석을 붙일 때 `//` 앞
- 주석 시작 기호 `//` 뒤
- 주석 시작 기호 `/*` 뒤
- 블록 주석을 한 줄로 작성시 종료 기호 `/` 앞
    
    *좋은 예*
    

```java
/*
 * 공백 후 주석내용 시작
 */

System.out.print(true); // 주석 기호 앞 뒤로 공백

/* 주석내용 앞에 공백, 뒤에도 공백 */
```
</details>

<details><summary>JavaScript 컨벤션</summary>

### 1. 파일 공통

**1.1. encoding : UTF-8**

모든 파일의 인코딩은 UTF-8로 통일

**1.2. 새줄 문자는 LF**

IDEA에서 설정 가능

### 2. 이름(Naming)

**2.1. 식별자에는 영문/숫자/언더스코어만 허용**

변수, 클래스, 메서드명 등에는 영어와 숫자만 사용

단어 사이를 구분하기 위해 ( _ ) 사용

**2.2. 한국어 발음대로 표기 금지**

*나쁜 예*

`moohyungJasan` (무형자산)

*좋은 예*

`intangibleAssets` (무형자산)

**2.3. 패키지 이름은 소문자로 구성**

*나쁜 예*

`package com.navercorp.apiGateway
 package com.navercorp.api_gateway`

*좋은 예*

`package com.navercorp.apigateway`

**2.4. 클래스/인터페이스 이름에 대문자 카멜표기법(파스칼 표기법) 적용**

*나쁜 예*

`public class reservation
 public class Accesstoken`

*좋은 예*

`public class Reservation
 public class AccessToken`

**2.5. 메서드 이름에 소문자 카멜표기법 적용**

상수는 영문 대문자 스네이크 표기법(Snake case)를 사용.

`SYMBOLIC_CONSTANTS;`

**2.6. (지역 변수 or private 변수)명은 '_'로 시작한다.**

`let _privateVariableName;
 let _privateFunctionName;

 // 객체일 경우
 const customObjectName = {};
 customObjectName.propertyName;
 customObjectName._privatePropertyName;
 _privateCustomObjectName;
 _privateCustomObjectName._privatePropertyName;`

### 3. 선언(Declarations)

**3.1. 변수**

값이 변하지 않는 변수는 `const`를, 값이 변하는 변수는 `let`을 사용하여 선언한다. `var`는 절대로 사용하지 않도록 한다.

**3.2. 전역 변수를 사용하지 않는다.**

자바스크립트는 전역 변수에 기반을 둔다. 즉, 모든 컴파일 단위는 하나의 공용 전역 객체(`window`)에 로딩된다. 전역 변수는 언제든지 프로그램의 모든 부분에서 접근할 수 있기 때문에 편하지만, 바꿔 말하면 프로그램의 모든 부분에서 변경될 수 있고, 그로 인해 프로그램에 치명적인 오류를 발생시킬 수 있다

```jsx
// Bad
myglobal = "hello";

// Good
let myglobal = "hello";
```

**3.3. 외부 모듈과 내부 모듈을 구분하여 사용한다.**

외부 모듈과 내부 모듈을 변수 참조할 때, 선언 사이에 공백을 두면 가독성이 좋아진다.

```jsx
// 외부 모듈
const lodash = require('lodash');
const $ = require(jquery);
const handlebars = require('handlebars');
const d3 = require('d3');

// 내부 모듈
const pluginFactory from '../../factories/pluginFactory';
const predicate from '../../helpers/predicate';
const raphaelRenderUtil from '../../plugins/raphaelRenderUtil';
```

**3.4. 배열과 객체는 반드시 리터럴로 선언한다.**

```jsx
// Bad
const emptyArr = new Array();
const arr = new Array(1, 2, 3, 4, 5);

// Bad - 객체 생성자 사용
const emptyObj = new Object();
const obj = new Object();

// Good
const emptyArr = [];
const arr = [1, 2, 3, 4, 5];

// Good
const emptyObj = {};
const obj = {
  pro1: 'val1', 
  pro2: 'val2'
};
```

**3.5 배열 복사 시 순환문을 사용하지 않는다.**

```jsx
const len = items.length;
let i;

// Bad
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// Good
const itemsCopy = [...items];
```

**3.6. 배열의 시작 괄호 안에 요소가 줄 바꿈으로 시작되었다면 끝 괄호 이전에도 일관된 줄 바꿈 해야한다.**

```jsx
// Bad
var a = [1
];

// Good
var c = [1];
var d = [
    1
];
```

**3.7. 배열의 요소중 하나라도 줄 바꿈이 있다면 배열 안의 요소는 일관되게 모두 줄 바꿈을 해주어야 한다.**

```jsx
// Bad
const d = [1,
  2, 3];
const e = [
  function foo() {
    dosomething();
  }, function bar() {
    dosomething();
  }
];

// Good
const a = [1, 2, 3];
const b = [
  1, 
  2, 
  3
];
```

**3.8. 객체의 프로퍼티가 1개인 경우에만 한 줄 정의를 허용하며, 2개 이상일 경우에는 개행을 강제한다.**

```jsx
// Bad - 개행
const obj = {foo: 'a', bar: 'b'}

// Good
const obj = {foo: 'a'};

// Good
const obj = {
  foo: 'a'
};
```

**3.9. 객체 리터럴 정의 시 콜론 앞은 공백을 허용하지 않고, 콜론 뒤는 공백을 강제한다.**

```jsx
// Bad
var obj = {
  foo : 'a'
}

// Good
var obj = {
  foo: 'a'
}
```

**3.10. 객체의 메서드 표현 시 `축약 메소드 표기`를 사용한다.** 

```jsx
// Bad
const atom = {
  value: 1,

  addValue: function(value) {
    return atom.value + value;
  }
};

// Good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  }
};
```

**3.11. `메서드 문법` 사용 시 메서드 사이에 개행을 추가한다.**

```jsx
// Bad
class MyClass {
  foo() {
    //...
  }
  bar() {
    //...
  }
}

// Good
class MyClass {
  foo() {
    //...
  }

  bar() {
    //...
  }
}
```

**3.12. 함수 생성자를 사용하여 선언하지 않는다.**

```jsx
// Bad - 함수 생성자 사용
const doSomething = new Function('param1', 'param2', 'return param1 + param2;');

// Good - 함수 선언식 사용
function doSomething(param1, param2) {
  return param1 + param2;
}

// Good - 함수 표현식 사용
const doSomething = function(param1, param2) {
  return param1 + param2;
};
```

**3.13. 함수는 사용 전에 선언해야 하며, 함수 선언문은 변수 선언문 다음에 오도록 한다.**

**3.14. 즉시 실행 함수는 권장되는 패턴으로만 사용한다.**

즉시 실행 함수에서 사용하는 괄호는 여러가지 형태로 표현할 수 있지만 혼란을 줄 수 있음으로 아래와 같이 한 가지 스타일로 작성한다.

```jsx
// Bad
(function() {
  ...
})();

// Good
(function() {
  ...
}());
```

**3.15. 함수 표현식 대신 화살표 함수를 사용한다.**

화살표 함수는 별도의 this 바인딩 없이 상위 컨텍스트에 바인딩되기 때문에 함수 표현식보다 혼란이 적으며 덜 장황하고 추론이 쉽다.

```jsx
// Bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// Good
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});
```

### 4. 모듈 (MODULE)

**4.1.항상 `import`와 `export`를 이용한다.**

다른 모듈 로드 방법과 혼용하여 사용하면 코드의 일관성이 없어진다.

```jsx
// Best
import {es6} from './AirbnbStyleGuide';
export default es6;

// Bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// Good
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;
```

**4.2. wildcard import는 사용하지 않는다.**

`with`문법을 지양해야 하는 것과 같은 이유로, 이름을 지정하지 않으면 모듈이 변경될 때마다 식별자 충돌이 발생할 수 있다.

```jsx
// Bad
import * from './AirbnbStyleGuide';

// Good
import * as AirbnbStyleGuide from './AirbnbStyleGuide';
```

### 5. 조건 확인하기

**5.1. 삼중 등호 연산자인 `===`, `!==`만 사용한다.**

`==`이나 `!=`는 암묵적 캐스팅으로 타입에 관계없이 판단되어 조건문의 의도를 파악하기 어렵고 버그로 이어진다.

```jsx
const numberB = 777;

// Bad
if (numberB == '777') {
  ...
}

// Good
if (numberB === 777) {
  ...
}
```

### 6. 반환하기 (RETURN)

**6.1. 함수 내에서 반환은 한 번만 한다.**

특정 값을 반환해야 하는 경우, 함수 맨 마지막에서 한 번만 반환한다. 단, 예외로 빠져나가는 경우는 제외한다. 코드를 예측하기 쉬우며 흐름이 간결한 함수를 작성할 수 있다.

```jsx
// Bad
function getResult() {
  ...
  if (condition) {
    ...
    return someDataInTrue;
  }
  ...
  return someDataInFalse;
}

// Allow
function foo(isValid) {
  ...
  // 예외처리로 바로 빠져나감
  if (!isValid) {
    return;
  }
  ...
  
  return someDataInTrue;
}

// Good
function getResult() {
  let resultData;
  ...

  if (condition) {
    ...
    resultData = someDataInTrue;
  } else {
    ...
    resultData = someDataInFalse;
  }

  return resultData;
}
```

**6.2. `return`문 바로 위는 한 칸 비워 놓는다.**

다른 명령과 `return`문이 붙어있으면 가독성이 좋지 않으므로 `return`문 전에 한 줄 띄운다

```jsx
// Bad
function getResult() {
  ...
  return someDataInFalse;
}

// Good
function getResult() {
  ...

  return someDataInFalse;
}
```
</details>

### 컨벤션 참고 자료

[캠퍼스 핵데이 Java 코딩 컨벤션](https://naver.github.io/hackday-conventions-java/)

[네이버 JavaScript 코딩 컨벤션](https://github.com/naver/eslint-config-naver/blob/master/STYLE_GUIDE.md)

# 시스템 아키텍처

# 시퀀스 다이어그램


# 프로젝트 산출물

[플로우 차트](https://lab.ssafy.com/s10-webmobile1-sub1/S10P11B302/-/blob/master/docs/SUQUIZ_%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%B0%A8%ED%8A%B8.png?ref_type=heads)

[기능 명세서]()

[ERD]()

[와이어프레임](https://lab.ssafy.com/s10-webmobile1-sub1/S10P11B302/-/blob/master/docs/SUQUIZ_%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84.png)

[시스템 아키텍쳐]()

[시퀀스 다이어그램]()

[화면 설계서]()
