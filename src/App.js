import { useEffect, useState } from "react";
import { storage } from "./firebase"; // to store images
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [urlImg, setUrlImg] = useState('');
  const [images, setImages] = useState([]);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrlImg(url)
      });
    });
  };

  useEffect(() => {
    if (urlImg === '') return;
    fetch('http://localhost:3000/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            id: v4(),
            url: urlImg,
            category: 'kitechen'
          }
          )
    })
  }, [urlImg])

  useEffect(() => {
    fetch(`http://localhost:3000/images`)
    .then(res => res.json())
    .then(data => setImages(data))
  }, [])

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload image</button>

      {images.map((elem, index) => {
        return <img key={index} src={elem.url} alt="" />;
      })}
    </div>
  );
}

export default App;
