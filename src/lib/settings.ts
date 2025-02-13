export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
    [key: string]: string[];
  };

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/mahasiswa(.*)": ["mahasiswa"],
    "/aslab(.*)": ["aslab"],
    "/list/aslabs": ["admin", "aslab"],
    "/list/mahasiswa": ["admin", "aslab"],
    "/list/daftar_alat": ["admin", "aslab", "mahasiswa"],
    "/list/layanan": ["admin", "aslab"],
    "/list/user": ["admin"],
  };