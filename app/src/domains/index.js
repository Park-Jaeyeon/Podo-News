import Auth from "./auth/auth.page";
import FistLogin from "./firstLogin/firstLogin";
import Home from "./home/home";
import Scanner from "./_scanner/_scanner.page";
import MyPage from "./myPage/my.page";
import ProfileEditPage from "./myPage/profile.edit.page";
import Prescription from "./prescription/prescription";
import PrescriptionEditPage from "./prescription/presc.edit.page";
import PrescriptionDetailPage from "./prescription/pill.detail.page";
import PrescriptionAddPage from "./prescription/presc.add.page";
import GuidePage from "./myPage/guide.page";
import TermsPage from "./myPage/term.page";
import PrivacyPage from "./myPage/privacy.page";
import HealthPage from "./health/health.page";
import DiseaseAddPage from "./health/disease.add";
import DiseaseDetailPage from "./health/disease.detail";
import Analyze from "./prescription/components/analyze";
import PatientInfoPage from "./myPage/patientInfo.page";

const Pages = {
  Auth,
  FistLogin,
  Home,
  Scanner,
  HealthPage,
  DiseaseAddPage,
  DiseaseDetailPage,
  MyPage,
  ProfileEditPage,
  GuidePage,
  TermsPage,
  PrivacyPage,
  Prescription,
  PrescriptionEditPage,
  PrescriptionDetailPage,
  PrescriptionAddPage,
  Analyze,
  PatientInfoPage,
};

export default Pages;
