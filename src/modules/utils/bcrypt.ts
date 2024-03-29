import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return await bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
