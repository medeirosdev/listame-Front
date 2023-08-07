import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { isUser, IUser } from '~/modules/auth/types/user';
import { IAgenda, isAgenda } from '~/modules/schedule/types/agendas';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { IUploadAvatarRequest } from '~/modules/profile/types/upload';
import { loadUserProfilesThunk } from '~/modules/auth/state/thunks/userThunks';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';

interface IUseAvatarUploadProps<T> {
  agendaId?: IAgenda['id'];
  uploadAvatarRequest: IUploadAvatarRequest<T>;
  deleteAvatarRequest: (id?: IUser['id'] | IAgenda['id']) => Promise<T>;
}

export const useAvatarUpload = <T extends IUser | IAgenda>({
  uploadAvatarRequest,
  deleteAvatarRequest,
  agendaId,
}: IUseAvatarUploadProps<T>) => {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState<string>('');
  const { mutate: uploadPhoto, isLoading: isAvatarLoading } = useMutation(
    uploadAvatarRequest,
    {
      onSuccess: handleSuccessUploadedPhoto,
    },
  );

  const { mutate: triggerAvatarDeletion, isLoading: isDeleteLoading } =
    useMutation(deleteAvatarRequest, {
      onSuccess: async (entity) => {
        setPhoto(entity?.avatar_url || '');
        await dispatch(loadUserProfilesThunk());
      },
    });

  const choosePhotoOnGalery = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response && !response.errorCode) {
        uploadPhoto({ imagePickerData: response, id: agendaId });
      }
    });
  };

  const takePhotoFromCamera = async () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response) {
        uploadPhoto({ imagePickerData: response, id: agendaId });
      }
    });
  };

  async function handleSuccessUploadedPhoto(entity: T) {
    if (isUser(entity) || isAgenda(entity)) setPhoto(entity?.avatar_url || '');
    await dispatch(loadUserProfilesThunk());
  }

  const deleteAvatar = () => {
    triggerAvatarDeletion(agendaId);
  };

  return {
    photo,
    isAvatarLoading,
    choosePhotoOnGalery,
    takePhotoFromCamera,
    setPhoto,
    deleteAvatar,
    isDeleteLoading,
  };
};
