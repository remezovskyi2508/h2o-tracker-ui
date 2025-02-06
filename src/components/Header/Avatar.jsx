export const AvatarIsLogout = className => {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_139_672)">
        <circle cx="14" cy="14" r="13.5" stroke="#2F2F2F" />
        <path
          d="M17.5005 8.25643C17.5005 9.20849 17.1317 10.1216 16.4752 10.7948C15.8187 11.468 14.9284 11.8462 14 11.8462C13.0716 11.8462 12.1813 11.468 11.5248 10.7948C10.8683 10.1216 10.4995 9.20849 10.4995 8.25643C10.4995 7.30437 10.8683 6.3913 11.5248 5.7181C12.1813 5.04489 13.0716 4.66669 14 4.66669C14.9284 4.66669 15.8187 5.04489 16.4752 5.7181C17.1317 6.3913 17.5005 7.30437 17.5005 8.25643ZM7 21.7711C7.03 19.8875 7.78069 18.0915 9.09018 16.7704C10.3997 15.4492 12.163 14.7088 14 14.7088C15.837 14.7088 17.6003 15.4492 18.9098 16.7704C20.2193 18.0915 20.97 19.8875 21 21.7711C18.8039 22.8037 16.4159 23.3367 14 23.3333C11.5021 23.3333 9.13108 22.7743 7 21.7711Z"
          stroke="#2F2F2F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_139_672">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

import { useState, useEffect } from 'react';
import axios from 'axios';

export const AvatarIsLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    };

    fetchUser();
  }, []);
  return (
    <>
      {user ? (
        <div>
          <span>{user.name}</span>
          <img src={user.avatar} alt="User Avatar" width="40" />
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};
