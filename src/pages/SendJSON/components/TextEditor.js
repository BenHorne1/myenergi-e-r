import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setTextEditorValue } from "../../../redux/action";
import SendDropdown from "./DeviceSelectDropDown";

const TextEditor = () => {
  const dispatch = useDispatch();
  
  const textEditorValue = useSelector((state) => state.textEditorValue);
  const textEditorDeviceSelected = useSelector(
    (state) => state.textEditorDeviceSelected
  );
  const deviceList = useSelector((state) => state.deviceList)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      dispatch(setTextEditorValue(fileContent));
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const Send = () => {
    ipcRenderer.send("UDP:SENDJSON", {
      id: textEditorDeviceSelected.id,
      port: deviceList[textEditorDeviceSelected.id-1].port ,
      address: deviceList[textEditorDeviceSelected.id-1].IPAddress,
      msg: textEditorValue,
    })

  }

  return (
    <div>
      <input className="ml-2" type="file" onChange={handleFileChange} />  
      <br/>
      <textarea
        className="bg-zinc-800 text-white ml-2 my-2 rounded-md px-2"
        type="text"
        value={textEditorValue}
        onChange={(e) => dispatch(setTextEditorValue(e.target.value))}
        rows={10}
        cols={100}
        id="textarea"
      />

      <div className="ml-2">
        <SendDropdown />

        {/* <select className="ml-2">
        <option value="1">1</option>
      </select> */}

        <button onClick={Send} className=" ml-2 bg-green-400 px-3 py-2 rounded-md text-sm font-medium no-underline text-black hover:bg-green-600 hover:text-white shadow-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
