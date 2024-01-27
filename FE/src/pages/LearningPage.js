import Container from "../components/Container";
import SelectCategory from "../feature/Learning/SelectCategory";

export default function LearningPage() {
  return (
    <>
      <Container>
        <div>학습하기페이지입니다.</div>

        <SelectCategory />
      </Container>
    </>
  );
}
