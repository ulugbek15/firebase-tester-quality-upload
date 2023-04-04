import { useEffect, useState } from "react";
import { storage } from "./firebase"; // to store images
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [urlImg, setUrlImg] = useState("");
  const [images, setImages] = useState([]);
  const [imgType, setImgType] = useState("");
  const [status, setStatus] = useState("");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url, "url");
        setUrlImg(url);
      });
    });
  };

  useEffect(() => {
    if (urlImg !== "" && imgType !== "") {
      fetch("http://localhost:3000/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: v4(),
          url: urlImg,
          category: imgType,
        }),
      }).then((res) =>
        res.status === 201
          ? setStatus("Image uploaded")
          : setStatus("Image not uploaded")
      );
    }
  }, [urlImg, imgType]);

  useEffect(() => {
    fetch(`http://localhost:3000/images`)
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="App">
      <input
        style={{ marginTop: "120px" }}
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button style={{ marginTop: "140px" }} onClick={uploadImage}>
        Upload image
      </button>
      status: {status}
      <select
        style={{ display: "block", marginTop: "140px" }}
        onChange={(e) => setImgType(e.target.value)}
      >
        <option value="kitchen">Kitchen</option>
        <option value="bathroom">Bathroom</option>
        <option value="fireplace">Fireplace</option>
        <option value="flooring">Flooring</option>
      </select>
      {images.map((elem, index) => {
        return (
          <img
            style={{ marginTop: "120px" }}
            key={index}
            src={elem.url}
            alt=""
          />
        );
      })}
    </div>
  );
}

export default App;
