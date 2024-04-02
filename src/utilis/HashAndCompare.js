import bcrypt from "bcryptjs";
 //hashing password
export const hashPassword = ({ plaintext, salt = process.env.SALT_ROUND }) => {
  const hashedPassword = bcrypt.hashSync(plaintext, parseInt(salt));
  return hashedPassword;
};
//compare 
export const compareHashed = ({ plaintext, hashedValue }) => {
  const match = bcrypt.compareSync(plaintext, hashedValue);
  return match;
};
