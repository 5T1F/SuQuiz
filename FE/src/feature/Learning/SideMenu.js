import Tab from "./Tab";

export default function SideMenu({ selectedMain, selectedSub }) {
  return (
    <>
      <Tab selectedMain={selectedMain} selectedSub={selectedSub} />
    </>
  );
}
