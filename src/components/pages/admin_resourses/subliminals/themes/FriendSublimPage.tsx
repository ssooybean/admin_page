import AudioList from "@/shared/AudioList";
import AudioUploader from "@/shared/audioUpdater";

const FriendSublimPage = () => {
  console.log("sdsd");
  return (
    <>
      <AudioUploader
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH +
          import.meta.env.VITE_FRIEND_PATH
        }
      />
      <AudioList
        nameLocalFolder={
          import.meta.env.VITE_SUBLIMINAL_PATH +
          import.meta.env.VITE_FRIEND_PATH
        }
      />
    </>
  );
};

export default FriendSublimPage;
