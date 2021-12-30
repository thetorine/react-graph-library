interface Node<Data> {
  id: string;
  data: Data;
}

interface Edge {
  fromId: string;
  toId: string;
}

interface NodeMapping<Data> {
  [nodeId: string]: Node<Data>;
}

interface EdgeMapping {
  [nodeId: string]: string[];
}

interface NodeProperties {
  hasChildren: boolean;
  isExpanded: boolean;
  isRootNode: boolean;
}

interface NodeRefs {
  [nodeId: string]: HTMLDivElement | null;
}

interface TreeStyling {
  edgeColor: React.CSSProperties["backgroundColor"];
  edgeThickness: number;
  nodeHorizontalGap: number;
  nodeVerticalGap: number;
}

type NodeList<Data> = Array<Node<Data>>;
type EdgeList = Edge[];

export type {
  Node,
  NodeList,
  NodeMapping,
  NodeProperties,
  NodeRefs,
  Edge,
  EdgeList,
  EdgeMapping,
  TreeStyling,
};
