import { Actions, SET_EMAIL, SET_ROLE, SET_LOCATION} from "./Action";

export interface State {
  email: string;
  role: string;
  location:string;
}

const initialState: State = {
  email: "",
  role: "",
  location: "/",
};

const Reducers = (
  state = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
      case SET_LOCATION:
        return { ...state, location: action.payload };
    default:
      return state;
  }
};

export default Reducers;
