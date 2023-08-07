import { ImagePickerResponse } from 'react-native-image-picker';
import { IUser } from '~/modules/auth/types/user';
import { IAgenda } from '~/modules/schedule/types/agendas';

export interface IUploadAvatarRequest<T> {
  (data: {
    imagePickerData: ImagePickerResponse;
    id?: IAgenda['id'] | IUser['id'];
  }): Promise<T>;
}
