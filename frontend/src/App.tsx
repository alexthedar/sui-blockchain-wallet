import React from "react";
import { useTheme } from "./providers/theme/ThemeContext";
import ProposalView from "./views/ProposalView";
import Navbar from "./components/Navbar";
// import WalletView from "./views/WalletView";

const App: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="max-w-screen-xl m-auto pt-16">
          <ProposalView />
          {/* <WalletView /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
