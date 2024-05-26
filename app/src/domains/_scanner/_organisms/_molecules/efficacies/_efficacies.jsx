import React from "react";
import S from "./style";
import M from "../molecule.index";
import constant from "../../../../../constants/constant";

export default function Efficacies({
  medicineList,
  set,
  medicines,
  setMedicines,
}) {
  const [state, setState] = React.useState("");

  const mutateOCRSet = constant.efficacySet;

  const stateHandler = (efficacy, index) => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    if (efficacy === "medicine") {
      setMedicines((prev) => {
        const newMedicines = [...prev];
        const [selectedMedicine] = newMedicines.splice(index, 1);
        const addIndex = newMedicines.findIndex(
          (med) => med.efficacy === "add"
        );
        if (addIndex !== -1) {
          newMedicines.splice(addIndex, 0, selectedMedicine);
        } else {
          newMedicines.push(selectedMedicine);
        }
        return newMedicines;
      });
    }
    if (efficacy === "add") {
      setMedicines((prev) => {
        const newMedicines = [...prev];
        const [selectedMedicine] = newMedicines.splice(index, 1);

        newMedicines.push(selectedMedicine);
        return newMedicines;
      });
    }
    if (efficacy === state) {
      setState("");

      set(false);
    } else {
      setState(efficacy);

      set(true);

      setMedicines((prev) => {
        const newMedicines = [...prev];
        const [selectedMedicine] = newMedicines.splice(index, 1);
        return [selectedMedicine, ...newMedicines];
      });
    }
  };

  const handleDelete = (medicineIndex, nameIndex) => {
    setMedicines((prevMedicines) => {
      const updatedMedicines = prevMedicines.map((medicine, idx) => {
        if (
          idx === medicineIndex &&
          medicine.efficacy !== "add" &&
          medicine.nameList &&
          medicine.nameList.length > 0
        ) {
          const updatedNameList = medicine.nameList.filter(
            (_, ni) => ni !== nameIndex
          );
          return { ...medicine, nameList: updatedNameList };
        }
        return medicine;
      });

      return updatedMedicines.filter(
        (medicine) =>
          (medicine.nameList && medicine.nameList.length > 0) ||
          medicine.efficacy === "add"
      );
    });
  };

  const handleAddMedicine = (name, efficacy, count) => {
    const efficacyData = mutateOCRSet.find(
      (item) => item.efficacy === efficacy
    );

    const { title, ko, name: effName } = efficacyData;

    setMedicines((prevMedicines) => {
      const existingMedicineIndex = prevMedicines.findIndex(
        (medicine) => medicine.efficacy === efficacy
      );

      const description =
        "직접 저장하신 " +
        effName +
        "에요. 등록하시면 필팩AI가 의약품을 분석할게요!";

      if (existingMedicineIndex !== -1) {
        const updatedMedicines = [...prevMedicines];
        updatedMedicines[existingMedicineIndex].nameList.push({
          name,
          description: description,
        });
        return updatedMedicines;
      } else {
        const newMedicine = {
          title,
          efficacy,
          ko,
          name: effName,
          nameList: [{ name, description }],
        };
        const updatedMedicines = [...prevMedicines];
        const insertIndex = updatedMedicines.length - 1;
        updatedMedicines.splice(insertIndex, 0, newMedicine);
        return updatedMedicines;
      }
    });
    stateHandler("add", count);
  };

  const setList = [
    {
      efficacy: "painkiller",
      title: "개의 진통제를 찾았어요!",
      nameList: [],
      ko: "아픔을 억제해요.",
      name: "진통제",
    },
    {
      efficacy: "fever",
      title: "개의 해열제를 찾았어요!",
      nameList: [],
      ko: "열을 낮춰줘요.",
      name: "해열제",
    },
    {
      efficacy: "biotics",
      title: "개의 항생제를 찾았어요!",
      nameList: [],
      ko: "병균을 제거해요.",
      name: "항생제",
    },
    {
      efficacy: "inflammatory",
      title: "개의 소염제를 찾았어요!",
      nameList: [],
      ko: "염증을 제거해요",
      name: "소염제",
    },
    {
      efficacy: "asthmatic",
      title: "개의 천식 치료제를 찾았어요!",
      nameList: [],
      ko: "천식을 치료해요.",
      name: "천식 치료제",
    },
    {
      efficacy: "hypertensive",
      title: "개의 고혈압 치료제를 찾았어요!",
      nameList: [],
      ko: "고혈압을 관리해요.",
      name: "고혈압 치료제",
    },
    {
      efficacy: "diabetic",
      title: "개의 당뇨 치료제를 찾았어요!",
      nameList: [],
      ko: "당뇨를 조절해요.",
      name: "당뇨 치료제",
    },
    {
      efficacy: "histamine",
      title: "개의 알레르기 치료제를 찾았어요!",
      nameList: [],
      ko: "알레르기를 치료해요.",
      name: "알레르기 치료제",
    },
    {
      efficacy: "depressant",
      title: "개의 항우울제를 찾았어요!",
      nameList: [],
      ko: "정신건강을 개선해요.",
      name: "항우울제",
    },
    {
      efficacy: "antacids",
      title: "개의 위산제를 찾았어요!",
      nameList: [],
      ko: "위 문제를 해결해요.",
      name: "위산제",
    },
    {
      efficacy: "convulsant",
      title: "개의 항경련제를 찾았어요!",
      nameList: [],
      ko: "경련을 조절해요.",
      name: "항경련제",
    },
    {
      efficacy: "medicine",
      title: "개의 미분류 의약품이 있어요.",
      nameList: [],
      ko: "전문의약품이에요.",
      name: "미분류 의약품",
    },
    {
      efficacy: "add",
      title: "의약품 직접 저장하기",
      ko: "의약품 정보를 입력해주세요.",
    },
  ];

  const processMedicineData = (data1, data2) => {
    const updatedData1 = data1.map((item) => {
      if (item.efficacy === "add") return item;
      return { ...item, nameList: [] };
    });

    data2.forEach((med) => {
      const match = updatedData1.find((item) => item.name === med.efficacy);
      const medicineInfo = {
        name: med.itemName,
        description: `${med.entpName}에서 제조한 ${med.chart} ${med.etcOtcName}으로 ${med.effect} 역할을 합니다.`,
      };

      if (match) {
        match.nameList.push(medicineInfo);
      } else {
        const uncategorized = updatedData1.find(
          (item) => item.name === "미분류 의약품"
        );
        uncategorized.nameList.push(medicineInfo);
      }
    });

    const filteredData1 = updatedData1.filter(
      (item) =>
        (item.nameList && item.nameList.length > 0) || item.efficacy === "add"
    );

    return filteredData1;
  };

  React.useEffect(() => {
    if (medicineList && medicineList.length > 0) {
      setMedicines(processMedicineData(setList, medicineList));
    }
  }, [medicineList]);

  const scrollRef = React.useRef(null);

  return (
    <S.MedicineContainer ref={scrollRef}>
      <S.BlinkingContainer>
        <S.TooltipBox state={state}>click!</S.TooltipBox>
      </S.BlinkingContainer>
      {medicines.map((medicine, index) => (
        <M.Medicines
          key={index}
          medicine={medicine}
          handler={stateHandler}
          remove={handleDelete}
          state={state}
          count={index}
          onAddMedicine={handleAddMedicine}
        />
      ))}
    </S.MedicineContainer>
  );
}
