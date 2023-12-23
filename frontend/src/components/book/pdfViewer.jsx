import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { themePlugin } from "@react-pdf-viewer/theme";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";

export default function PDFViewer() {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    axios
      .get(`${apiurl}/books/getLocation/${id}`)
      .then((res) => {
        console.log(res.data.fileLocation);
        setFileUrl(res.data.fileLocation);
      })
      .catch((err) => {});
  }, [id]);

  const themePluginInstance = themePlugin();
  const { SwitchThemeButton } = themePluginInstance;
  const toolbarPluginInstance = toolbarPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
  // const fileUrl = `http://localhost:5000/file-1703320013937.pdf`;
  const transformToolbarSlot = (slot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
  });
  return (
    <>
      {fileUrl && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
          <div
            style={{ height: "100vh", maxWidth: "100%" }}
            className="rpv-core__viewer overflow-y-scroll overflow-x-hidden"
          >
            <div className="absolute top-0 left-96  z-40  bg-primary_bg p-1.5">
              <Toolbar>{renderDefaultToolbar(transformToolbarSlot)}</Toolbar>
            </div>
            <div>
              <Viewer
                theme="auto"
                fileUrl={fileUrl}
                plugins={[
                  themePluginInstance,
                  toolbarPluginInstance,
                  fullScreenPluginInstance,
                ]}
              />
            </div>
          </div>
        </Worker>
      )}
    </>
  );
}
