import axios from "axios";
import React, { useEffect, useState } from "react";

const CmsComponent = () => {
  const [directories, setDirectories] = useState([]);
  const [directory, setDirectory] = useState("root");
  const dropDown = [
    ["blogs", "tutorial", "one", "nested"],
    ["posts", "insta", "feed", "sub"],
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4020/directories")
      .then((res) => {
        console.log(res.data);
        setDirectories(res.data);
      })
      .catch((err) => console.log("Bad request"));
  }, []);
  const changeHandler = (event) => {
    setDirectory(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    axios.post("http://localhost:4020/files", data);
  };
  return (
    <>
      <h2>HUGO CMS</h2>
      <form onSubmit={submitHandler}>
        <label>
          <b>Choose Directory : </b>
        </label>
        <select name="directory" onChange={changeHandler}>
          {directories ? (
            directories.map((file, index) => (
              <option key={index} value={file}>
                {file}
              </option>
            ))
          ) : (
            <option value="No Directory">No Directory</option>
          )}
        </select>
        <br></br>
        <br></br>
        <label>
          <b>Select Files : </b>
        </label>
        <input type="file" name="files" multiple></input>
        <br></br>
        <br></br>
        <button type="submit">Upload</button>
      </form>
      <select>{dropDown && dropDown.map(menu => {
        console.log(typeof menu)
      })}</select>
    </>
  );
};

export default CmsComponent;
