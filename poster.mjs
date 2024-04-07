// post to like repos?

const poster = await axios.post(url, {
    method: 'POST',
    headers: 'some headers'
});
 poster.then((data) => {

 })
 .catch((error) =>
    console.log(error)
)

//export async function favourite(imgId) {
//     const isFavorite = await axios(`/favourites?image_id=${imgId}`);

//     if (isFavorite.data[0]) {
//       await axios.delete(`/favourites/${isFavorite.data[0].id}`);
//     } else {
//       await axios.post("/favourites", {
//         image_id: imgId,
//       });
//     }
//   }