import { useContext } from "react";

import { TreeContext, TreeContextInterface } from "src/context/tree-context";

function useTreeContext<Data>(): TreeContextInterface<Data> {
  const data = useContext(TreeContext) as TreeContextInterface<Data>;
  return data;
}

export { useTreeContext };
