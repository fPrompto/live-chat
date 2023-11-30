import * as bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const hp = await bcrypt.hash(password, 10);
  return hp;
};

const comparePassword = async (userPassword, dbHashedPassword) => {
  const passwordMatches = await bcrypt.compare(userPassword, dbHashedPassword);

  if (passwordMatches) {
    console.log('valid password! authenticated user');
    return true;
  }

  console.log('invalid password! unauthenticated user');
  return false;
};

export { hashPassword, comparePassword };
