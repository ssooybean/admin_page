import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AudioFile } from "@/features/getAudioSub";

interface AudioState {
  audioUrls: AudioFile[];
}

const initialState: AudioState = {
  audioUrls: [],
};

export const subliminalGeneralSlice = createSlice({
  name: "subGen",
  initialState,
  reducers: {
    setSubGen: (state, action: PayloadAction<AudioFile[]>) => {
      state.audioUrls = [...action.payload];
    },
    addSubGen: (state, action: PayloadAction<AudioFile>) => {
      state.audioUrls = [...state.audioUrls, action.payload];
    },
  },
});

export const { setSubGen, addSubGen } = subliminalGeneralSlice.actions;

export default subliminalGeneralSlice.reducer;
