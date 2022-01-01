import { useCallback, useMemo, useState } from "react";

import {
  EdgeList,
  EdgeMapping,
  Node,
  NodeList,
  NodeMapping,
} from "src/common/types";

import { getEdgeMapping, getNodeMapping } from "./use-tree.utils";

interface UseTreeInterface<Data> {
  edgeMapping: EdgeMapping;
  nodeMapping: NodeMapping<Data>;
  openNodes: string[];
  rootNode: Node<Data>;
  getChildNodes: (nodeId: string) => NodeList<Data>;
  hasChildren: (nodeId: string) => boolean;
  isNodeOpen: (nodeId: string) => boolean;
  onNodeClicked: (nodeId: string, level: number) => void;
}

function useTree<Data>(
  nodeList: NodeList<Data>,
  edgeList: EdgeList,
  rootNodeId: string,
  defaultExpandedNodes: string[]
): UseTreeInterface<Data> {
  const [openNodes, setOpenNodes] = useState<string[]>(defaultExpandedNodes);

  const nodeMapping = useMemo(() => getNodeMapping(nodeList), [nodeList]);
  const edgeMapping = useMemo(() => getEdgeMapping(edgeList), [edgeList]);
  const rootNode = useMemo(
    () => nodeMapping[rootNodeId],
    [nodeMapping, rootNodeId]
  );

  const onNodeClicked = useCallback(
    (nodeId: string, level: number): void => {
      const openNodeIndex = openNodes.indexOf(nodeId);
      if (openNodeIndex >= 0) {
        // Node that is already open was clicked
        // Close all child nodes of the one that was clicked
        setOpenNodes(openNodes.slice(0, openNodeIndex));
      } else if (level < openNodes.length) {
        // Opened a node at a level with a node already open
        // Close all nodes below and open the new node
        setOpenNodes([...openNodes.slice(0, level), nodeId]);
      } else {
        // Opened a node at the bottom
        setOpenNodes([...openNodes, nodeId]);
      }
    },
    [openNodes]
  );

  const getChildNodes = useCallback(
    (nodeId: string): NodeList<Data> => {
      if (nodeId in edgeMapping) {
        return edgeMapping[nodeId].map(
          (otherNodeId) => nodeMapping[otherNodeId]
        );
      }
      return [];
    },
    [edgeMapping, nodeMapping]
  );

  const isNodeOpen = useCallback(
    (nodeId: string) => openNodes.includes(nodeId),
    [openNodes]
  );

  const hasChildren = useCallback(
    (nodeId: string) => nodeId in edgeMapping,
    [edgeMapping]
  );

  return {
    edgeMapping,
    nodeMapping,
    openNodes,
    rootNode,
    getChildNodes,
    hasChildren,
    isNodeOpen,
    onNodeClicked,
  };
}

export { useTree };
export type { UseTreeInterface };
