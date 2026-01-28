import JSEncrypt from 'jsencrypt';

export function encryptPasswordUtil(password: string): string {
  const key = `-----BEGIN PUBLIC KEY-----\n${import.meta.env.VITE_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  const enc = new JSEncrypt();
  enc.setPublicKey(key);
  const encrypted = enc.encrypt(password);

  if (!encrypted) throw new Error('Gagal enkripsi password');
  
  return encrypted;
}
