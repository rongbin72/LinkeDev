/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Login
// ====================================================

export interface Login_login {
  __typename: "Auth";
  token: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_user {
  __typename: "User";
  _id: string;
  name: string;
  avatar: string;
}

export interface CurrentUser {
  user: CurrentUser_user;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "Auth";
  token: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  name: string;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthStatus
// ====================================================

export interface AuthStatus_authStatus {
  __typename: "AuthStatus";
  isAuth: boolean;
  id: string;
  name: string;
  avatar: string;
}

export interface AuthStatus {
  authStatus: AuthStatus_authStatus;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAuthStatus
// ====================================================

export interface UpdateAuthStatus {
  updateAuthStatus: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyProfile
// ====================================================

export interface MyProfile_myProfile_experience {
  __typename: "Experience";
  _id: string;
  company: string;
  title: string;
  from: string;
  to: string | null;
}

export interface MyProfile_myProfile_education {
  __typename: "Education";
  _id: string;
  school: string;
  degree: string;
  from: string;
  to: string | null;
}

export interface MyProfile_myProfile {
  __typename: "Profile";
  experience: MyProfile_myProfile_experience[];
  education: MyProfile_myProfile_education[];
}

export interface MyProfile {
  myProfile: MyProfile_myProfile | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profiles
// ====================================================

export interface Profiles_profiles {
  __typename: "Profile";
  _id: string;
}

export interface Profiles {
  profiles: Profiles_profiles[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteExperience
// ====================================================

export interface DeleteExperience_deleteExperience_experience {
  __typename: "Experience";
  _id: string;
}

export interface DeleteExperience_deleteExperience {
  __typename: "Profile";
  experience: DeleteExperience_deleteExperience_experience[];
}

export interface DeleteExperience {
  deleteExperience: DeleteExperience_deleteExperience;
}

export interface DeleteExperienceVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEducation
// ====================================================

export interface DeleteEducation_deleteEducation_education {
  __typename: "Education";
  _id: string;
}

export interface DeleteEducation_deleteEducation {
  __typename: "Profile";
  education: DeleteEducation_deleteEducation_education[];
}

export interface DeleteEducation {
  deleteEducation: DeleteEducation_deleteEducation;
}

export interface DeleteEducationVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAccount
// ====================================================

export interface DeleteAccount_deleteAccount {
  __typename: "Message";
  msg: string;
}

export interface DeleteAccount {
  deleteAccount: DeleteAccount_deleteAccount;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
