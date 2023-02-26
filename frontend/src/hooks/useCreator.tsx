import useAuth from "./useAuth";

const useCreator = (creator: string) => {;
        return creator === useAuth()?.auth?._id;
}

export default useCreator;