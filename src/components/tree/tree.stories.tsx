import { NodeProperties } from "src/components/node";

import { Tree } from "./tree";

interface NodeData {
  name: string;
  // eslint-disable-next-line react/no-unused-prop-types
  width: number;
  // eslint-disable-next-line react/no-unused-prop-types
  height: number;
}

function TestNode(
  { name }: NodeData,
  { isExpanded }: NodeProperties
): JSX.Element {
  return (
    <div
      css={{
        width: 100,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        borderRadius: "3px",
        backgroundColor: isExpanded ? "lightblue" : "white",
      }}
    >
      {name}
    </div>
  );
}

function VaryingSizeNode(
  { name, width, height }: NodeData,
  { isExpanded }: NodeProperties
): JSX.Element {
  return (
    <div
      css={{
        width: width,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        borderRadius: "3px",
        backgroundColor: isExpanded ? "lightblue" : "white",
      }}
    >
      {name}
    </div>
  );
}

const defaultEdgeList = [
  { fromId: "node1", toId: "node2" },
  { fromId: "node1", toId: "node3" },
  { fromId: "node1", toId: "node4" },
  { fromId: "node3", toId: "node5" },
  { fromId: "node3", toId: "node6" },
  { fromId: "node4", toId: "node7" },
  { fromId: "node7", toId: "node8" },
  { fromId: "node7", toId: "node9" },
];
const defaultNodeList = [
  {
    id: "node1",
    data: {
      name: "Node 1",
      width: 120,
      height: 60,
    },
  },
  {
    id: "node2",
    data: {
      name: "Node 2",
      width: 80,
      height: 50,
    },
  },
  {
    id: "node3",
    data: {
      name: "Node 3",
      width: 140,
      height: 80,
    },
  },
  {
    id: "node4",
    data: {
      name: "Node 4",
      width: 100,
      height: 40,
    },
  },
  {
    id: "node5",
    data: {
      name: "Node 5",
      width: 100,
      height: 40,
    },
  },
  {
    id: "node6",
    data: {
      name: "Node 6",
      width: 60,
      height: 30,
    },
  },
  {
    id: "node7",
    data: {
      name: "Node 7",
      width: 100,
      height: 40,
    },
  },
  {
    id: "node8",
    data: {
      name: "Node 8",
      width: 100,
      height: 100,
    },
  },
  {
    id: "node9",
    data: {
      name: "Node 9",
      width: 200,
      height: 60,
    },
  },
];

export default {
  component: Tree,
  title: "Components/Tree",
};

export function SingleNodeTree(): JSX.Element {
  return (
    <Tree<NodeData>
      edgeList={[]}
      node={TestNode}
      nodeList={[
        {
          id: "node1",
          data: {
            name: "Node 1",
            width: 120,
            height: 60,
          },
        },
      ]}
      rootNodeId="node1"
    />
  );
}

export function SimpleTree(): JSX.Element {
  return (
    <Tree<NodeData>
      edgeList={[
        { fromId: "node1", toId: "node2" },
        { fromId: "node1", toId: "node3" },
      ]}
      node={TestNode}
      nodeList={[
        {
          id: "node1",
          data: {
            name: "Node 1",
            width: 120,
            height: 60,
          },
        },
        {
          id: "node2",
          data: {
            name: "Node 2",
            width: 120,
            height: 60,
          },
        },
        {
          id: "node3",
          data: {
            name: "Node 3",
            width: 120,
            height: 60,
          },
        },
      ]}
      rootNodeId="node1"
    />
  );
}

export function ComplexTree(): JSX.Element {
  return (
    <Tree<NodeData>
      edgeList={defaultEdgeList}
      node={TestNode}
      nodeList={defaultNodeList}
      rootNodeId="node1"
    />
  );
}

export function ComplexTreeWithExpandedNodes(): JSX.Element {
  return (
    <Tree<NodeData>
      defaultExpandedNodes={["node1", "node4", "node7"]}
      edgeList={defaultEdgeList}
      node={TestNode}
      nodeList={defaultNodeList}
      rootNodeId="node1"
    />
  );
}

export function ComplexTreeWithVaryingNodeSizes(): JSX.Element {
  return (
    <Tree<NodeData>
      edgeList={defaultEdgeList}
      node={VaryingSizeNode}
      nodeList={defaultNodeList}
      rootNodeId="node1"
    />
  );
}

export function ComplexTreeWithCustomStyling(): JSX.Element {
  return (
    <Tree<NodeData>
      edgeList={defaultEdgeList}
      node={TestNode}
      nodeList={defaultNodeList}
      rootNodeId="node1"
      styling={{
        edgeColor: "gray",
        edgeThickness: 4,
        nodeHorizontalGap: 20,
        nodeVerticalGap: 52,
      }}
    />
  );
}
