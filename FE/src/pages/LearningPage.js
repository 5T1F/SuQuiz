import Container from "../components/Container";
import SelectCategory from "../feature/Learning/SelectCategory";

export default function LearningPage() {
  return (
    <>
      <Container>
        <div>학습하기</div>
        <SelectCategory />
      </Container>
    </>
  );
}
