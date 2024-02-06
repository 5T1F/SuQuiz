import React, { useState, useEffect } from "react";
import FriendList from "./FriendList";
import WaitingFriendList from "./WaitingFriendList";
import Chatting from "./Chatting";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

function CustomTab({ selectedMain }) {
  // 로그인 완성 되면 채우기 *************************
  const userId = null; // 친구 요청 목록을 위해
  const [activeTab, setActiveTab] = useState(selectedMain || "FriendList");

  // 카테고리 가져오는 api 대신
  const mainCategories = ["FriendList", "WaitingFriendList", "Chatting"];

  useEffect(() => {
    if (selectedMain) {
      setActiveTab(selectedMain);
    }
  }, [selectedMain]);

  return (
    <>
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
        <TabsHeader className="p-1 text-sm text-gray-600 bg-gray-500/5 rounded-xl">
          {mainCategories.map((category) => (
            <Tab
              key={category}
              value={category}
              onClick={() => setActiveTab(category)}
              className={`flex items-center h-6 font-medium rounded-lg outline-none ${
                activeTab === category
                  ? "border-blue-500 text-yellow-500 shadow bg-white"
                  : "text-gray-500 cursor-pointer  hover:text-yellow-500 hover:ring-2 hover:ring-yellow-500 hover:ring-inset"
              }`}
            >
              {category}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="py-1">
          {mainCategories.map(
            (category) =>
              activeTab === category && (
                <TabPanel key={category} value={category}>
                  {activeTab === "FriendList" && <FriendList />}
                  {activeTab === "WaitingFriendList" && <WaitingFriendList userId={userId} />}
                  {activeTab === "Chatting" && <Chatting />}
                </TabPanel>
              )
          )}
        </TabsBody>
      </Tabs>
    </>
  );
}

export default CustomTab;
