import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../common/feature/slices/auth.slice";

import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import MyPageHeader from "./compoents/mypage.header";
import ProfileCard from "./compoents/profile.card";
import Title from "../_scanner/_organisms/title/_title";
import constant from "../../constants/constant";

import base64String from "./image.sample"; // base64 이미지 문자열 샘플

export default function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 스토어에서 사용자 정보를 가져오기
  const { image, nickname, age, gender, height, weight, diseaseList } =
    useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 테스트용 프로필 정보 더미 데이터
  const profileData = {
    // base64 이미지 스트링
    profile_image: image,
    nick: nickname,
    age: age,
    gender: gender == true ? "male" : "female",
    tall: height,
    weight: weight,
    diseaseList: diseaseList,
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const withdrawalHandler = () => {
    // 회원 탈퇴 로직
    console.log("회원탈퇴 버튼 누름");
  };

  const logOutHandler = () => {
    // 로그 아웃 로직
    console.log("로그아웃 버튼 누름");
    dispatch(setIsAuth(false)); // 인증 상태를 false로 설정
  };

  return (
    <div className="relative">
      <MyPageHeader />
      <Title title={constant.Title.mypage} />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-[80vh]">
          {/* <div className="font-semibold text-sm  my-2">내 프로필</div> */}
          <ProfileCard data={profileData} diseasesLimit={25} />

          <div className="mt-6">
            <div className="font-semibold text-sm mb-2">이용 안내</div>
            <div className="text-xs text-gray-500 mb-2">
              <button
                onClick={() => navigateTo("/profile/guide")}
                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40 hover:"
              >
                이용 안내
              </button>
            </div>
            <hr />
            <div className="font-semibold text-sm mb-2 mt-4">기타</div>
            <div className="text-xs text-gray-500 mb-2">
              <button
                onClick={() => navigateTo("/profile/terms")}
                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40"
              >
                서비스 이용약관
              </button>
              <button
                onClick={() => navigateTo("/profile/privacy")}
                className="w-full text-left no-underline hover:underline hover:text-mint03 p-2 hover:bg-gray-100 hover:opacity-40"
              >
                개인정보 처리 방침
              </button>
              <button
                onClick={withdrawalHandler}
                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40"
              >
                회원 탈퇴
              </button>
              <button
                onClick={logOutHandler}
                className="w-full text-left p-2 no-underline hover:underline hover:text-mint03 hover:bg-gray-100 hover:opacity-40"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation active="4" />
      {/* 배경 */}
      <div className="absolute bottom-0 w-full">
        <div className="relative w-full h-auto bottom-0">
          <img
            src={images.wave}
            alt="Background"
            className="fixed bottom-0 w-full h-60 z-[-1]"
          />
        </div>
      </div>
    </div>
  );
}
