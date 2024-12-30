import { useHandleLogout } from "@/hooks/use-logout";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Logout() {
  const { mutateAsync: handleLogout, isPending: loggingOut } =
    useHandleLogout();

  const logout = () => {
    handleLogout();
  };

  if (loggingOut) {
    return (
      <Button disabled className="w-full">
        <ReloadIcon className="mr-2 animate-spin w-4 h-4 flex justify-center items-center" />
        Please wait
      </Button>
    );
  } else {
    return <Button onClick={logout}>Logout</Button>;
  }
}
