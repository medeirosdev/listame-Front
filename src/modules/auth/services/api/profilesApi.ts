import { Platform } from 'react-native';
import { api } from '~/app/services/api/api';

import { IUser } from '~/modules/auth/types/user';
import { IUploadAvatarRequest } from '~/modules/profile/types/upload';

const BASE_URL = '/profiles';

export type UserProfilesApiUpdateParams = Partial<{
  name: string;
  email: string;
  login: string;
  bio: string;
  old_password: string;
  password: string;
}>;

const getUserProfiles = async () => {
  const endpoint = BASE_URL.concat('/');
  const { data } = await api.get<IUser>(endpoint);
  return data;
};

const update = async (params: UserProfilesApiUpdateParams): Promise<IUser> => {
  const endpoint = BASE_URL.concat('/');
  const { data } = await api.put(endpoint, params);
  return data;
};

const uploadAvatar: IUploadAvatarRequest<IUser> = async ({
  imagePickerData,
}) => {
  const endpoint = BASE_URL.concat('/avatar');
  const formData = new FormData();

  const asset = imagePickerData?.assets?.[0];

  console.info({ os: Platform.OS, asset });
  formData.append('avatar', {
    uri: asset?.uri,
    name: asset?.fileName,
    type: asset?.type,
  });
  formData.append('MimeType', asset?.type);

  try {
    const { data } = await api.patch(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteAvatar = async (): Promise<IUser> => {
  const endpoint = BASE_URL.concat('/avatar');
  const { data } = await api.delete(endpoint);
  return data;
};

export const profilesApi = {
  uploadAvatar,
  getUserProfiles,
  update,
  deleteAvatar,
};
