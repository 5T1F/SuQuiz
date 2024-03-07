<div align="center">
<img src="https://github.com/5T1F/SuQuiz/assets/106129404/efca27ec-d8a1-43bb-a1dc-d6fd813c9643" />
</div>

# SuQuiz(수퀴즈) : 수어 학습 서비스
### 목차
[1. 서비스 소개](#서비스-소개)

[2. 기술 스택](#기술-스택)

[3. 기획 배경](#기획-배경)  

[4. 핵심 기능](#핵심-기능)

[5. 기술적 특징](#기술적-특징)

[6. ERD](#erd)          

[7. 시스템 아키텍처](#시스템-아키텍처)   

[8. 개발 산출물](#개발-산출물)

[9. 서비스 시연 영상](#서비스-시연-영상)

[10. 제작 기간 및 참여 인원](#제작-기간-및-참여-인원)


&nbsp;


## 서비스 소개
> 💡 후천적 청각 장애인 또는 그들과 소통하고 싶은 사람들을 위한
 **퀴즈 기반 수어 교육 서비스**💡


> <b>*Easy Peasy Lemon SuQuizy!*</b>
> 수퀴즈와 함께라면 수어 학습도 식은 죽 먹기!

>  <b>수퀴즈(SuQuiz)</b>는 수어를 뜻하는 手와 문제를 뜻하는 영단어 Quiz 의 합성어로, 게이미피케이션을 접목하여 **퀴즈 게임을 통해 쉽고 즐겁게 수어를 학습할 수 있는 서비스**입니다.

&nbsp;





## 기술 스택

<div align="center">   

### 🚀  Stacks  🚀

#### FE ####
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css(scss)-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<br>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white"> 

#### BE #### 
<img src="https://img.shields.io/badge/spring%20boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/spring%20data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white">
<br>

#### AI ####
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Mediapipe-000000?style=for-the-badge&logo=Mediapipe&logoColor=white">   

#### WebRTC ####
<img src="https://img.shields.io/badge/openVidu-000000?style=for-the-badge&logo=openVidu&logoColor=white">

#### Infra ####
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonAWS&logoColor=white">  
<img src="https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=amazonEC2&logoColor=white">  
<img src="https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=Docker&logoColor=white">  
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white">  


&nbsp;
### 🔨  Tools 🔨 

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">


&nbsp;
### 👥  Collaboration  👥


<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jirasoftware&logoColor=white"> <img src="https://img.shields.io/badge/Gerrit-EEEEEE?style=for-the-badge&logo=Gerrit&logoColor=black"> 

</div>
&nbsp;   

## 기획 배경


- 청각장애 발생의 주된 원인 중 후천적 원인의 비율은 2008년 87.2%에서 2017년 92.4%로 5.2% 증가하였으며, **선천적 원인에 비해 후천적 청각장애 발생 비율이 더 높습니다.**
<sup>[참고자료 - 기사1](https://www.e-asr.org/m/journal/view.php?number=498)</sup>

- 청각장애인은 손을 이용하는 언어인 수어(手語)를 주된 의사소통 수단으로 쓰지만, 이들에 대한 **전문적 수어 교육은 제대로 이뤄지지 않는다**는 조사 결과가 나왔습니다.<sup>[참고자료 - 기사2](https://www.yna.co.kr/view/AKR20200111044600004)</sup>
- 정식적인 수어 교육을 받았다는 응답 비율은 학교 교사에게서 배웠다는 응답은 29.1%, 전문 수어 강사로부터 교육받은 비율은 5.9%에 그쳤습니다.
- 혼자 학습하고 복습하는 인터넷 강의는 **지속적이지 못한 학습 방식**입니다. <sup>[참고자료 - 그림1](https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B302/uploads/2c495201a840203d8417384b4c92f428/%EC%BA%A1%EC%B2%98.PNG)</sup>

- 이에 **지속적이며 즐거운 방식으로 수어를 학습할 수 있는 창구의 필요성**을 느껴, **게이미피케이션을 접목한 수화 교육 서비스 ‘수퀴즈’를 기획**하였습니다.

<details><summary>참고 자료</summary>

[기사1. 청각 장애 발생의 주된 원인 중 후천적 원인의 비율](https://www.e-asr.org/m/journal/view.php?number=498)  

[기사2. 청각장애인 수어교육 부실…정식으로 배운 이는 35%뿐 | 연합뉴스](https://www.yna.co.kr/view/AKR20200111044600004)

[기사3. 청각장애 아동이 게임을 통해 수화를 배운다면](https://www.earnews.org/news/articleView.html?idxno=341)

[기사4. 법만 만들고 공식 수어 교육기관은 '0'](https://news.sbs.co.kr/news/endPage.do?news_id=N1006682335)

<img src="https://github.com/5T1F/SuQuiz/assets/106129404/44046dab-f42c-49aa-b6de-734b762114cb" width="500"/>

[그림1. 차시가 늘어날수록 반비례하는 조회수.
출처 : 경기도평생학습포털](https://www.gseek.kr/member/rl/courseInfo/onCourseCsInfo.do?p=pMenuId=OTOP&courseSeq=1424&courseCsSeq=1&courseCateCode=E540) </details>

&nbsp;
### 페르소나
<div align="center">
<img src="https://github.com/5T1F/SuQuiz/assets/106129404/ca89c4ba-a285-43a4-afe8-a65d5973fb6d" width = 550> 
<img src="https://github.com/5T1F/SuQuiz/assets/106129404/d1946247-2365-4027-b20a-1ab413f9eff8" width = 550>
</div>

- 후천적으로 장애를 얻게 된 장애인
- 장애가 있는 사람과 소통하고 싶은 비 장애인 (가족, 주변 친구들)
- **수어를 처음부터 시작하는 기초 수어 학습자**

&nbsp;

## 핵심 기능

- **Web RTC 화상화면**을 통해서 실시간으로 퀴즈를 맞추는 방식으로 학습합니다.
- 참가자가 제시어에 해당하는 단어를 **수어에 해당하는 동작으로 맞췄을 시에 정답**입니다.
- 퀴즈의 정답 유무를 판별하는 기능은 **모션인식과 AI 모델을 통해 구현**합니다.
- 수어학습자료는 **국립국어원 Open API**를 이용합니다.


## 1. **학습하기**

- **기초 자음과 모음, 숫자를 카드형식으로 학습하고, 이를 웹캠에서 따라해보는 기능**
- 단어를 학습한 후, 단어장에 저장하여 원하는 단어를 복습 가능

### 학습모드 시작
![학습모드_시작](https://github.com/5T1F/SuQuiz/assets/106129404/5a9135e6-83e0-4676-ad47-718fc6a1cf4d)
- 학습하기를 눌러 카테고리와 주제를 선택하고, 학습을 시작합니다.

### 학습모드 인식
![학습모드_인식](https://github.com/5T1F/SuQuiz/assets/106129404/56cafc91-99cb-42c8-b82e-f372d701a22b)
- 제시어에 해당하는 영상을 통해 수어 동작을 따라해보고, 올바른 동작인지 확인합니다.

### 학습모드 탭 전환
![freecompress-학습모드_탭전환](https://github.com/5T1F/SuQuiz/assets/106129404/ea128a2f-4e4f-4e81-9c65-093af4b8b307)
- 탭 전환을 통해 다른 카테고리의 단어들을 학습할 수 있습니다.

### 단어장
![freecompress-단어장_단어추가](https://github.com/5T1F/SuQuiz/assets/106129404/6b17baa8-78cc-4b3c-96f5-8c03152e539c)
![freecompress-학습모드_단어장](https://github.com/5T1F/SuQuiz/assets/106129404/ffa4d393-f542-4264-bbce-9015e8cda96f)
- 학습한 단어를 단어장에 추가하고, 저장한 단어들을 복습할 수 있습니다.

&nbsp;
## 2. **싱글플레이(워들)**

- **학습하기를 통해 배운 기초 자음과 모음으로, 자음과 모음의 합성을 통해 단어를 추리하며 학습하는 기능**
- 랜덤으로 제시된 단어를 수어 동작을 통해 자음과 모음을 조합하여 하나씩 자리를 맞추는 게임

### 게임 플레이
![싱글플레이](https://github.com/5T1F/SuQuiz/assets/106129404/04af3255-b8c3-435e-8c0a-2d5075e9c953)
- 정확한 자리에 해당하는 자모음이면 초록색, 존재하는 자모음이나 자리가 다르면 노란색, 없는 자모음이면 회색으로 표시되며
- 최소한의 횟수에 단어를 맞추는 것이 게임의 목표입니다.

### 게임 결과
![싱글플레이_결과모달](https://github.com/5T1F/SuQuiz/assets/106129404/43a81757-029a-41fa-ba1d-92fb4ad4546e)
- 단어를 맞추면 그 단어에 해당하는 수어 영상을 보여줍니다.
- 현재까지 문제를 맞춘 날짜와, 도전횟수, 정답률, 최근 연속 정답일 수, 최근 연속 풀이일 수, 도전 횟수 분포등 퀴즈 풀이에 대한 다양한 통계를 보여줍니다.

### 결과 공유
![싱글플레이_결과복사](https://github.com/5T1F/SuQuiz/assets/106129404/d2c0abd7-47a4-489e-a042-64c1201b642e)
- 매일 정답 단어가 달라지며, 모든 사용자는 같은 문제를 공유합니다. 게임 결과를 클립보드에 복사하여 SNS 공유 가능할 수 있습니다.

### 튜토리얼
- 게임 하단에 게임 방법에 대한 튜토리얼을 캐러셀로 제공합니다.
&nbsp;
## 3. **멀티플레이(행맨)**

- **싱글 플레이(워들)에서 배운 단어로, 다른 사용자와 경쟁하며 학습한 단어를 응용 및 복습하는 기능**

### 방 생성하기
![freecompress-멀티플레이_방만들기_초대코드웹소켓](https://github.com/5T1F/SuQuiz/assets/106129404/f021d71d-240a-4f08-8df4-6b9777737192)
- 방 만들기를 통해 세션을 생성하고, 방장이 되어 초대코드를 다른 친구들에게 공유할 수 있습니다.

### 초대코드로 입장하기
![freecompress-멀티플레이_코드입장](https://github.com/5T1F/SuQuiz/assets/106129404/8480aaa2-4003-4090-8a85-285ae9ca29a7)
- 방장에게 채팅으로 받은 초대코드를 통해 세션에 입장할 수 있습니다.

### 게임 플레이
![ezgif-4-c941252864](https://github.com/5T1F/SuQuiz/assets/106129404/68e8669d-a6c4-46cc-8cdf-3079b41755ab)
- 제시어의 수어 영상과, 글자 수 만큼 빈칸이 제시됨
  1. 한 사람씩 돌아가면서 자음/모음을 수어로 동작함
  2. 제시어에 그 자음/모음이 있으면 빈칸이 채워지고, 맞추면 한 번 더 자음/모음을 수어로 시도할 기회가 주어짐
  3. 자기 차례에 제시어를 모두 완성시키면 승리!

### 게임 종료
![freecompress-멀티플레이_퀴즈종료_다시하기](https://github.com/5T1F/SuQuiz/assets/106129404/775e3169-c629-498c-957c-966be0e67f72)
- 결과창을 통해 게임 결과를 확인하고, 퀴즈를 맞춘 순위와 경험치 변동을 확인할 수 있습니다.
- 다시하기를 클릭하여 방에 남아 다음 게임을 플레이하거나, 방을 나갈 수 있습니다.
 
  


> **`💡 기초 자음모음(학습) → 단어(싱글플레이) → 응용 및 복습(멀티플레이)으로 교육 시나리오 구성`**
&nbsp;

## 기타 기능

### 소셜 로그인
- 네이버 소셜 로그인
- 카카오 소셜 로그인
- 회원가입 및 닉네임 유효성 검사

### 마이페이지
- 친구 요청, 친구 수락, 친구 삭제 기능
- 친구와의 1:1 채팅 기능
- 최대 연속 정답일 수, 최대 연속 풀이일 수, 누적 풀이 수, 정답률 등 퀴즈 풀이 정보 표시

### 퀴즈 랭킹
![퀴즈로비_랭킹리스트](https://github.com/5T1F/SuQuiz/assets/106129404/491c8a7c-c9da-45a0-b3b8-10572d1fd56c)
- 퀴즈를 선택할 수 있는 로비에서 멀티플레이를 통해 획득한 경험치 및 레벨의 랭킹을 확인


&nbsp;

## 기술적 특징

### 1. OpenVidu
- webRTC 기술을 활용하여 실시간 화상 미팅 서비스 구현
- OpenVidu 라이브러리 사용
- React에서 OpenVidu 라이브러리를 커스터마이징하여 화상 통신 화면을 구성하고,
- 웹 게임에 필요한 데이터를 OpenVidu signal 발생을 통해 세션 참가자들이 실시간으로 교환  
- Spring boot에서 세션을 관리하고,  클라이언트로부터 요청을 받아 새 세션id 혹은 토큰을 OpenVidu 서버에 요청
- 클라이언트는 응답받은 세션id와 토큰을 통해 세션에 참가 

### 2. MediaPipe
- Mediapipe Hands Library를 통해 수어에 필요한 손동작을 인식
- 26개의 랜드마크로 구성되어 있음

### 3. KNN-알고리즘
- OpenCV 및 KNN 알고리즘을 활용하여 사용자의 동작이 어떤 수어인지 분류하는 AI 모델 학습
&nbsp;

## ERD
<img src="https://github.com/5T1F/SuQuiz/assets/106129404/e646b453-d6e3-40d2-bbfb-09a29efa52da">

&nbsp;


## 시스템 아키텍처
<img src="https://github.com/5T1F/SuQuiz/assets/106129404/9c79e67f-f57a-4d91-98f8-9df1979475b4">

&nbsp;



## 개발 산출물

[기능 명세서](https://github.com/5T1F/SuQuiz/blob/master/docs/SuQuiz_%EA%B8%B0%EB%8A%A5_%EB%AA%85%EC%84%B8%EC%84%9C.pdf)

[api 명세서](https://github.com/5T1F/SuQuiz/blob/docs/docs/SuQuiz_API_%EB%AA%85%EC%84%B8%EC%84%9C.pdf)

[ERD](https://github.com/5T1F/SuQuiz/blob/master/docs/SuQuiz_ERD.png)

[시스템 아키텍처](https://github.com/5T1F/SuQuiz/blob/master/docs/SuQuiz_%EC%8B%9C%EC%8A%A4%ED%85%9C_%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)

[시퀀스 다이어그램](https://github.com/5T1F/SuQuiz/blob/master/docs/SuQuiz_%EC%8B%9C%ED%80%80%EC%8A%A4_%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8.png)

[와이어프레임](https://github.com/5T1F/SuQuiz/blob/master/docs/SuQuiz_%EC%99%80%EC%9D%B4%EC%96%B4_%ED%94%84%EB%A0%88%EC%9E%84.pdf)

[화면 정의서](https://github.com/5T1F/SuQuiz/blob/docs/docs/SuQuiz_%ED%99%94%EB%A9%B4%20%EC%A0%95%EC%9D%98%EC%84%9C.pdf)

[포팅 매뉴얼](https://github.com/5T1F/SuQuiz/blob/master/exec/SuQuiz_%ED%8F%AC%ED%8C%85_%EB%A7%A4%EB%89%B4%EC%96%BC.pdf)

[중간 프레젠테이션](https://github.com/5T1F/SuQuiz/blob/docs/docs/SuQuiz_%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C.pdf)

[최종 프레젠테이션](https://github.com/5T1F/SuQuiz/blob/docs/docs/SuQuiz_%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pdf)

&nbsp;

## 서비스 시연 영상

[유튜브 링크](https://www.youtube.com/watch?v=dMiubbUUIAk)


## 제작 기간 및 참여 인원

### 제작 기간

2024.01.08 ~ 2024.02.16 (6주)  

### 참여 인원

| 📌 **조담현** | 📌 **김현준** | 📌 **안윤철** | 📌 **최은희** | 📌 **정혜진** |
| :------: | :------: | :------: | :------: | :------: |
|<img src="https://github.com/5T1F/SuQuiz/assets/106129404/858bc88d-865b-4eda-87f2-093af550aedc" height="120"/>|<img src="https://github.com/5T1F/SuQuiz/assets/106129404/794ca586-edbc-4d13-93a1-123dfd84d5ce" height="120"/>|<img src="https://github.com/5T1F/SuQuiz/assets/106129404/19a8c2a8-ad9e-4af7-aaed-6ad082adf55e"  height="120"/>|<img src="https://github.com/5T1F/SuQuiz/assets/106129404/b41460bd-b02d-4803-b3eb-9e2455cb04be" height="120"/>|<img src="https://github.com/5T1F/SuQuiz/assets/106129404/0ab5b2cf-9d03-4bb8-aa2e-94afb14e837f" height="120"/>
|**👑팀장**|🖥️**개발 팀장**|👨‍💻**BE 리더**|👩‍💻**FE 리더**|📝**형상 관리자**|
|백엔드|백엔드|백엔드|프론트엔드|프론트엔드|
| PM, 발표, API, WebRTC, WebSocket | API, 아키텍처 설계, CI/CD 구축, 소셜로그인 | API, 수어 모션인식, AI 학습 | WebRTC, 소셜로그인 | 형상 관리, 워들 알고리즘, UI/UX |
|[![Github](https://img.shields.io/badge/soberdam-434343?style=for-the-badge&logo=github&logoColor=white)](https://github.com/soberdam)|[![Github](https://img.shields.io/badge/HyunEnn-59CAEF?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HyunEnn)|[![Github](https://img.shields.io/badge/yuncheol%20AHN-FFC605?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yuncheol-AHN)|[![Github](https://img.shields.io/badge/gilukji226-7DF475?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gilukji226) |[![Github](https://img.shields.io/badge/pado7sea-EB3A9D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pado7sea)|


