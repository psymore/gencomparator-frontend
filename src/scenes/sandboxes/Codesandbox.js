import { Grid } from "@mui/material";
import { getParameters } from "codesandbox/lib/api/define";
import {
  indexCssContent,
  indexJsContent,
  packageJsonContent,
  webVitalsContent,
} from "../../exportFileContent/testExports";

export default function Codesandbox({ appJsWork }) {
  const parameters = getParameters({
    files: {
      "index.js": {
        content: indexJsContent,
      },
      "index.css": {
        content: indexCssContent,
      },
      "App.js": {
        content: appJsWork,
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
    <Grid container>
      <Grid item xs={12} sx={{ overflow: "auto", resize: "both" }}>
        {/* <ResizableBox
          draggableOpts={{ grid: [25, 25] }}
          minConstraints={[100, 100]}
          maxConstraints={[300, 300]}> */}
        <iframe
          codemirror
          previewwindow={1}
          fontsize={12}
          src={url}
          title="CodeSandbox Embed"
          alt={"A CodeSandbox Embed Frame"}
          style={{
            minWidth: "60vw",
            minHeight: "80vh",
            border: "0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        />
        {/* </ResizableBox> */}
      </Grid>
    </Grid>
  );
}

// import { getParameters } from "codesandbox/lib/api/define";
// import {
//   indexCssContent,
//   indexJsContent,
//   packageJsonContent,
//   webVitalsContent,
// } from "../exportFileContent/testExports";

// export const openCodesandboxInNewTab = appJsWork => {
//   const parameters = getParameters({
//     files: {
//       "index.js": {
//         content: indexJsContent,
//       },
//       "index.css": {
//         content: indexCssContent,
//       },
//       "App.js": {
//         content: appJsWork,
//       },
//       "reportWebVitals.js": {
//         content: webVitalsContent,
//       },
//       "package.json": {
//         content: packageJsonContent,
//       },
//     },
//   });

//   const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;

//   // Create a new HTML document content with an iframe
//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Codesandbox</title>
//       </head>
//       <body style="margin: 0; padding: 0;">
//         <div style="width: 100%; height: 100vh;">
//           <iframe src="${url}" title="CodeSandbox Embed" style="width: 100%; height: 100%; border: none;"></iframe>
//         </div>
//       </body>
//     </html>
//   `;
//   // Create a Blob object containing the HTML content
//   const blob = new Blob([htmlContent], { type: "text/html" });

//   // Create a URL from the Blob object
//   const urlObject = URL.createObjectURL(blob);

//   // Open the URL in a new tab
//   window.open(urlObject, "_blank");
// };
