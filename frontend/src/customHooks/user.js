import { useSelector } from 'react-redux';

export function useUserInfo() {
    const user = useSelector(state => state.auth.user);
    return user;
}