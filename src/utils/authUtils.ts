// utils/authUtils.ts
export const getAccessToken = (): string | null => {
    const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    return match ? match[2] : null;
  };
  
  export const getUserId = (): string | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  };
  