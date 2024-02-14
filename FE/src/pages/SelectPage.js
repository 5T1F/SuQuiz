import Container from "../components/Container";
import SelectCategory from "../feature/Learning/SelectCategory";

export default function SelectPage() {
  return (
    <>
      <Container>
        <div className="h-[90vh]">
          <SelectCategory />
        </div>
      </Container>
    </>
  );
}
