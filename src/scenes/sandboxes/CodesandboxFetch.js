// import React, { useState, useEffect } from "react";
// import { Grid } from "@mui/material";
// import {
//   appJsContent,
//   indexCssContent,
//   indexJsContent,
//   packageJsonContent,
//   webVitalsContent,
// } from "../exportFileContent/testExports";

// const CodeSandboxFetch = () => {
//   const [sandboxData, setSandboxData] = useState(null);

//   const fetchSandbox = async ({ appJsWork }) => {
//     try {
//       const response = await fetch(
//         "https://codesandbox.io/api/v1/sandboxes/define?json=1",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//           body: JSON.stringify({
//             files: {
//               "index.js": { content: indexJsContent },
//               "index.css": { content: indexCssContent },
//               "App.js": { content: appJsWork },
//               "reportWebVitals.js": { content: webVitalsContent },
//               "package.json": { content: packageJsonContent },
//             },
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch: ${response.status} ${response.statusText}`
//         );
//       }

//       const data = await response.json();
//       setSandboxData(data);
//     } catch (error) {
//       console.error("Error fetching sandbox:", error);
//       // Handle errors gracefully
//     }
//   };

//   useEffect(() => {
//     fetchSandbox({ appJsWork: appJsContent });
//   }, []); // Ensure it runs only once when the component mounts

//   return (
//     <Grid container>
//       <Grid item xs={12}>
//         {sandboxData ? (
//           <pre>{JSON.stringify(sandboxData, null, 2)}</pre>
//         ) : (
//           <p>Loading sandbox data...</p>
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default CodeSandboxFetch;
