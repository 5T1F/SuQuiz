import Container from "../components/Container";
import SelectCategory from "../feature/Learning/SelectCategory";

export default function SelectPage() {
  return (
    <>
      <Container>
        <h1>학습 분야 선택 페이지</h1>
        <SelectCategory />
      </Container>
    </>
  );
}
