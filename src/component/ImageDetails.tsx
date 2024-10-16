type ImageDetailsProp = {
  fileName: string;
  fileSize: number;
};

const ImageDetails = ({ fileName, fileSize }: ImageDetailsProp) => {
  return (
    <div>
      <h2>Uploaded File Details:</h2>
      <p>Name: {fileName}</p>
      <p>Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
    </div>
  );
};

export default ImageDetails;
