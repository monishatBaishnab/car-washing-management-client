import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { ToastWrapper } from "keep-react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import CWSRoutes from "./routes/CWSRoutes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastWrapper
                    toastOptions={{
                        classNames: {
                            toast: "dark:bg-metal-900 border dark:border-metal-800 border-white bg-white",
                            title: "text-metal-900 dark:text-white",
                            description: "dark:text-metal-300 text-metal-600",
                            actionButton: "dark:bg-metal-800 bg-metal-900 text-white",
                            cancelButton: "dark:bg-metal-800 bg-metal-900 text-white",
                            closeButton: "dark:bg-metal-800 bg-metal-900 text-white",
                            error: "text-error-500",
                            success: "text-success-500",
                            warning: "text-warning-500",
                            info: "text-primary-500",
                        },
                    }}
                />
                <CWSRoutes />
            </PersistGate>
        </Provider>
    </StrictMode>
);
