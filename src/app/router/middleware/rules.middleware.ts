import { verifyAuthToken } from '@/service-data/be-auth/services/verify.service-data';

export const middleware = {
    isPermitted(toPath: string): boolean {
        return true;
    },
    async verifyToken(): Promise<boolean> {
        return await verifyAuthToken();
    }
};