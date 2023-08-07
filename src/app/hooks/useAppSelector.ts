import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '~/app/services/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
