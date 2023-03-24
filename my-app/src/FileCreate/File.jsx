import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineTrash } from "react-icons/hi";

export default function File({ setSelectedFile, setAllFile, allFile }) {
  const [plus, setPlus] = useState(false);
  const [fileName, setFile] = useState("");

  const addFile = () => {
    let newFile = {
      id: uuidv4(),
      fileName: fileName,
      text: "",
    };
    setAllFile([...allFile, newFile]);
    setPlus(!plus);
    fetch(`http://localhost:4000/file-create`, {
      method: "POST",
      body: JSON.stringify(newFile),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setSelectedFile(json));
  };

  const deleteFile = (id) => {
    fetch(`http://localhost:4000/file-delete/${id}`, {
      method: "DELETE",
    });
    setAllFile(
      allFile.filter((file) => {
        return file.id !== id;
      })
    );
  };

  return (
    <div>
      <div className="FileFlex">
        <div className="FileCreateName">FILECREATE</div>
        <div className="FilePlus" onClick={() => setPlus(!plus)}>
          {" "}
        </div>
      </div>
      <div>
        {plus &&  (
          <div className="PlusFlex">
            <div className="PlusDiv">
              <input type="text" onChange={(e) => setFile(e.target.value)} />
            </div>
            <div className="PlusDiv">
              <button onClick={addFile}>save</button>
            </div>
          </div>
        ) }
      </div>
      <div>
        {allFile &&
          allFile.map((newFile) => {
            return (
              <div key={newFile.id} className="FileText">
                <div onClick={() => setSelectedFile(newFile)}>
                  {newFile.fileName}
                </div>
                  {" "}
                  <HiOutlineTrash onClick={() => deleteFile(newFile.id)} className="FileTrash"/>{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
}
