import { useCurrentMode } from "./darkMode";

export const useCurrentUser = () => {
  return {
    currentUser: null,
  };
};

export default useCurrentMode;
