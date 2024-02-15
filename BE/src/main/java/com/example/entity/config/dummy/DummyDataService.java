package com.example.entity.config.dummy;

import com.example.entity.user.domain.Level;
import com.example.entity.user.domain.OAuthProvider;
import com.example.entity.user.domain.User;
import com.example.entity.user.repository.LevelRepository;
import com.example.entity.user.repository.UserRepository;
import com.example.entity.word.domain.Category;
import com.example.entity.word.domain.Subject;
import com.example.entity.word.domain.Word;
import com.example.entity.word.repository.SubjectRepository;
import com.example.entity.word.repository.WordRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DummyDataService {

    private final EntityManager em;
    private final WordRepository wordRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final LevelRepository levelRepository;
    @Transactional
    public void insertDummyData() {

        User user1 = User.builder()
                .email("asdf@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(0)
                .level(5)
                .nickname("하이테이블")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        userRepository.save(user1);

        User user2 = User.builder()
                .email("asd@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(50)
                .level(10)
                .nickname("싸피십기생")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        userRepository.save(user2);

        User user12 = User.builder()
                .email("asdawda@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(90)
                .level(20)
                .nickname("수어왕")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user3 = User.builder()
                .email("bbbnkajw@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(5)
                .level(2)
                .nickname("수어는참수어")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user4 = User.builder()
                .email("asiiiad@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(0)
                .level(1)
                .nickname("덕명동소통왕")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user5 = User.builder()
                .email("asdleza@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(15)
                .level(3)
                .nickname("레자미")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user6 = User.builder()
                .email("aggeasd@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(5)
                .level(1)
                .nickname("수어학과신입생")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user7 = User.builder()
                .email("asbrjskwd@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(145)
                .level(11)
                .nickname("베토벤")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user8 = User.builder()
                .email("abetho@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(320)
                .level(15)
                .nickname("헬렌켈러")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user9 = User.builder()
                .email("asd999@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(0)
                .level(9)
                .nickname("비둘기")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user10 = User.builder()
                .email("asdotjdd@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(0)
                .level(6)
                .nickname("대성혁")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();

        User user11 = User.builder()
                .email("asb302d@kakao.com")
                .correctCount(0)
                .maxCorrectCount(0)
                .solveCount(0)
                .imageUrl("image.com")
                .xp(15)
                .level(1)
                .nickname("비삼공이")
                .oAuthProvider(OAuthProvider.KAKAO)
                .isPlaying(false).build();
        userRepository.save(user3);
        userRepository.save(user4);
        userRepository.save(user5);
        userRepository.save(user6);
        userRepository.save(user7);
        userRepository.save(user8);
        userRepository.save(user9);
        userRepository.save(user10);
        userRepository.save(user11);
        userRepository.save(user12);

        for(int i=2; i<=100; i++) {
            Level newLv = Level.builder().level(i).xp(10+(50*(i-2))).build();
            levelRepository.save(newLv);
        }



        Subject none = insertSubject("none");
        Subject 일상 = insertSubject("일상");
        Subject 관계 = insertSubject("관계");
        Subject 감정 = insertSubject("감정");

        em.flush();

        // 자음
        insertWord(Category.자음,none,"ㄱ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/251751/MOV000264210_700X466.webm");
        insertWord(Category.자음,none,"ㄴ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20170313/443678/MOV000285079_700X466.webm");
        insertWord(Category.자음,none,"ㄷ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290083/MOV000285204_700X466.webm");
        insertWord(Category.자음,none,"ㄹ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/285677/MOV000285454_700X466.webm");
        insertWord(Category.자음,none,"ㅁ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290119/MOV000285550_700X466.webm");
        insertWord(Category.자음,none,"ㅂ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290132/MOV000285882_700X466.webm");
        insertWord(Category.자음,none,"ㅅ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290153/MOV000286310_700X466.webm");
        insertWord(Category.자음,none,"ㅇ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290182/MOV000286771_700X466.webm");
        insertWord(Category.자음,none,"ㅈ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290309/MOV000287815_700X466.webm");
        insertWord(Category.자음,none,"ㅊ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290334/MOV000288394_700X466.webm");
        insertWord(Category.자음,none,"ㅋ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290343/MOV000288507_700X466.webm");
        insertWord(Category.자음,none,"ㅌ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290351/MOV000288535_700X466.webm");
        insertWord(Category.자음,none,"ㅍ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290354/MOV000288592_700X466.webm");
        insertWord(Category.자음,none,"ㅎ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/290361/MOV000288825_700X466.webm");

        // 모음
        insertWord(Category.모음, none, "ㅏ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005855/MOV000359857_700X466.webm");
        insertWord(Category.모음, none, "ㅑ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005755/MOV000359832_700X466.webm");
        insertWord(Category.모음, none, "ㅓ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005757/MOV000359834_700X466.webm");
        insertWord(Category.모음, none, "ㅕ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005884/MOV000359886_700X466.webm");
        insertWord(Category.모음, none, "ㅗ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005885/MOV000359887_700X466.webm");
        insertWord(Category.모음, none, "ㅛ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005888/MOV000359890_700X466.webm");
        insertWord(Category.모음, none, "ㅜ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220727/1001927/MOV000359504_700X466.webm");
        insertWord(Category.모음, none, "ㅠ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009753/MOV000360050_700X466.webm");
        insertWord(Category.모음, none, "ㅡ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005890/MOV000359892_700X466.webm");
        insertWord(Category.모음, none, "ㅣ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009678/MOV000359988_700X466.webm");
        insertWord(Category.모음, none, "ㅐ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005754/MOV000359831_700X466.webm");
        insertWord(Category.모음, none, "ㅒ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005756/MOV000359833_700X466.webm");
        insertWord(Category.모음, none, "ㅔ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220727/1001923/MOV000359500_700X466.webm");
        insertWord(Category.모음, none, "ㅖ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009749/MOV000360046_700X466.webm");
        insertWord(Category.모음, none, "ㅢ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220727/1001948/MOV000359525_700X466.webm");
        insertWord(Category.모음, none, "ㅚ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220727/1001925/MOV000359502_700X466.webm");
        insertWord(Category.모음, none, "ㅟ", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20240118/1261087/MOV000361352_700X466.webm");

        // 숫자
        insertWord(Category.숫자,none,  "영, 0", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220727/1001978/MOV000359555_700X466.webm");
        insertWord(Category.숫자,none,  "하나, 1", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009715/MOV000360025_700X466.webm");
        insertWord(Category.숫자,none,  "둘, 2", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009765/MOV000360062_700X466.webm");
        insertWord(Category.숫자,none,  "셋, 3", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009785/MOV000360082_700X466.webm");
        insertWord(Category.숫자,none,  "넷, 4", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009763/MOV000360060_700X466.webm");
        insertWord(Category.숫자,none,  "다섯, 5", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005874/MOV000359876_700X466.webm");
        insertWord(Category.숫자,none,  "여섯, 6", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009786/MOV000360083_700X466.webm");
        insertWord(Category.숫자,none,  "일곱, 7", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009775/MOV000360072_700X466.webm");
        insertWord(Category.숫자,none,  "여덟, 8", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009769/MOV000360066_700X466.webm");
        insertWord(Category.숫자,none,  "아홉, 9", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009766/MOV000360063_700X466.webm");
        insertWord(Category.숫자,none,  "열, 10", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009774/MOV000360071_700X466.webm");
        insertWord(Category.숫자,none,  "백, 100", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009609/MOV000359943_700X466.webm");
        insertWord(Category.숫자,none,  "천, 1000", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009776/MOV000360073_700X466.webm");
        insertWord(Category.숫자,none,  "만", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220802/1005859/MOV000359861_700X466.webm");
        insertWord(Category.숫자,none,  "십만", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220811/1009743/MOV000360040_700X466.webm");
        insertWord(Category.숫자,none,  "백만", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220801/1004604/MOV000359684_700X466.webm");

        // 일상
        insertWord(Category.낱말, 일상, "안녕하세요", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191004/624421/MOV000244910_700X466.mp4");
        insertWord(Category.낱말, 일상, "감사합니다", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/632085/MOV000243986_700X466.mp4");
        insertWord(Category.낱말, 일상, "죄송하다", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191022/630183/MOV000253802_700X466.mp4");
        insertWord(Category.낱말, 일상, "안녕히 계세요", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191004/624422/MOV000246604_700X466.mp4");
        insertWord(Category.낱말, 일상, "오랜만", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20190918/615385/MOV000245472_700X466.mp4");
        insertWord(Category.낱말, 일상, "만나다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191029/632284/MOV000252208_700X466.mp4");
        insertWord(Category.낱말, 일상, "어떻게", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200820/732339/MOV000257357_700X466.mp4");
        insertWord(Category.낱말, 일상, "도움", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191010/626234/MOV000236648_700X466.mp4");
        insertWord(Category.낱말, 일상, "아니다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191101/633271/MOV000260442_700X466.mp4");
        insertWord(Category.낱말, 일상, "하지 마", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631969/MOV000246778_700X466.mp4");
        insertWord(Category.낱말, 일상, "맞다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631894/MOV000241295_700X466.mp4");
        insertWord(Category.낱말, 일상, "인사", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191021/629456/MOV000257117_700X466.mp4");
        insertWord(Category.낱말, 일상, "문제", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191016/628090/MOV000250701_700X466.mp4");
        insertWord(Category.낱말, 일상, "코딩", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/271794/MOV000273323_700X466.mp4");


        // 관계
        insertWord(Category.낱말, 관계, "엄마", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191004/624374/MOV000238631_700X466.mp4");
        insertWord(Category.낱말, 관계, "아빠", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191004/624399/MOV000239769_700X466.mp4");
        insertWord(Category.낱말, 관계, "친구", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191015/627705/MOV000257451_700X466.mp4");
        insertWord(Category.낱말, 관계, "절친하다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200821/733298/MOV000258060_700X466.mp4");
        insertWord(Category.낱말, 관계, "우정", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191024/630493/MOV000255166_700X466.mp4");
        insertWord(Category.낱말, 관계, "같이", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191001/623710/MOV000240291_700X466.mp4");
        insertWord(Category.낱말, 관계, "따로", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191028/631887/MOV000240345_700X466.mp4");
        insertWord(Category.낱말, 관계, "선생", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191029/632450/MOV000245908_700X466.mp4");


        // 감정
        insertWord(Category.낱말, 감정, "좋다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191022/629987/MOV000259382_700X466.mp4");
        insertWord(Category.낱말, 감정, "행복", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191025/630748/MOV000237400_700X466.mp4");
        insertWord(Category.낱말, 감정, "슬픔", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191016/628058/MOV000239357_700X466.mp4");
        insertWord(Category.낱말, 감정, "걱정", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191007/625140/MOV000249112_700X466.mp4");
        insertWord(Category.낱말, 감정, "배고프다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191017/628480/MOV000254728_700X466.mp4");
        insertWord(Category.낱말, 감정, "졸리다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200824/735073/MOV000259232_700X466.mp4");
        insertWord(Category.낱말, 감정, "무섭다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191025/630992/MOV000252416_700X466.mp4");
        insertWord(Category.낱말, 감정, "그립다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191007/625117/MOV000249030_700X466.mp4");
        insertWord(Category.낱말, 감정, "궁금하다", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191004/624431/MOV000248626_700X466.mp4");
        insertWord(Category.낱말, 감정, "신기하다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191025/630946/MOV000245688_700X466.mp4");
        insertWord(Category.낱말, 감정, "맛있다", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191014/627269/MOV000252525_700X466.mp4");
        insertWord(Category.낱말, 감정, "괜찮다", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191022/630119/MOV000249438_700X466.mp4");
        insertWord(Category.낱말, 감정, "사랑", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191021/629620/MOV000253928_700X466.mp4");
        insertWord(Category.낱말, 감정, "농담", "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191011/626645/MOV000252448_700X466.mp4");
        insertWord(Category.낱말, 감정, "가능", "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200821/732879/MOV000249484_700X466.mp4");



    }






    private Word insertWord(Category category, Subject subject, String name, String videoUrl) {
        Word word = Word.builder()
                .category(category)
                .subject(subject)
                .wordName(name)
                .videoUrl(videoUrl)
                .build();

        return wordRepository.save(word);
    }

    private Subject insertSubject(String subjectName) {
        Subject subject = Subject.builder().subjectName(subjectName).build();

        return subjectRepository.save(subject);
    }

    public void insertUser() {

    }

    public void insertSingleHistory() {


    }

    public void insertQuizroom() {

    }




}
