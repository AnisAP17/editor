// import logo from './logo.svg';
import "./App.css";
import File from "./FileCreate/File";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/files`)
      .then((response) => response.json())
      .then((json) => setFiles(json));
  }, []);

  const saveText = (value) => {
    setFiles(
      files.map((file) => {
        if (file.id === selectedFile.id) {
          return { ...file, text: value };
        }
        return file;
      })
    );
    setSelectedFile({ ...selectedFile, text: value });
  };

  const onSaveKey = () => {
    fetch(`http://localhost:4000/file-create/${selectedFile.id}`, {
      method: "PUT",
      body: JSON.stringify(selectedFile),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="AppFlex">
      <div className="FileBackground">
        <File
          allFile={files}
          setAllFile={setFiles}
          setSelectedFile={setSelectedFile}
        />
      </div>

      <div className="FileListMargin">
        {/* <div>
          <Tabs >
    <TabList>
      <Tab><div>{selectedFile.fileName}</div></Tab>
    </TabList>
    <TabPanel>
      <div>{selectedFile.fileName}</div>
    <textarea
            disabled={selectedFile.fileName ? false : true}
            onChange={(e) => saveText(e.target.value)}
            type="text"
            value={selectedFile.text}
            onKeyUp={onSaveKey}
          />
    </TabPanel>
  </Tabs></div> */}
        <div>
          <div className="FileName"> FILENAME: {selectedFile.fileName}</div>
          <textarea
            disabled={selectedFile.fileName ? false : true}
            onChange={(e) => saveText(e.target.value)}
            className="FileHeaderBackgroundText"
            type="text"
            value={selectedFile.text}
            onKeyUp={onSaveKey}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
