import { useNavigation } from "../providers/theme/navigation/NavigationContext";

const Navbar = () => {
  const { currentPage, navigate } = useNavigation();
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md">
      <ul className="flex space-x-6">
        <li>
          <button
            className={`px-4 py-2 rounded ${
              currentPage === "/" ? "bg-blue-200 underline" : ""
            }`}
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={`px-4 py-2 rounded ${
              currentPage === "/wallet" ? "bg-blue-200 underline" : ""
            }`}
            onClick={() => navigate("/wallet")}
          >
            Wallet
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
