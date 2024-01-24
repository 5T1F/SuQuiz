# SuQuiz(수퀴즈) : 수어 학습 서비스


# 서비스 소개
> 💡 후천적 청각 장애인 또는 그들과 소통하고 싶은 사람들을 위한
 **퀴즈 기반 수어 교육 서비스**💡


> <b>*Easy Peasy Lemon SuQuizy!*</b>
> 수퀴즈와 함께라면 수어 학습도 식은 죽 먹기!

> 수어를 뜻하는 手와 문제를 뜻하는 영단어 Quiz 를 합친 <b>수퀴즈(SuQuiz)</b>는 게이미피케이션을 접목하여, 사용자가 **퀴즈 게임을 통해 쉽고 즐겁게 수어를 학습할 수 있는 서비스**입니다.



# 제작 기간 및 참여 인원


## 제작 기간

2024.01.08 ~ 2024.02.16 (6주)

## 참여 인원


| 📌 **조담현** | 📌 **김현준** | 📌 **안윤철** | 📌 **최은희** | 📌 **정혜진** |
| ------ | ------ | ------ | ------ | ------ |
|<img src="/uploads/560a424f6f5b2104f64942a2706b2e8c/담현로두마니.png" height="120"/>|<img src="/uploads/9c66b9a77e3391966612f7dc5c593f41/현준다오.png" height="120"/>|<img src="/uploads/440be7d76a7fab44bc0cd0b841264e0b/모스윤철.png"  height="120"/>|<img src="/uploads/11749ef346a4a833a4c96f9252a4a258/은희우니.png" height="120"/>|<img src="/uploads/a8e77996b9e2aa7daafa2814141f6764/마리드혜진.png" height="120"/>
|**👑팀장**|🖥️**개발 팀장**|👨‍💻**BE 리더**|👩‍💻**FE 리더**|📝**형상 관리자**|
|백엔드|백엔드|백엔드|프론트엔드|프론트엔드|
| PM, 영상, 발표 |  개발 총괄, git 관리 | 모션인식, DB | UI/UX 디자인 | 형상 관리, webRTC |
|[![Github](https://img.shields.io/badge/soberdam-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/soberdam)|[![Github](https://img.shields.io/badge/HyunEnn-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HyunEnn)|[![Github](https://img.shields.io/badge/yuncheol%20AHN-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yuncheol-AHN)|[![Github](https://img.shields.io/badge/gilukji226-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gilukji226) |[![Github](https://img.shields.io/badge/pado7sea-121013?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pado7sea)




# 사용 기술


## 🚀  Stacks


<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> **HTML**


  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">  **CSS(SCSS)**


  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> **JavaScript**


  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  **React.js**


<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> **Recoil**

React Query

Tailnwind CSS
  
<img src="https://img.shields.io/badge/spring%20boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">  **Spring boot**


<img src="https://img.shields.io/badge/spring%20data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> **Spring data JPA**

Hibernate

Django

Mediapipe

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">  **MySQL**



## 🔨  Tools

<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" alt="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" width="40px" /> **Figma**


<img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" width="40px" /> **Git**



## 👥  Collaboration


<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white"> **Gitlab**


<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> **Notion**


<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jirasoftware&logoColor=white"> **Jira**

Gerrit

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

<img src="/uploads/2c495201a840203d8417384b4c92f428/캡처.PNG" width="500"/>

[그림1. 차시가 늘어날수록 반비례하는 조회수.
출처 : 경기도평생학습포털](https://www.gseek.kr/member/rl/courseInfo/onCourseCsInfo.do?p=pMenuId=OTOP&courseSeq=1424&courseCsSeq=1&courseCateCode=E540) </details>

## 페르소나

![persona1](/uploads/9dfbf7187b1b983455aacde3078175df/persona1.png)
![persona2](/uploads/c495dd49711e56c2de2b03d36fd7f4d4/persona2.png)

- 후천적으로 장애를 얻게 된 장애인
- 장애가 있는 사람과 소통하고 싶은 비 장애인 (가족, 주변 친구들)
- **수어를 처음부터 시작하는 기초 수어 학습자**

# 📌 핵심 기능

- **웹 화상 RTC**를 통해서 실시간으로 퀴즈를 맞추는 방식으로 학습합니다.
- 참가자가 제시어에 해당하는 단어를 **수어에 해당하는 동작으로 맞췄을 시에 정답**
- 퀴즈의 정답 유무를 판별하는 기능은 **모션인식과 학습 모델을 통해 구현**합니다.
- 수어학습자료는 **국립국어원 open API**를 이용합니다.


### 1. **[학습하기]**

- **기초 자음과 모음, 숫자를 카드형식으로 학습하고, 이를 웹캠에서 따라해볼 수 있음**

 + 단어를 학습 + 단어장에 저장하여 단어 학습 가능

### 2. **[싱글플레이(워들)]**

- **학습하기를 통해 배운 기초 자음과 모음으로, 자음과 모음의 합성을 통해 단어 학습 가능**

<details><summary>워들 게임 상세설명</summary>
    
<img src="/uploads/c537af14cce19036c9976a314b84c8f8/꼬들.PNG" width = 500>

- 랜덤으로 제시된 단어를 수어로 하나씩 자리를 맞추는 게임
- 정확한 자리에 해당하는 자모음이면 초록색, 존재하는 자모음이나 자리가 다르면 노란색, 없는 자모음이면 회색으로 표시되며
- 최소한의 횟수에 단어를 맞추는 것이 게임의 목표
- 단어를 맞추면 그 단어에 해당하는 수어 영상을 보여줌
- 매일 정답 단어가 달라짐 → 게임 결과를 SNS 공유 가능 </details>
    

### 3. **[멀티플레이(행맨)]**

- **싱글 플레이(워들)에서 배운 단어로, 다른 사용자와 경쟁하며 학습한 단어를 응용 및 복습 가능**

- 행맨은 수어 영상에 해당하는 제시어를 정해진 카운트 안에 맞추는 게임으로, 단어를 많이 알수록 유리한 게임

<details><summary>행맨 게임 상세설명</summary>
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/75e3cd0a-7b05-464c-985a-da8058ac78c0/41b870e4-c7b0-4adf-bd12-0fc790a0aa7e/Untitled.png)

- 제시어의 수어 영상을 보여줌
- 제시어의 글자 수 만큼 빈칸이 있음
  1. 한 사람씩 돌아가면서 자음/모음을 수어로 동작함
  2. 제시어에 그 자음/모음이 있으면 빈칸이 채워지고, 맞추면 한 번 더 자음/모음을 수어로 할 기회가 주어짐
  3. 자기 차례에 제시어를 모두 완성시키면 승리 </details>

 


### `💡 기초 자음모음 → 단어 → 응용 및 복습으로 교육 시나리오가 구성되어 있음`




# 기능 명세서
| 우선순위 | 구분                                       | 주기능                                                                                            | 상세 기능                                                                       | 설명                                                                                                         | 비고                                             |
| ---- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 0    | 1\. Nav                                  | 1.1 로고                                                                                         | 1.1.1 로고를 누르면 메인으로 이동                                                       |                                                                                                            |                                                |
| 0    | 1.2 마이페이지 / 로그인                          | 1.2.1 로그인 전 - 로그인                                                                              |                                                                             |                                                                                                            |
| 0    | 1.2.2 로그인 후 - 마이페이지로 전환                  |                                                                                                |                                                                             |
| 0    | 1.3 단어장                                  | 1.3.1 학습하기에서 북마크한 단어                                                                           | \- 학습하기의 단어장 카테고리 페이지로 이동                                                   |                                                                                                            |
| 0    | 2\. 마이페이지                                | 2.1 마이페이지 - 내정보                                                                                | 2.1.1 레벨                                                                    |                                                                                                            | 레벨 정책                                          |
| 0    | 2.1.2 (꼬들) 문제 스트릭                        | \- 전체 도전 횟수<br>\- 문제 스트릭<br>\- 최근 연속 풀이<br>\- 최근 연속 정답<br>\- 최다 연속 정답<br>\- 오늘 푼 문제 공유 기능      |                                                                             |
| 2    | 2.1.3 프로필 사진                             |                                                                                                |                                                                             |
| 1    | 2.2 마이페이지 - 친구                           | 2.2.1. 친구 목록                                                                                   | \- 친구와 채팅하기<br>\- 친구 삭제                                                     |                                                                                                            |
| 1    | 2.2.2 친구 추가                              | \- 닉네임을 입력하고 요청 버튼을 누르면 친구 추가<br>\- 일치하는 유저가 없으면 경고 모달                                         |                                                                             |
| 1    | 2.2.3 채팅                                 | \- 웹 소켓을 활용한 1:1 채팅 기능<br>\- 친구 목록 옆 채팅을 누르면 최근 채팅으로 이동<br>\- 친구 프로필 옆 채팅을 누르면 해당 친구와의 채팅으로 이동 |                                                                             |
| 0    | 3.로그인/회원가입                               | 3.1 로그인                                                                                        | 3.1.1 소셜 로그인                                                                | 3가지 방식의 간편 로그인<br>\-구글 ( 고려 )<br>\- 카카오<br>\- 네이버                                                          |                                                |
| 0    | 3.1.2 회원가입 되어있는지 여부 체크                   |                                                                                                |                                                                             |
| 0    | 3.2 회원가입                                 | 3.2.1 소셜 회원가입                                                                                  | \- 구글 ( 고려 )<br>\- 카카오<br>\- 네이버                                            |                                                                                                            |
| 0    | 3.2.2 회원가입 되어있는지 여부 체크                   |                                                                                                |                                                                             |
| 0    | 3.2.3 닉네임 입력 시 중복 검사                     |                                                                                                |                                                                             |
| 0    | 4\. 메인                                   | 4.1 퀴즈 시작                                                                                      | 4.1.1 퀴즈 시작 로비로 이동                                                          |                                                                                                            |                                                |
| 0    | 4.2 학습 시작                                | 4.2.1 학습하기 페이지로 이동                                                                             |                                                                             |                                                                                                            |
| 0    | 5\. 학습                                   | 5.1 주제 선택                                                                                      | 5.1.1 지언어(자음, 모음, 숫자), 단어(동물, 감정 등), 단어장(내가 선택한 단어) 선택                      |                                                                                                            | 용어 정리<br>카테고리:자음모음숫자단어,<br>주제: 단어주제. 일상, 과일 등등 |
| 0    | 5.2 학습 영상                                | 5.2.1 국립국어원 API 활용하여 학습영상과 단어를 카드 형식으로 보여줌                                                     |                                                                             |                                                                                                            |
| 0    | 5.2.2 카드 뒤집기                             | \- 사진/영상을 카드 뒤집기 방식으로 전환                                                                       |                                                                             |
| 0    | 5.3 사용자 모션 인식 - 웹캠                       | 5.3.1 자음, 모음, 숫자만 모션인식                                                                         | \- 단어는 사용자에게 모방만 가능함을 간접적으로 안내                                              |                                                                                                            |
| 0    | 5.4 정답 화면                                | 5.4.1 자음 모음은 채점 후 정답 모양을 보여주기                                                                  |                                                                             |                                                                                                            |
| 0    | 5.5 북마크 저장 기능                            | 5.5.1 원하는 단어는 학습하며 바로 단어장에 저장                                                                  | \- 단어장에 추가된 단어는 노란별, 추가 전 단어는 회색별                                           |                                                                                                            |
| 0    | 5.6 종료하기                                 | 5.6.1 메인페이지로 이동                                                                                | \- 단어를 모두 학습하지 않았을 때 학습 종료 버튼을 누르면, 학습 나가기 모달<br>\- 단어를 모두 학습했을 때, 학습 종료 모달 |                                                                                                            |
| 0    | 6\. 퀴즈 시작 로비                             | 6.1 싱글 플레이                                                                                     | 6.1.1 싱글 퀴즈 페이지로 이동                                                         |                                                                                                            |                                                |
| 0    | 6.2 멀티 플레이                               | 6.2.1 멀티 퀴즈 페이지로 이동                                                                            |                                                                             |                                                                                                            |
| 0    | 6.3 (행맨) 랭킹                              | 6.3.1 사용자 경험치에 따라 순위를 보여줌                                                                      |                                                                             |                                                                                                            |
| 3    | 6.4 튜토리얼                                 | 6.4.1 버튼을 누르면 이미지 캐러셀                                                                          |                                                                             |                                                                                                            |
| 3    | 6.4.2 튜토리얼 건너뛰고 바로 게임 시작 가능              |                                                                                                |                                                                             |
| 0    | 7\. 싱글 플레이 - 워들                          | 7.1 오늘의 단어                                                                                     | 7.1.1 하루에 한 번 문제가 바뀌는 기능                                                    | \- 랜덤으로 제시된 단어를 수어로 하나씩 자리를 맞추는 게임<br>\- 최소한의 횟수에 단어를 맞추는 것이 게임의 목표<br>\- 매일 정답 단어가 달라짐 → 게임 결과를 SNS 공유 가능 |                                                |
| 0    | 7.2 워들 퀴즈                                | 7.2.1 사용자가 수어로 동작하면 인식                                                                         | \- 모션인식을 통해서 유저의 자음, 모음에 대한 동작을 분석해서 입력을 받음                                 | 한 단어 : 자모음 5개로 이루어진 단어<br>자음,모음 : 이중모음은 모음 한 개로 침.<br>한 단어를 맞출 기회는 총 6번<br>                                |
| 0    | 7.2.2 모든 칸을 채우면 있는 단어인지 체크               | \- 없는 단어라면 다음 줄로 넘어가지 않음                                                                       |                                                                             |
| 0    | 7.2.3 존재하는 단어라면 모음 자음 위치에 따라 결과 표시       | \- 정확한 자리에 해당하는 자모음이면 초록색<br>\- 존재하는 자모음이나 자리가 다르면 노란색<br>\- 존재하지 않는 자모음이면 회색으로 표시             |                                                                             |
| 0    | 7.2.4 정답이라면 단어에 맞는 수어 영상 가져오기            | \- 단어를 맞추면 그 단어에 해당하는 수어 영상을 보여줌                                                               |                                                                             |
| 0    | 7.3 싱글플레이 결과                             | 7.3.1 전체 도전 횟수                                                                                 |                                                                             |                                                                                                            |
| 0    | 7.3.2 문제 스트릭                             |                                                                                                |                                                                             |
| 0    | 7.3.3 연속 최대 풀이 횟수(연속 스트릭 일 수)            |                                                                                                |                                                                             |
| 0    | 7.3.4 최근 연속 정답                           |                                                                                                |                                                                             |
| 0    | 7.3.5 최근 최다 정답                           |                                                                                                |                                                                             |
| 0    | 7.3.6 도전 분포                              |                                                                                                |                                                                             |
| 0    | 7.3.7 SNS 공유                             | 클립보드에 칸 이미지 복사<br><br>꼬들 751 3/6 Kordle.Kr 🔥3<br><br>⬜🟩🟩⬜⬜⬜<br>⬜🟩🟩🟨🟩🟩<br>🟩🟩🟩🟩🟩🟩  |                                                                             |
| 0    | 7.3.8 더 풀어보기                             | \- 워들 게임부터 다시 시작<br>\- 해당 문제부터는 SNS공유 기능 비활성화, 랜덤 단어로 제시<br>\- 오늘의 단어 한문제로 부족한 사람들을 위해 존재하는 기능 |                                                                             |
| 0    | 8\. 멀티 플레이 - 행맨                          | 8.1 멀티플레이 방식 선택                                                                                | 8.1.1 빠른 시작과 사용자설정 게임                                                       | 문제 3문제                                                                                                     | webRTC, 채팅<br>몇문제할지 정책                         |
| 0    | 8.2 빠른 시작                                | 8.2.1 유저 매칭                                                                                    |                                                                             |                                                                                                            |
| 0    | 8.3 사용자 설정 게임                            | 8.3.1 방 만들기                                                                                    |                                                                             | 방장                                                                                                         |
| 0    | 8.3.2 방 참가하기                             | 초대코드로 참가                                                                                       | 유저                                                                          |
| 0    | 8.4 행맨 퀴즈                                | 8.4.1 제시어에 대한 수어 영상을 보여줌                                                                       | 카테고리와 제시어 수어 영상을 API의 MP4 영상을 가져옴                                           |                                                                                                            |
| 0    | 8.4.2 제시어의 자음, 모음의 수 만큼 빈칸이 있음           | 자음, 모음의 개수에 맞게 빈칸의 형태로 유저 모두에게 보여짐                                                             |                                                                             |
| 0    | 8.4.4 제시어에 관련된 자음, 모음이 존재하면 빈칸이 채워짐      | 모션인식을 통해서 유저의 자음, 모음에 대한 행동을 분석해서 입력을 받음                                                       |                                                                             |
| 0    | 정답이 맞으면 그 자리의 단어가 모든 사용자에게 해금됨           |                                                                                                |
| 0    | 8.4.5 맞추면 한번의 기회가 더 주어지고, 틀리면 다음 차례로 넘어감 | 정답을 맞출 수 있는 기회가 한번 더 주어짐                                                                       | 타이머 초기화 10 , 8, 6, 4 .. 한번에 못맞추게                                            |
| 0    | 8.4.6 자기 차례에 제시어를 모두 완성시키면 승리            | 모든 빈칸이 해금되면 그 턴의 유저가 승리                                                                        |                                                                             |
| 0    | 8.5. 멀티플레이 결과                            | 8.5.1 정답 수                                                                                     |                                                                             | EX) 총 3문제가 제시되었다면, 현재 유저의 맞춘 정보, 순위                                                                        |
| 0    | 8.5.2 경험치 부여                             | 맞춘 문제에 비례하여 경험치를 부여함                                                                           | 경험치 정책                                                                      |
| 0    | 8.5.3 단어들 목록                             | \- 진행되었던 문제들의 정답들을 목록 리스트로 보여줌<br>\- 리스트에서 단어장에 추가 가능                                          |                                                                             |
| 0    |                                          | 8.5.4 단어장 추가                                                                                   | 단어들을 북마크로 단어장에 추가 하는 기능                                                     |

# ERD 설계
<img src="/uploads/940cc26c224080a5c94fe3f0672e0ba6/SuQuiz_ERD.png">

# 와이어 프레임
<img src="">


# 시스템 아키텍처
<img src="/uploads/6e2e1b9ed595d772d75d30b2a5951c09/SUQUIZ_시스템_아키텍처.png">


# 시퀀스 다이어그램
<img src="/uploads/09aa2acb6611016fb42aea11614b9d44/SUQUIZ_시퀀스다이어그램.png">



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




# 프로젝트 산출물

[기능 명세서](https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B302/-/blob/master/docs/SuQuiz_%EA%B8%B0%EB%8A%A5_%EB%AA%85%EC%84%B8%EC%84%9C.pdf)

[ERD]
[ERD](https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B302/-/blob/master/docs/SuQuiz_ERD.png)

[와이어프레임]


[시스템 아키텍처](https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B302/-/blob/master/docs/SuQuiz_%EC%8B%9C%EC%8A%A4%ED%85%9C_%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)

[시퀀스 다이어그램](https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B302/-/blob/master/docs/SuQuiz_%EC%8B%9C%ED%80%80%EC%8A%A4_%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8.png)

[화면 정의서]
