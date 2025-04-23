import { apiClient } from './axios';

export const uploadImage = async (imageFile: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const res = await apiClient.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }
    return res.data.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
