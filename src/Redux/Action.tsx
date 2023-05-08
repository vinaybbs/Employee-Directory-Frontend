
export const SET_EMAIL = "SET_EMAIL";
export const SET_ROLE = "SET_ROLE";
export const SET_LOCATION='SET_LOCATION'

export interface SetEmailAction {
  type: typeof SET_EMAIL;
  payload: string;
}

export interface SetRoleAction {
  type: typeof SET_ROLE;
  payload: string;
}

export interface SetLocationAction{
  type: typeof SET_LOCATION;
  payload:string;
}


export const setEmail = (email: string): SetEmailAction => ({
  type: SET_EMAIL,
  payload: email,
});

export const setRole = (role: string): SetRoleAction => ({
  type: SET_ROLE,
  payload: role,
});

export const setLocation = (location: string): SetLocationAction => ({
  type: SET_LOCATION,
  payload: location,
});


export type Actions = SetEmailAction | SetRoleAction| SetLocationAction
