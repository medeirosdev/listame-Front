import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/app/services/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
