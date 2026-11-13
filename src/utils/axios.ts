import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // Authorization:
    //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NGZjOGI1ZjJjMGQ0ZjdlMTcyODRlNjUiLCJ1c2VyVHlwZSI6IlVTMDIwNCIsInN1YiI6ImRldEBtYXVtLmFpIiwiZW1haWwiOiJkZXRAbWF1bS5haSIsIm5hbWUiOiLrp4jsnYzrjbDsnbTthLDtiLRf6rSA66as7J6QIiwic3RhdHVzIjoiVU5TVUJTQ1JJQkVEIiwiZXhwaXJlZERhdGUiOiIiLCJpYXQiOjE3MTI4ODk2NzksImV4cCI6MTcxMjk3NjA3OX0.YobOCsfc1kFzrUz3xr1hOCNbnfaYMVG209rs_I1fdSQ',
  },
});

// 로그인 값 가져와서 axios 세팅 (현재 옮기는거때문에 잠시 주석)
export const setToken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// export const setToken = () => {
//   instance.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NGZjOGI1ZjJjMGQ0ZjdlMTcyODRlNjUiLCJ1c2VyVHlwZSI6IlVTMDIwNCIsInN1YiI6ImRldEBtYXVtLmFpIiwiZW1haWwiOiJkZXRAbWF1bS5haSIsIm5hbWUiOiLrp4jsnYzrjbDsnbTthLDtiLRf6rSA66as7J6QIiwic3RhdHVzIjoiVU5TVUJTQ1JJQkVEIiwiZXhwaXJlZERhdGUiOiIiLCJpYXQiOjE2OTQzMjY5OTEsImV4cCI6MTY5NDQxMzM5MX0.OdtEmWkCMy0Aso2Y6Rb1RCCf0_yInSa3SdPxwsTmsU8`;
// };

export default instance;
