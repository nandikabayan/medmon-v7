import { verifyAuthToken } from '@/service-data/be-auth/services/verify.service-data';
import { stateManagement } from '../../store/app.store';

const store = stateManagement();

export const middleware = {
    async verifyToken(): Promise<boolean> {
        return await verifyAuthToken();
    },
    isPermitted(toPath: string): boolean {
        return true;
    },
    logout(): void {
        return store.logoutHandler();
    }
};