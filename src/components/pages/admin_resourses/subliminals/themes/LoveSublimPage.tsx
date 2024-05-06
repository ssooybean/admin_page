import AudioList from "@/shared/AudioList";
import AudioUploader from "@/shared/audioUpdater";

const LoveSublimPage = () => {
  console.log("sdsd");
  return (
    <>
      <AudioUploader
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH + import.meta.env.VITE_LOVE_PATH
        }
      />
      <AudioList
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH + import.meta.env.VITE_LOVE_PATH
        }
      />
    </>
  );
};

export default LoveSublimPage;
