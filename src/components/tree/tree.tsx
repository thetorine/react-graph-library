import { useEffect, useMemo, useRef } from "react";

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
import { useForceRender } from "src/hooks/use-force-render";
import { useTree } from "src/hooks/use-tree";

interface TreeProps<Data> {
  defaultExpandedNodes?: string[];
  edgeList: EdgeList;
  nodeList: NodeList<Data>;
  node: (data: Data, properties: NodeProperties) => JSX.Element;
  rootNodeId: string;
  styling?: TreeStyling;
}

function Tree<Data>({
  defaultExpandedNodes = [],
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
  } = useTree(nodeList, edgeList, rootNodeId, defaultExpandedNodes);
  const forceRender = useForceRender();

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

  useEffect(() => {
    if (defaultExpandedNodes.length > 0) {
      forceRender();
    }
  }, [defaultExpandedNodes]);

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
            onNodeClicked={(nodeId) => {
              onNodeClicked(nodeId, level + 1);
            }}
            onNodeRendered={(nodeId, nodeRef) => {
              parentNodeRefs.current[nodeId] = nodeRef;
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
