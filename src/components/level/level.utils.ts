function getLineStyling(
  parentElement: HTMLDivElement,
  leftChildElement: HTMLDivElement,
  rightChildElement: HTMLDivElement,
  lineThickness: number
): React.CSSProperties {
  const leftPoint = getLineLeftPoint(
    parentElement,
    leftChildElement,
    lineThickness
  );
  const rightPoint = getLineRightPoint(
    parentElement,
    rightChildElement,
    lineThickness
  );
  const marginLeft = getLeftMargin(
    parentElement,
    leftChildElement,
    lineThickness
  );
  return {
    width: rightPoint - leftPoint,
    marginLeft,
  };
}

function getLineLeftPoint(
  parentElement: HTMLDivElement,
  leftChildElement: HTMLDivElement,
  lineThickness: number
): number {
  const parentMiddle = parentElement.offsetLeft + parentElement.clientWidth / 2;
  const leftChildMiddle =
    leftChildElement.offsetLeft + leftChildElement.clientWidth / 2;
  return Math.min(parentMiddle, leftChildMiddle) - lineThickness / 2;
}

function getLineRightPoint(
  parentElement: HTMLDivElement,
  rightChildElement: HTMLDivElement,
  lineThickness: number
): number {
  const parentMiddle = parentElement.offsetLeft + parentElement.clientWidth / 2;
  const rightChildMiddle =
    rightChildElement.offsetLeft + rightChildElement.clientWidth / 2;
  return Math.max(parentMiddle, rightChildMiddle) + lineThickness / 2;
}

function getLeftMargin(
  parentElement: HTMLDivElement,
  leftChildElement: HTMLDivElement,
  lineThickness: number
): number {
  const parentMiddle = parentElement.offsetLeft + parentElement.clientWidth / 2;
  const leftChildMiddle =
    leftChildElement.offsetLeft + leftChildElement.clientWidth / 2;

  if (parentMiddle < leftChildMiddle) {
    return parentElement.clientWidth / 2 - lineThickness / 2;
  }
  return leftChildElement.clientWidth / 2 - lineThickness / 2;
}

export { getLineStyling };
