import { useMemo, useRef } from "react";

import { Level } from "src/components/level";
import { Node } from "src/components/node";
import {
  EdgeList,
  NodeList,
  NodeProperties,
  NodeRefs,
  TreeStyling,
} from "src/common/types";
import { TreeContext, TreeContextInterface } from "src/context/tree-context";
import { useTree } from "src/hooks/use-tree";

interface TreeProps<Data> {
  nodeList: NodeList<Data>;
  edgeList: EdgeList;
  rootNodeId: string;
  node: (data: Data, properties: NodeProperties) => JSX.Element;
  styling?: TreeStyling;
}

function Tree<Data>({
  nodeList,
  edgeList,
  rootNodeId,
  node,
  styling,
}: TreeProps<Data>): JSX.Element {
  const {
    openNodes,
    rootNode,
    getChildNodes,
    hasChildren,
    isNodeOpen,
    onNodeClicked,
  } = useTree(nodeList, edgeList, rootNodeId);

  const parentNodeRefs = useRef<NodeRefs>({});
  const treeContextValue = useMemo(
    (): TreeContextInterface<Data> => ({
      styling: styling ?? {
        edgeColor: "black",
        edgeThickness: 2,
        nodeHorizontalGap: 12,
        nodeVerticalGap: 28,
      },
      getChildNodes,
      hasChildren,
      isNodeOpen,
    }),
    [styling, getChildNodes, hasChildren, isNodeOpen]
  );

  return (
    <TreeContext.Provider value={treeContextValue}>
      <div css={{ display: "flex", flexDirection: "column" }}>
        <Node<Data>
          key={rootNode.id}
          nodeComponent={node}
          nodeData={rootNode}
          nodeProperties={{
            hasChildren: hasChildren(rootNode.id),
            isExpanded: isNodeOpen(rootNode.id),
            isRootNode: true,
          }}
          onClick={() => onNodeClicked(rootNode.id, 0)}
          ref={(element) => {
            parentNodeRefs.current[rootNode.id] = element;
          }}
        />
        {openNodes.map((openNodeId, level) => (
          <Level<Data>
            key={`level_${openNodeId}`}
            nodeComponent={node}
            nodes={getChildNodes(openNodeId)}
            onNodeClicked={(nodeId, nodeRef) => {
              parentNodeRefs.current[nodeId] = nodeRef;
              onNodeClicked(nodeId, level + 1);
            }}
            parentNodeElement={parentNodeRefs.current[openNodeId]}
          />
        ))}
      </div>
    </TreeContext.Provider>
  );
}

export { Tree };
export type { TreeProps };
