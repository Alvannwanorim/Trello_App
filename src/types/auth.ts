export interface SignInData {
  email: string;
  password: string;
}
export interface SignUpData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface ApiResponse {
  message: string;
}
