import { CircularProgress } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { ref, StorageReference, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setSubGen } from "@/redux/slices/subliminalGeneralSlice";
import { getAudioSub } from "@/features/getAudioSub";
import { RootState } from "@/redux/store";

interface AudioUploaderProps {
  nameLocalFolder: string;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ nameLocalFolder }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const audios = useSelector(
    (state: RootState) => state.subliminalGeneral.audioUrls
  );

  const dispatch = useDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const totalSize = Array.from(files).reduce(
        (accumulator, file) => accumulator + file.size,
        0
      );
      if (totalSize > 1024 * 1024 * 100) {
        setErrorMessage("Общий размер файлов превышает 100MB");
      } else {
        setSelectedFiles(Array.from(files));
        setErrorMessage("");
      }
    }
  };

  const handleUpload = async () => {
    setLoading(true);

    if (selectedFiles.length > 0) {
      const uploadPromises = selectedFiles.map((file) => {
        const filePath =
          nameLocalFolder + file.name.slice(0, file.name.lastIndexOf("."));
        const fileRef: StorageReference = ref(storage, filePath);
        return uploadBytes(fileRef, file);
      });

      Promise.all(uploadPromises)
        .then(async (snapshots) => {
          console.log("Все файлы успешно загружены", snapshots);
          setSelectedFiles([]);
          const audios = await getAudioSub({ nameLocalFolder });
          dispatch(setSubGen(audios));
        })
        .catch((error) => {
          console.error("Ошибка загрузки файлов:", error);
          setErrorMessage("Ошибка загрузки файлов");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrorMessage("Выберите файлы для загрузки.");
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">
      {audios.length < 10 ? (
        <label className="w-fit">
          <input
            className="hidden w-fit"
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFileChange}
          />
          <div className="flex items-center transition-all cursor-pointer w-fit">
            <span className="text-[18px] text-blue-600 hover:text-blue-400 transition-all ">
              Добавить файлы
            </span>
            <div className="w-8 h-auto">
              <svg
                data-name="Livello 1"
                id="Livello_1"
                viewBox="0 0 128 128"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="rgb(37 99 235)"
                  d="M90,61H67V38a3,3,0,0,0-6,0V61H38a3,3,0,0,0,0,6H61V90a3,3,0,0,0,6,0V67H90a3,3,0,0,0,0-6Z"
                />
              </svg>
            </div>
          </div>
        </label>
      ) : (
        <div>
          <p className="text-[16px] text-gray-500 ">
            Максимальное количество файлов, удалите что-то для добавления нового
          </p>
        </div>
      )}

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {loading ? (
        <div className="w-fit mt-10 ml-5">
          <CircularProgress size={"40px"} />
        </div>
      ) : (
        selectedFiles.length > 0 && (
          <div className="mt-4">
            <p className="text-[18px]">
              Выбранные файлы:{" "}
              <span className="text-[16px]">
                {selectedFiles.map((file) => file.name).join(", ")}
              </span>
            </p>
            <button
              onClick={handleUpload}
              disabled={loading}
              className="px-4 py-2 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Загрузить
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default AudioUploader;
