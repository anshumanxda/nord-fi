import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import queryString from "query-string";
import axios from "../../utils/httpClient";

const initialState = {
  data: [],
  requestState: "",
  paging: {
    currentPage: 1,
    totalPage: 1,
  },
  searchedText: "",
  sorting: {
    sortBy: "something",
    permutation: "",
  },
};

export const getPeopleList = createAsyncThunk(
  "people/getPeopleList",
  async (args, { getState }) => {
    try {
      const {
        paging: { currentPage },
        searchedText,
      } = getState().people;

      const params = {
        page: currentPage,
        search: searchedText,
      };

      const result = await axios.request({
        url: `/people?${queryString.stringify(params, {
          skipEmptyString: true,
        })}`,
        method: "get",
      });
      return result?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPaging(state, { payload = 1 }) {
      state.paging.currentPage = payload;
    },
    setSearch(state, { payload = "" }) {
      state.searchedText = payload;
    },
    setSorting(state, { payload = {} }) {
      state.sorting = payload;

      const peopleArr = [...state.data];
      const sortedPeopleArray = peopleArr.sort((a, b) => {
        if (payload.permutation === "desc") {
          return b?.[payload.sortBy]?.toLowerCase() >
            a?.[payload.sortBy]?.toLowerCase()
            ? 1
            : -1;
        } else {
          return a?.[payload.sortBy]?.toLowerCase() >
            b?.[payload.sortBy]?.toLowerCase()
            ? 1
            : -1;
        }
      });
      state.data = [...sortedPeopleArray];
    },
  },
  extraReducers: {
    [getPeopleList.pending]: (state) => {
      state.requestState = "loading";
    },
    [getPeopleList.fulfilled]: (state, { payload = {} }) => {
      state.requestState = "success";
      state.data = payload.results;
      state.paging.totalPage = payload.count;
    },
    [getPeopleList.rejected]: (state) => {
      state.requestState = "error";
    },
  },
});

export const { setPaging, setSearch, setSorting } = peopleSlice.actions;

export default peopleSlice.reducer;
