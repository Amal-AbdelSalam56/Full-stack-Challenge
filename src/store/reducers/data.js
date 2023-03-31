const INITIAL_STATE = {
  data: [],
};

export function dataReducer(State = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...State, data: action.payload };

    default:
      return { ...State };
  }
}
