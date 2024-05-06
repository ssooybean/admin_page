import AudioList from "@/shared/AudioList";
import AudioUploader from "@/shared/audioUpdater";

const WorkSublimPage = () => {
  return (
    <>
      <AudioUploader
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH + import.meta.env.VITE_WORK_PATH
        }
      />
      <AudioList
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH + import.meta.env.VITE_WORK_PATH
        }
      />
    </>
  );
};

export default WorkSublimPage;
