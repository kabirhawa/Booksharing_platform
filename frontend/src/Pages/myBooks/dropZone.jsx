import React from "react";

import { Grid, Card, CardContent, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
const MyDropZone = ({ setFieldValue, images }) => {
  const onDrop = async (acceptedFiles) => {
    const newImages = await Promise.all(
      acceptedFiles.map(async (file) => ({
        file,
        isCover: false,
        base64: await convertToBase64(file),
      }))
    );
    setFieldValue("images", [...images, ...newImages]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setFieldValue("images", updatedImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "images/*",
    multiple: true,
    onDrop,
  });

  return (
    <Box sx={{ heigth: "100%" }}>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <Grid container spacing={2}>
        {images &&
          images.map((image, index) => {
            return (
              <Grid item key={index}>
                <Card sx={{ width: 150, height: "100%" }}>
                  <img
                    src={image?.base64}
                    alt={`Preview ${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <CardContent>
                    <IconButton size="small" onClick={() => removeImage(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default MyDropZone;
