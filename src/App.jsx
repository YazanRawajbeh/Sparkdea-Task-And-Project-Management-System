import { MainLayout } from "./layouts/MainLayout";
import { SparkBoard } from "./boards/SparkBoard";
import { Routes, Route, Navigate } from "react-router";
import { useReducer } from "react";
import { AppStateContext, AppDispatchContext } from "./context/AppContext";
import { appStateReducer } from "./reducers/appReducer";
import { NotificationGenerator } from "./notification/NotificationGenerator";
import { MakePlanModal } from "./Boards/MakePlanModal";
const INITIAL_STATE = {
  notification: {
    notificationStack: [],
  },
};

function App() {
  const [appState, dispatch] = useReducer(appStateReducer, INITIAL_STATE);

  return (
    <AppStateContext value={appState}>
      <AppDispatchContext value={dispatch}>
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
          {appState.notification.notificationStack.map((notification) => (
            <NotificationGenerator
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>

        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/spark" replace />} />
            <Route path="spark" element={<SparkBoard />}>
              <Route path="initiate-plan" element={<MakePlanModal />} />
            </Route>
            <Route path="plan" element={null} />
            <Route
              path="progress"
              element={
                <div className="p-6 text-gray-500 font-medium">
                  Progress Space (Coming soon)
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/spark" replace />} />
          </Route>
        </Routes>
      </AppDispatchContext>
    </AppStateContext>
  );
}

export default App;
