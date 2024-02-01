import Tab from "./Tab";

export default function Community() {
  const activeTab = "FriendList";
  return (
    <>
      <Tab selectedMain={activeTab} />
    </>
  );
}
