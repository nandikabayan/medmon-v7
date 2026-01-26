import JSEncrypt from 'jsencrypt';

export function encryptPassword(password: string) {
  const key = `-----BEGIN PUBLIC KEY-----\n${import.meta.env.VITE_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  const enc = new JSEncrypt();
  enc.setPublicKey(key);
  return enc.encrypt(password);
}
