import AudioList from "@/shared/AudioList";
import AudioUploader from "@/shared/audioUpdater";
import { useLocation } from "react-router-dom";

const GenSublimPage = () => {
  const location = useLocation();

  const data_path = location.pathname.split("/").filter(Boolean).pop() + "/";
  return (
    <>
      <AudioUploader
        nameLocalFolder={import.meta.env.VITE_SUBLIMINAL_PATH + data_path}
      />
      <AudioList
        nameLocalFolder={import.meta.env.VITE_SUBLIMINAL_PATH + data_path}
      />
    </>
  );
};

export default GenSublimPage;
