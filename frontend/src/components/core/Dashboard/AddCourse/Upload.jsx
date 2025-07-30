import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  );

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
      setValue(name, file, { shouldValidate: true });
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: video
      ? { "video/*": [".mp4"] }
      : { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
    noClick: true,
    multiple: false,
  });

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center rounded-md border-2 border-dotted border-richblack-500 ${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } cursor-pointer w-full min-h-[200px] sm:min-h-[250px]`}
        onClick={open}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex w-full flex-col items-center p-4">
            {video ? (
              <Player
                aspectRatio="16:9"
                playsInline
                fluid={false}
                width={"100%"}
                height={240}
                src={previewSource}
              />
            ) : (
              <img
                src={previewSource}
                alt="Preview"
                className="rounded-md w-full max-h-[300px] object-contain"
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewSource("");
                  setValue(name, null, { shouldValidate: true });
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[240px] text-sm text-richblack-200">
              Drag and drop a {video ? "video" : "image"}, or{" "}
              <span className="font-semibold text-yellow-50">
                click to browse
              </span>
            </p>
            <ul className="mt-4 space-y-1 text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size: 1024x576</li>
              <li>Max file size: 200MB</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-1 text-xs text-pink-200">{label} is required</span>
      )}
    </div>
  );
}
