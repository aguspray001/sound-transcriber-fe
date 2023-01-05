export const initialState = {
  data: [],
  isLoading: true,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "SUCCESS_GET_TRANSCRIBE":
      return { ...state, data: action.payload.data, isLoading: false};
    case "FAILED_GET_TRANSCRIBE":
      return { ...state, data: action.payload.data, isLoading: false};
    case "PROCESS_GET_TRANSCRIBE":
      return { ...state, data: action.payload.data, isLoading: true};
    default:
      return { ...initialState };
  }
}
