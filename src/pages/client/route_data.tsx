import Client from ".";
export const clientRoutes = [
  { path: "client", element: <Client /> },
  { path: "client/list", element: <Client /> },
  { path: "client/view/:id", element: <Client /> },
];
