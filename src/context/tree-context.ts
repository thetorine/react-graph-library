import React from "react";

import { NodeList, TreeStyling } from "src/common/types";

interface TreeContextInterface<Data> {
  styling: TreeStyling;
  getChildNodes: (nodeId: string) => NodeList<Data>;
  hasChildren: (nodeId: string) => boolean;
  isNodeOpen: (nodeId: string) => boolean;
}

const TreeContext = React.createContext<TreeContextInterface<any>>({
  styling: {
    edgeColor: "black",
    edgeThickness: 2,
    nodeHorizontalGap: 12,
    nodeVerticalGap: 28,
  },
  getChildNodes: (_nodeId) => [],
  hasChildren: (_nodeId: string) => false,
  isNodeOpen: (_nodeId) => false,
});

export { TreeContext };
export type { TreeContextInterface };
