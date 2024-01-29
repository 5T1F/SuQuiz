import Tab from "./Tab";
// import Search from "./Search";

export default function SideMenu({ selectedMain, selectedSub, wordList, setCurrentWord }) {
  return (
    <>
      {/* <Search wordList={wordLists[selectedMain]} /> */}
      <Tab selectedMain={selectedMain} selectedSub={selectedSub} wordList={wordList} setCurrentWord={setCurrentWord} />
    </>
  );
}
