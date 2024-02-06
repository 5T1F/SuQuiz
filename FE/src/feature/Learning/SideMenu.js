import CustomTab from "./CustomTab";
// import Search from "./Search";

export default function SideMenu({ selectedMain, selectedSub, setCurrentWord }) {
  return (
    <>
      {/* <Search wordList={wordLists[selectedMain]} /> */}
      <CustomTab selectedMain={selectedMain} selectedSub={selectedSub} setCurrentWord={setCurrentWord} />
    </>
  );
}
