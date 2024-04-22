import React, { MouseEventHandler, useEffect, useState } from "react";
import { AudioFile, getAudioSub } from "@/features/getAudioSub";
import { CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSubGen } from "@/redux/slices/subliminalGeneralSlice";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase";

interface AudioListProps {
  nameLocalFolder: string;
}

const AudioList: React.FC<AudioListProps> = ({ nameLocalFolder }) => {
  const [loading, setLoading] = useState(true);
  const [deleteLoad, setDeleteLoad] = useState<string>("");

  const dispatch = useDispatch();

  const audioFiles = useSelector(
    (state: RootState) => state.subliminalGeneral.audioUrls
  );

  const deleteAudio = async ({ filename }: { filename: string }) => {
    const desertRef = ref(storage, nameLocalFolder + filename);
    try {
      await deleteObject(desertRef);
      const audio = await getAudioSub({ nameLocalFolder });
      dispatch(setSubGen(audio));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    const filename = event.currentTarget.dataset.filename;
    if (filename) {
      try {
        setDeleteLoad(filename);
        await deleteAudio({ filename });
      } catch (error) {
        console.error("Ошибка при удалении аудио:", error);
      }
      setDeleteLoad("");
    }
  };

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const audio = await getAudioSub({ nameLocalFolder });
        dispatch(setSubGen(audio));
        setLoading(false); // Устанавливаем loading в false после получения данных
      } catch (error) {
        console.error("Ошибка:", error);
        setLoading(false); // Устанавливаем loading в false в случае ошибки
      }
    };
    fetchAudioFiles();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h2 className="text-[28px] pb-5">
        Список аудиофайлов <span className="text-[14px]">(макс. 10)</span>
      </h2>

      {!loading && (
        <ol className="list-decimal pl-10 grid gap-5">
          {audioFiles.map((file: AudioFile, index) => (
            <li key={index} className="text-[20px]">
              <div className="md:flex items-center gap-5 text-[16px] font-normal">
                <div className="flex items-center justify-between mb-2 md:mb-0">
                  <p className=" w-fit">{file.name}</p>
                  <button
                    disabled={file.name === deleteLoad}
                    className={`block md:hidden px-2 py-2 rounded-full transition-all ${
                      file.name === deleteLoad ? "" : "hover:bg-gray-200"
                    }`}
                    onClick={handleDeleteClick}
                    data-filename={file.name}
                  >
                    {file.name === deleteLoad ? (
                      <CircularProgress size={"20px"} />
                    ) : (
                      <DeleteIcon />
                    )}
                  </button>
                </div>

                <audio controls>
                  <source src={file.url} type="audio/mpeg" />
                  Ваш браузер не поддерживает аудио элемент.
                </audio>
                <button
                  disabled={file.name === deleteLoad}
                  className={`hidden md:block order-[-10] px-2 py-2 rounded-full transition-all ${
                    file.name === deleteLoad ? "" : "hover:bg-gray-200"
                  }`}
                  onClick={handleDeleteClick}
                  data-filename={file.name}
                >
                  {file.name === deleteLoad ? (
                    <CircularProgress size={"20px"} />
                  ) : (
                    <DeleteIcon />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
      {loading && <CircularProgress />}
    </div>
  );
};

export default AudioList;
