import React from "react";

const UserView = () => {
  return (
    <div
      className="flex flex-col items-center w-96 mx-auto my-5 p-4 border border-gray-300 shadow-md
                transition duration-500 transform hover:shadow-xl cursor-pointer bg-white"
    >
      <div className="w-80 h-40 flex justify-center items-center">
        <div>여기에 사용자 실시간 화면</div>
      </div>
    </div>
  );
};

export default UserView;
