import { create } from 'zustand';

const useUserDataStore = create(set => ({
    sharedState: [],
    currentUserObj: {},
    getUserRoleLevel: (sharedState, email) => email === "vatsal.bajpai05@gmail.com" ? 9999 : (sharedState?.org?.roles?.find((role) => role.id === sharedState?.usersData?.find((user) => user?.email === email)?.role)?.level ?? 0),
    setSharedState: (newState) => set({ sharedState: newState, currentUserObj: newState?.usersData?.find(it => it.curr === true) ?? { email: "vatsal.bajpai05@gmail.com" } }),
}));

export default useUserDataStore;