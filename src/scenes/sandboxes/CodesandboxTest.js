import { getParameters } from "codesandbox/lib/api/define";
import {
  appJsContent,
  chatGPTFileContent,
  indexCssContent,
  indexJsContent,
  packageJsonContent,
  webVitalsContent,
} from "../exportFileContent/testExports";
import { Resizable, ResizableBox } from "react-resizable";
import { Box } from "@mui/material";

export default function CodesandboxTest() {
  const parameters = getParameters({
    files: {
      "index.js": {
        content: indexJsContent,
      },
      "index.css": {
        content: indexCssContent,
      },
      "App.js": {
        content: appJsContent,
      },
      "ChatGPT.js": {
        content: chatGPTFileContent,
      },
      "reportWebVitals.js": {
        content: webVitalsContent,
      },
      "package.json": {
        content: packageJsonContent,
      },
    },
  });

  const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;

  // return (document.body.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);

  return (
    <div>
      <Resizable
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "solid 1px #ddd",
          background: "#f0f0f0",
        }}
        defaultSize={{
          width: 200,
          height: 200,
        }}>
        <Box>
          <iframe
            src={url}
            title="CodeSandbox Embed"
            alt={"A CodeSandbox Embed Frame"}
            style={{
              width: "100%",
              height: "1000px",
              border: "0",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          />
        </Box>
      </Resizable>
    </div>
  );
}
