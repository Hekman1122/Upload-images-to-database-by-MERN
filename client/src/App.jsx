import ImageSection from "./components/ImageSection";
import UploadForm from "./components/UploadForm";
function App() {
  return (
    <div className="max-w-5xl pt-12 mx-auto">
      <UploadForm />
      <ImageSection />
    </div>
  );
}

export default App;
