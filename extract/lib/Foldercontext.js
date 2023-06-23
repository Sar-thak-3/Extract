import { createContext, useContext } from "react";
import {useState} from "react";

export const Foldercontext = createContext();

export function Folderwrapper({children}){
    const [newfolder,setNewfolder] = useState(false);

    return (
        <Foldercontext.Provider value={{newfolder,setNewfolder}}>
            {children}
        </Foldercontext.Provider>
    );
}

export function useFoldercontext(){
    return useContext(Foldercontext);
}