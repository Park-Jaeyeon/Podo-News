import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUserInfo } from "./repositories/user.repository";
import { setUserInfo } from "../../common/feature/slices/user.slice";

import images from "../../constants/image.constant";

import GenderButton from "../../common/components/gender.button";
import FirstLoginHeader from "./components/fistLogin.header";
import TagList from "../../common/components/tagList";
import { addSnackBar } from "../../common/feature/slices/snackBar.slice";
import axios from "axios";

export default function FirstLogin() {
  const imageUrl =
    "https://i.pinimg.com/564x/d6/4e/97/d64e9765deca662e8fa07d2cfdb67f7c.jpg";

  const [nick, setNick] = useState("");
  const [age, setAge] = useState("");
  const [tall, setTall] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [diseaseList, setDiseaseList] = useState([]);

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNickChange = (event) => {
    setNick(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleTallChange = (event) => {
    setTall(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleInputsChange = (newInputs) => {
    setDiseaseList(newInputs);
  };

  const handleHome = () => {
    navigate("/auth");
  };

  const handleDone = async () => {
    // 모든 필드가 비어있지 않고, tall과 weight가 숫자인지 검사
    if (
      !nick ||
      !selectedGender == null ||
      !age ||
      !tall ||
      !weight ||
      isNaN(Number(age)) ||
      isNaN(Number(tall)) ||
      isNaN(Number(weight))
    ) {
      dispatch(
        addSnackBar({
          id: Date.now(),
          message: "정보 입력 후 회원가입을 진행해 주세요",
        })
      );
      return;
    }

    const userInfo = {
      image: imageUrl,
      nick: nick,
      age: Number(age),
      height: Number(tall),
      weight: Number(weight),
      gender: selectedGender,
      disease_list: diseaseList,
    };

    await saveUserInfo(userInfo, token)
      .then(() => {
        dispatch(
          addSnackBar({
            id: Date.now(),
            message: "회원 정보 등록이 완료되었습니다",
          })
        );
        // Redux store에 유저 정보 저장
        // dispatch(
        //   setUserInfo({
        //     age: userInfo.age,
        //     gender: userInfo.gender,
        //     weight: userInfo.weight,
        //     height: userInfo.height,
        //     nickname: userInfo.nickname,
        //   })
        // );
        navigate("/home"); // 회원 정보 입력 완료 후 홈으로 이동
      })
      .catch((error) => {
        dispatch(
          addSnackBar({
            id: Date.now(),
            message: "회원 정보 저장 중 오류 발생",
          })
        );
      });

    const res = await axios.get("/patient/info", {
      headers: { Authorization: token },
    });

    dispatch(
      setUserInfo({
        image: res.data.patient.image,
        nickname: res.data.patient.nick,
        age: res.data.patient.age,
        height: res.data.patient.height,
        weight: res.data.patient.weight,
        gender: res.data.patient.gender,
        diseaseList: res.data.diseaseList,
        prescriptionList: res.data.prescriptionList,
      })
    );
  };

  return (
    <div className="relative">
      <FirstLoginHeader title="회원 정보 입력" />
      <div className="flex justify-center items-center">
        <div
          className="bg-opacity-100 mt-6 w-80 min-h-screen"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* 입력 필드 */}
          <div className="mb-14 px-6">
            <div className="text-sm mb-1 ml-1">별명</div>
            <input
              type="text"
              placeholder="별명을 입력하세요"
              onChange={handleNickChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">나이</div>
            <input
              type="number"
              placeholder="나이를 입력하세요"
              value={age}
              onChange={handleAgeChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">키</div>
            <input
              type="number"
              placeholder="키를 입력하세요(cm)"
              onChange={handleTallChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">몸무게</div>
            <input
              type="number"
              placeholder="몸무게를 입력하세요(kg)"
              onChange={handleWeightChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">성별</div>
            {/* 남자가 true, 여자가 false */}
            <GenderButton onGenderSelect={handleGenderSelect} />
            <div className="text-sm mt-3 mb-1 ml-1">질병 입력</div>
            <TagList
              onItemsChange={handleInputsChange}
              tagDatas={[]}
              placeholder="병명을 입력하세요"
            />
          </div>
          {/* 버튼 */}
          <div
            className="flex flex-row justify-between"
            style={{ marginBottom: "120px" }}
          >
            <button
              onClick={handleHome}
              className="w-24 py-1 font-semibold border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
            >
              처음으로
            </button>
            <button
              onClick={handleDone}
              className="w-24 py-1 font-semibold border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
            >
              완료
            </button>
          </div>
        </div>
      </div>
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
