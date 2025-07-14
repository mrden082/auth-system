export interface LoginForm {
    email: string
    password: string
  }
  
  export interface RegisterForm {
    email: string
    name: string
    surname: string
    password: string
    confirmPassword: string
  }
  
  export interface SendCodeForm {
    email: string
  }
  
  export interface ResetForm {
    email: string
    code: string
    password: string
    confirmPassword: string
  }
  
  export interface LoginData {
    email: string
    password: string
  }
  
  export interface RegisterData {
    email: string
    name: string
    surname: string
    password: string
  }