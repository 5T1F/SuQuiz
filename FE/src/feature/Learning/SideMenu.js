import Tab from "./Tab";
// import Search from "./Search";

export default function SideMenu({ selectedMain, selectedSub, wordLists, setCurrentWord }) {
  return (
    <>
      {/* <Search wordList={wordLists[selectedMain]} /> */}
      <Tab
        selectedMain={selectedMain}
        selectedSub={selectedSub}
        wordLists={wordLists}
        setCurrentWord={setCurrentWord}
      />
    </>
  );
}
