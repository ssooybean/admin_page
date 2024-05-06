import AudioList from "@/shared/AudioList";
import AudioUploader from "@/shared/audioUpdater";

const SuccessSubliminalPage = () => {
  return (
    <>
      <AudioUploader
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH +
          import.meta.env.VITE_SUCCESS_PATH
        }
      />
      <AudioList
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH +
          import.meta.env.VITE_SUCCESS_PATH
        }
      />
    </>
  );
};

export default SuccessSubliminalPage;
