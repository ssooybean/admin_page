import AudioList from "@/shared/AudioList";
import AudioUploader from "@/shared/audioUpdater";

const MoneySubliminalPage = () => {
  return (
    <>
      <AudioUploader
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH + import.meta.env.VITE_MONEY_PATH
        }
      />
      <AudioList
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH + import.meta.env.VITE_MONEY_PATH
        }
      />
    </>
  );
};

export default MoneySubliminalPage;
