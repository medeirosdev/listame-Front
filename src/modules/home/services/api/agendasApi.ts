import { Platform } from 'react-native';
import { api } from '~/app/services/api/api';
import { IUploadAvatarRequest } from '~/modules/profile/types/upload';
import {
  IAgenda,
  ICreateAgendaDTO,
  IUserAgenda,
} from '~/modules/schedule/types/agendas';

const BASE_URL = '/agendas';

export type AgendaFilterParams = IAgenda['id'][];

const list = async (): Promise<IAgenda[]> => {
  const endpoint = BASE_URL.concat('/');
  const { data } = await api.get(endpoint);
  return data;
};

const profileList = async (): Promise<IAgenda[]> => {
  const endpoint = BASE_URL.concat('/profile');
  const { data } = await api.get(endpoint);
  return data;
};

const filter = async (agendasIds: AgendaFilterParams): Promise<IAgenda[]> => {
  const endpoint = BASE_URL.concat('/filter');
  const { data } = await api.post(endpoint, { agendasIds });
  return data;
};

const findById = async (agendaId: IAgenda['id']): Promise<IAgenda> => {
  const endpoint = BASE_URL.concat(`/${agendaId}`);
  const { data } = await api.get(endpoint);
  return data;
};

const follow = async (agendaId: IAgenda['id']): Promise<IUserAgenda> => {
  const endpoint = BASE_URL.concat(`/follow/${agendaId}`);
  const { data } = await api.post(endpoint);
  return data;
};

const unfollow = async (agendaId: IAgenda['id']): Promise<IUserAgenda> => {
  const endpoint = BASE_URL.concat(`/unfollow/${agendaId}`);
  const { data } = await api.delete(endpoint);
  return data;
};

const getFollowers = async (
  agendaId: IAgenda['id'],
): Promise<IUserAgenda[]> => {
  const endpoint = BASE_URL.concat(`/followers/${agendaId}`);
  const { data } = await api.get(endpoint);
  return data;
};

const deleteAgenda = async (id: IAgenda['id']): Promise<void> => {
  const endpoint = BASE_URL.concat('/');
  await api.delete(endpoint, { params: { id } });
};

const uploadAvatar: IUploadAvatarRequest<IAgenda> = async ({
  imagePickerData,
  id,
}) => {
  const endpoint = BASE_URL.concat('/avatar/', id ?? '');
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

const deleteAvatar = async (id?: IAgenda['id']): Promise<IAgenda> => {
  const endpoint = BASE_URL.concat('/avatar/', id ?? '');
  const { data } = await api.delete(endpoint);
  return data;
};

const create = async (agendaData: ICreateAgendaDTO) => {
  const endpoint = BASE_URL.concat('/');

  const { data } = await api.post(endpoint, agendaData);
  return data;
};

export const agendasApi = {
  create,
  list,
  profileList,
  filter,
  findById,
  follow,
  unfollow,
  getFollowers,
  deleteAgenda,
  deleteAvatar,
  uploadAvatar,
};
