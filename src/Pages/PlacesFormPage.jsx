import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav.jsx";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [opensAt, setOpensAt] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setOpensAt(data.opensAt);
      setClosesAt(data.closesAt);
      setDescription(data.description);
    });
  }, [id]);

  async function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  async function savePlace(ev) {
    ev.preventDefault();
    if (id) {
      await axios.put("/places", {
        id,
        title,
        address,
        addedPhotos,
        opensAt,
        closesAt,
        description,
      });
    } else {
      await axios.post("/places", {
        title,
        address,
        addedPhotos,
        opensAt,
        closesAt,
        description,
      });
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  async function removePhoto(filename) {
    setAddedPhotos([...addedPhotos.filter((photo) => photo != filename)]);
    // await axios.put('/places', {filename})
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className="text-xl mt-4">Title</h2>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="title"
        />
        <h2 className="text-xl mt-4">Address</h2>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          type="text"
          placeholder="address"
        />
        <h2 className="text-xl mt-4">Photos</h2>
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="h-64 flex relative" key={link}>
                <img
                  className="rounded-2xl w-full object-cover"
                  src={"http://localhost:3000/uploads/" + link}
                  alt=""
                />
                <div className="absolute bottom-2 right-2 text-white bg-gray-900 rounded-full p-1 bg-opacity-20">
                  <button onClick={() => removePhoto(link)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          <label className="h-64 cursor-pointer items-center border bg-transparent rounded-2xl p-8 max-w-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
          </label>
        </div>
        <h2 className="text-xl mt-6 mb-1">Working Hours</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <h3>Open at</h3>
            <input
              value={opensAt}
              onChange={(event) => setOpensAt(event.target.value)}
              type="text"
              className="border rounded-xl"
            />
          </div>
          <div>
            <h3>Close at</h3>
            <input
              value={closesAt}
              onChange={(event) => setClosesAt(event.target.value)}
              type="text"
              className="border rounded-xl"
            />
          </div>
        </div>
        <div className="text-xl mt-4">
          <h2>Description</h2>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="border"
          ></textarea>
        </div>
        <button className="my-4">Save</button>
      </form>
    </div>
  );
}
