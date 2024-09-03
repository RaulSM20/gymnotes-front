import { Dumbbell, SquareUserRound } from "lucide-react";
import { UserItem } from "./UserItem";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
        <div>
          <UserItem />
        </div>
        <div className="grow">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Menu">
                <CommandItem>
                  <Link to={"/"} className="flex gap-2 hover:font-bold">
                    <Dumbbell />
                    Routines
                  </Link>
                </CommandItem>
                <CommandItem>
                  <Link to={"#"} className="flex gap-2 hover:font-bold">
                    <SquareUserRound />
                    Profile
                  </Link>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div>Settings part</div>
      </div>
    </>
  );
};
