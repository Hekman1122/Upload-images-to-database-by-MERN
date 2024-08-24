import { useState, useEffect } from "react";
import axios from "axios";
const ImageSection = () => {
  const [images, setImages] = useState([]);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:3050/api/images");
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <div className="mt-2 py-6 ">
      <div className="w-full grid grid-cols-3 gap-4">
        {images.length > 0 &&
          images.map((image) => (
            <div
              key={image.name}
              className="w-full h-80 bg-neutral-100 rounded-md p-4"
            >
              <img
                src={`data:${image.contentType};base64,${image.data}`}
                alt={image.name}
                className="w-full h-full"
              />
            </div>
          ))}
      </div>
      {/* show images */}

      {images.length === 0 && <p>No images found</p>}
    </div>
  );
};

export default ImageSection;
