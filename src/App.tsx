import { HashRouter, Routes, Route } from "react-router-dom";
import MobileDeviceFrame from "./components/MobileDeviceFrame";
import { SessionProvider } from "./context/SessionContext";
import Home from "./screens/Home";
import CustomerDetails from "./screens/CustomerDetails";
import FrameSelection from "./screens/FrameSelection";
import MeasurementIntro from "./screens/MeasurementIntro";
import CameraMeasurement from "./screens/CameraMeasurement";
import ScanningView from "./screens/ScanningView";
import MeasurementResults from "./screens/MeasurementResults";
import MeasurementValidation from "./screens/MeasurementValidation";
import LensConsultation from "./screens/LensConsultation";
import CoatingSelection from "./screens/CoatingSelection";
import ThicknessEstimator from "./screens/ThicknessEstimator";
import TintPreview from "./screens/TintPreview";
import FinalReview from "./screens/FinalReview";
import ReportPreview from "./screens/ReportPreview";
import ShareReport from "./screens/ShareReport";
import SuccessScreen from "./screens/SuccessScreen";
import RecentMeasurements from "./screens/RecentMeasurements";
import PriceList from "./screens/PriceList";
import NotFound from "./screens/NotFound";

function App() {
  return (
    <SessionProvider>
      <HashRouter>
        <MobileDeviceFrame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomerDetails />} />
            <Route path="/frame-selection" element={<FrameSelection />} />
            <Route path="/measure/intro" element={<MeasurementIntro />} />
            <Route path="/measure/camera" element={<CameraMeasurement />} />
            <Route path="/measure/scanning" element={<ScanningView />} />
            <Route path="/measure/results" element={<MeasurementResults />} />
            <Route path="/measure/validate" element={<MeasurementValidation />} />
            <Route path="/lens" element={<LensConsultation />} />
            <Route path="/coatings" element={<CoatingSelection />} />
            <Route path="/thickness" element={<ThicknessEstimator />} />
            <Route path="/tint" element={<TintPreview />} />
            <Route path="/review" element={<FinalReview />} />
            <Route path="/report" element={<ReportPreview />} />
            <Route path="/share" element={<ShareReport />} />
            <Route path="/success" element={<SuccessScreen />} />
            <Route path="/recent" element={<RecentMeasurements />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MobileDeviceFrame>
      </HashRouter>
    </SessionProvider>
  );
}

export default App;
