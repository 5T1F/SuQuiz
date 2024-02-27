import CustomTab from "./CustomTab";

export default function SideMenu({ selectedMain, selectedSub, setCurrentWord }) {
  return (
    <>
      <CustomTab selectedMain={selectedMain} selectedSub={selectedSub} setCurrentWord={setCurrentWord} />
    </>
  );
}
