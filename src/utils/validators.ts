export const validateEmail = (value: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) || 'Invalid email format';
};

export const validatePassword = (value: string) => {
  return value.length >= 6 || 'Password must be at least 6 characters';
};

export const validateName = (value: string) => {
  return value.length > 0 || 'Name is required';
};

export const validateSurname = (value: string) => {
  return value.length > 0 || 'Surname is required';
};