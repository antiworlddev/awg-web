import axios from "axios";

export const fetchArtisteAlbums = async (artisteId: string) => {
  try {
    const albums = await axios.get(
      `/api/get-artiste-albums?artistId=${artisteId}`
    );
    return albums.data;
  } catch (e) {
    console.error(e);
  }
};
