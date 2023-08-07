import { atom } from 'jotai';
import { FormFieldType } from '~/modules/auth/hooks/useSignUpFormInputs';

type SignUpStepValuesType = Partial<FormFieldType>;

const signUpData = atom<SignUpStepValuesType>({
  name: '',
  login: '',
  email: '',
  password: '',
  confirmPassword: '',
});

export const signUpStepValues = atom(
  (get) => get(signUpData),
  (get, set, update: SignUpStepValuesType) => {
    const prev = get(signUpData);
    set(signUpData, { ...prev, ...update });
  },
);
