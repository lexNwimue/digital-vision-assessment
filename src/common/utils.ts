import { compare, hash } from 'bcrypt';

export const hashString = (password: string): Promise<string> => {
  return hash(password, 10);
};

export const compareHash = (
  inputtedString: string,
  hashedString: string,
): Promise<boolean> => {
  return compare(inputtedString, hashedString);
};
