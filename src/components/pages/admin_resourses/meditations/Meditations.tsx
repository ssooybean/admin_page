import AudioList from "@/shared/AudioList";
import AudioUploader from "@/shared/audioUpdater";

const Mediataions = () => {
  return (
    <>
      <AudioUploader nameLocalFolder={import.meta.env.VITE_MEDITATION_PATH} />
      <AudioList nameLocalFolder={import.meta.env.VITE_MEDITATION_PATH} />
    </>
  );
};

export default Mediataions;
