import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ setFieldValue }) => {
  const quillRef = useRef(null);
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (quillRef.current) {
      const quillInstance = quillRef.current.getEditor();

      if (quillInstance) {
        quillInstance.clipboard.dangerouslyPasteHTML(
          "<h4>Design description of your choice</h4>"
        );

        quillInstance.getModule("toolbar").addHandler("image", () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.addEventListener("change", async () => {
            const file = input.files[0];
            const range = quillInstance.getSelection(true);

            if (file && range) {
              try {
                const imageDataUrl = await readImageAsDataURL(file);

                quillInstance.clipboard.dangerouslyPasteHTML(
                  range.index,
                  `<img src="${imageDataUrl}" />`
                );
              } catch (error) {
                console.error("Error inserting image:", error);
              }
            }
          });
        });

        setQuill(quillInstance);
      }
    }
  }, []);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log("html", quill.root.innerHTML);
        setFieldValue("description", quill.root.innerHTML);
      });
    }
  }, [quill]);

  const readImageAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        modules={{
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["blockquote", "code-block"],
            ],
          },
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    </div>
  );
};

export default Editor;
