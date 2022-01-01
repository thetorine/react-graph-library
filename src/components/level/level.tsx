import { useLayoutEffect, useRef, useState } from "react";

import { Node } from "src/components/node";
import { NodeList, NodeProperties, NodeRefs } from "src/common/types";
import { useTreeContext } from "src/hooks/use-tree-context";
import { getLineStyling } from "./level.utils";

interface LevelProps<Data> {
  nodeComponent: (data: Data, properties: NodeProperties) => JSX.Element;
  nodes: NodeList<Data>;
  onNodeClicked: (nodeId: string) => void;
  onNodeRendered: (nodeId: string, nodeRef: HTMLDivElement | null) => void;
  parentNodeElement: HTMLDivElement | null;
}

function Level<Data>({
  nodeComponent,
  nodes,
  onNodeClicked,
  onNodeRendered,
  parentNodeElement,
}: LevelProps<Data>): JSX.Element {
  const {
    styling: { edgeColor, edgeThickness, nodeHorizontalGap },
    hasChildren,
    isNodeOpen,
  } = useTreeContext<Data>();
  const [lineStyling, setLineStyling] = useState<React.CSSProperties>({
    backgroundColor: "transparent",
    width: "100%",
    height: edgeThickness,
  });
  const nodeRefs = useRef<NodeRefs>({});

  useLayoutEffect(() => {
    if (nodes.length === 0) {
      return;
    }

    nodes.forEach((node) => onNodeRendered(node.id, nodeRefs.current[node.id]));

    const firstChildElement = nodeRefs.current[nodes[0].id];
    const lastChildElement = nodeRefs.current[nodes[nodes.length - 1].id];
    if (
      parentNodeElement == null ||
      firstChildElement == null ||
      lastChildElement == null
    ) {
      return;
    }

    setLineStyling(
      getLineStyling(
        parentNodeElement,
        firstChildElement,
        lastChildElement,
        edgeThickness
      )
    );
  }, [parentNodeElement, nodes, edgeThickness, onNodeRendered]);

  return (
    <div>
      <div
        css={{
          height: `${edgeThickness}px`,
          backgroundColor: edgeColor,
          ...lineStyling,
        }}
      />
      <div
        css={{
          display: "flex",
          gap: `${nodeHorizontalGap}px`,
        }}
      >
        {nodes.map((nodeData) => (
          <Node<Data>
            key={`node_${nodeData.id}`}
            nodeComponent={nodeComponent}
            nodeData={nodeData}
            nodeProperties={{
              hasChildren: hasChildren(nodeData.id),
              isExpanded: isNodeOpen(nodeData.id),
              isRootNode: false,
            }}
            onClick={() => onNodeClicked(nodeData.id)}
            ref={(element: HTMLDivElement) => {
              nodeRefs.current[nodeData.id] = element;
            }}
          />
        ))}
      </div>
    </div>
  );
}

export { Level };
export type { LevelProps };
