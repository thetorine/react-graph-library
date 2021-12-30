import React from "react";

import { Node as NodeType, NodeProperties } from "src/common/types";
import { useTreeContext } from "src/hooks/use-tree-context";

// Override forwardRef to support generics
// https://codesandbox.io/s/mui-custom-button-typescript-example-function-declartion-k3cf0?file=/src/App.tsx
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

interface NodeProps<Data> {
  nodeComponent: (data: Data, properties: NodeProperties) => JSX.Element;
  nodeData: NodeType<Data>;
  nodeProperties: NodeProperties;
  onClick: () => void;
}

const Node = React.forwardRef(function Node<Data>(
  { nodeComponent, nodeData, nodeProperties, onClick }: NodeProps<Data>,
  ref: React.Ref<HTMLDivElement>
): JSX.Element {
  const {
    styling: { edgeColor, edgeThickness, nodeVerticalGap },
  } = useTreeContext();

  return (
    <div
      css={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      ref={ref}
    >
      {!nodeProperties.isRootNode && (
        <div
          css={{
            width: `${edgeThickness}px`,
            height: `${nodeVerticalGap}px`,
            backgroundColor: edgeColor,
          }}
        />
      )}
      <div onClick={onClick}>
        {nodeComponent(nodeData.data, nodeProperties)}
      </div>
      <div
        css={{
          width: `${edgeThickness}px`,
          height: `${nodeVerticalGap}px`,
          backgroundColor:
            nodeProperties.isExpanded && nodeProperties.hasChildren
              ? edgeColor
              : "transparent",
          flexGrow: 1,
        }}
      />
    </div>
  );
});

export { Node };
export type { NodeProps, NodeProperties };
