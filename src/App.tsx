import * as React from "react";
import { createRoot } from "react-dom/client";
import { Calculator } from './module/index';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);