import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const RecordPage = React.lazy(() => import("./RecordPage"));
const TranscribePage = React.lazy(() => import("./TranscribePage"));

const MainApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/record"
          element={
            <React.Suspense fallback={<>...</>}>
              <RecordPage />
            </React.Suspense>
          }
        />
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <TranscribePage />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainApp;
