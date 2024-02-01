import styles from "./Footer.module.css";
import Container from "./Container.js";

function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <ul className={styles.links}>
          <li>SuQuiz 소개</li>
          <li>개인정보 취급방침</li>
          <li>사용자 이용약관</li>
          <li>자주 묻는 질문</li>
        </ul>
        <ul className={styles.info}>
          <li>SuQuiz</li>
          <li>대표 | 5T1F </li>
          <li>개인정보보호책임자 | 5T1F </li>
          <li>대표 번호 | 042-***-**** </li>
          <li>사업자번호 | ***-**-****</li>
          <li>통신판매업 | 제****-대전**-****호 </li>
          <li>주소 | 대전광역시 유성구 덕명동 우리집 </li>
        </ul>
        <div className={styles.icons}>
          <img src="" alt="suquiz" />
          <div className={styles.sns}>
            <img src="" alt="facebook icon" />
            <img src="" alt="twitter icon" />
            <img src="" alt="instagram icon" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
