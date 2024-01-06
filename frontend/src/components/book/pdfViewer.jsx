import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { themePlugin } from "@react-pdf-viewer/theme";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiurl } from "../../assets/constData";




export default function PDFViewer() {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState(null);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${apiurl}/books/getLocation/${id}`)
      .then((res) => {
        setFileUrl(res.data.fileLocation);
      })
      .catch((err) => {});
  }, [id]);

  const themePluginInstance = themePlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
  const transformToolbarSlot = (slot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
  });

  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
  };

  return (
    <>
      {fileUrl && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
          <div
            ref={pdfContainerRef}
            className="overflow-y-scroll pdf-reader overflow-x-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {(isMouseInside || pdfContainerRef.current?.contains(document.activeElement)) && (
              <div className="toolbar bg-primary_bg p-1.5">
                <Toolbar>{renderDefaultToolbar(transformToolbarSlot)}</Toolbar>
              </div>
            )}
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


