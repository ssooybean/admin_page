import { listAll, getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase";

export interface AudioFile {
  url: string;
  name: string;
}

export const getAudioSub = async ({
  nameLocalFolder,
}: {
  nameLocalFolder: string;
}) => {
  const sabliminalRef = ref(storage, nameLocalFolder);

  try {
    const res = await listAll(sabliminalRef);
    const audioFiles = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(ref(itemRef));
        return { url, name: itemRef.name };
      })
    );
    return audioFiles;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
