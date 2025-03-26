function Square(rows, columns) {
  this.rowsNumber = rows;
  this.columnsNumber = columns;

  const BLOCK_SIZE = 50;
  const MIN_INDEX_POSITION = 1;
  const REDUCE_ROW_BUTTON_DEFAULT_POSITION = -50;
  const REDUCE_COLUMN_BUTTON_DEFAULT_POSITION = -50;

  const BORDER_SIZE = 1;
  const BLOCKS_CONTAINER_PADDING = 1;

  const container = document.createElement("div");
  container.className = "container";

  const addRowButton = document.createElement("button");
  addRowButton.className = "add-row";
  addRowButton.innerText = "+";

  const addColumnButton = document.createElement("button");
  addColumnButton.className = "add-column";
  addColumnButton.innerText = "+";

  const reduceRowButton = document.createElement("button");
  reduceRowButton.classList.add("reduce-row");
  reduceRowButton.innerText = "-";

  const reduceColumnButton = document.createElement("button");
  reduceColumnButton.classList.add("reduce-column");
  reduceColumnButton.innerText = "-";

  const blocksContainer = document.createElement("div");
  blocksContainer.className = "blocks-container";

  document.body.appendChild(container);
  container.appendChild(reduceRowButton);
  container.appendChild(reduceColumnButton);
  container.appendChild(blocksContainer);
  container.appendChild(addColumnButton);
  container.appendChild(addRowButton);

  const toggleElementsVisibility = (elementsArray, isVisible) => {
    elementsArray.forEach((element) => {
      element.classList.remove("reduce-visible", "reduce-hidden");
      isVisible
        ? element.classList.add("reduce-visible")
        : element.classList.add("reduce-hidden");
    });
  };

  addRowButton.addEventListener("click", (event) => {
    this.rowsNumber += 1;
    calculateAndSetReduceButtonsPosition(event);
    renderBlocks();
  });
  addColumnButton.addEventListener("click", (event) => {
    this.columnsNumber += 1;
    calculateAndSetReduceButtonsPosition(event);
    renderBlocks();
  });

  const recalculateReduceButtonPosititon = () => {
    const blocksContainerNewHeight =
      this.rowsNumber * 50 + BORDER_SIZE + BLOCKS_CONTAINER_PADDING;
    const blocksContainerNewWidth =
      this.columnsNumber * 50 + BORDER_SIZE + BLOCKS_CONTAINER_PADDING;

    const oneBlockContianerSize =
      BLOCK_SIZE + BORDER_SIZE + BLOCKS_CONTAINER_PADDING;

    if (blocksContainerNewWidth <= oneBlockContianerSize) {
      toggleElementsVisibility([reduceColumnButton], false);
    }

    if (blocksContainerNewHeight <= oneBlockContianerSize) {
      toggleElementsVisibility([reduceRowButton], false);
    }

    const currentReduceColumnButtonPostition = parseInt(
      reduceColumnButton.style.left
    );
    const currentReduceRowButtonPostition = parseInt(reduceRowButton.style.top);

    if (blocksContainerNewWidth === currentReduceColumnButtonPostition) {
      reduceColumnButton.style.left = `${blocksContainerNewWidth - 50}px`;
      toggleElementsVisibility([reduceColumnButton], false);
    }

    if (blocksContainerNewHeight === currentReduceRowButtonPostition) {
      reduceRowButton.style.top = `${blocksContainerNewHeight - 50}px`;
      toggleElementsVisibility([reduceRowButton], false);
    }
  };

  reduceColumnButton.addEventListener("click", () => {
    if (this.columnsNumber === 1) {
      toggleElementsVisibility([reduceColumnButton], false);
      return;
    }

    this.columnsNumber--;
    recalculateReduceButtonPosititon();

    renderBlocks();
  });
  reduceRowButton.addEventListener("click", () => {
    if (this.rowsNumber === 1) {
      toggleElementsVisibility([reduceRowButton], false);
      return;
    }

    this.rowsNumber--;
    recalculateReduceButtonPosititon();

    renderBlocks();
  });

  const calculateAndSetReduceButtonsPosition = (event) => {
    // GET X AND Y
    const blocksContainerPosition = blocksContainer.getBoundingClientRect();
    const x = event.clientX - blocksContainerPosition.x;
    const y = event.clientY - blocksContainerPosition.y;

    // CALCULATE COLUMN POSITION
    const hoveredColumnNumber = Math.floor(x / BLOCK_SIZE) + MIN_INDEX_POSITION;

    const maxHoveredColumnNumber = Math.min(
      hoveredColumnNumber,
      this.columnsNumber
    );
    const minHoveredColumnNumber = Math.max(hoveredColumnNumber, 1);

    let postitionToMoveReduceColumnButton =
      hoveredColumnNumber <= 0
        ? minHoveredColumnNumber * BLOCK_SIZE
        : maxHoveredColumnNumber * BLOCK_SIZE;

    const finalReduceColumnPosititon =
      REDUCE_COLUMN_BUTTON_DEFAULT_POSITION +
      postitionToMoveReduceColumnButton +
      BORDER_SIZE +
      BLOCKS_CONTAINER_PADDING;

    reduceColumnButton.style.left = `${finalReduceColumnPosititon}px`;

    // CALCULATE ROW POSITION
    const hoveredRowNumber = Math.floor(y / BLOCK_SIZE) + MIN_INDEX_POSITION;

    const maxHoveredRowNumber = Math.min(hoveredRowNumber, this.rowsNumber);
    const minHoveredRowNumber = Math.max(hoveredRowNumber, 1);

    let positionToMoveReduceRowElement =
      hoveredRowNumber <= 0
        ? minHoveredRowNumber * BLOCK_SIZE
        : maxHoveredRowNumber * BLOCK_SIZE;

    const finalReduceRowPosition =
      REDUCE_ROW_BUTTON_DEFAULT_POSITION +
      positionToMoveReduceRowElement +
      BORDER_SIZE +
      BLOCKS_CONTAINER_PADDING;

    reduceRowButton.style.top = `${finalReduceRowPosition}px`;
  };

  blocksContainer.addEventListener("mousemove", (event) => {
    calculateAndSetReduceButtonsPosition(event);
  });

  blocksContainer.addEventListener("mouseover", () => {
    if (this.rowsNumber === 1 && this.columnsNumber === 1) {
      toggleElementsVisibility([reduceColumnButton, reduceRowButton], false);
      return;
    }

    if (this.rowsNumber > 1 && this.columnsNumber === 1) {
      toggleElementsVisibility([reduceRowButton], true);
      return;
    }

    if (this.rowsNumber === 1 && this.columnsNumber > 1) {
      toggleElementsVisibility([reduceColumnButton], true);
      return;
    }

    toggleElementsVisibility([reduceColumnButton, reduceRowButton], true);
  });

  blocksContainer.addEventListener("mouseout", () => {
    toggleElementsVisibility([reduceColumnButton, reduceRowButton], false);
  });

  [reduceColumnButton, reduceRowButton].forEach((reduceButton) => {
    reduceButton.addEventListener("mouseenter", () => {
      toggleElementsVisibility([reduceButton], true);
    });
    reduceButton.addEventListener("mouseleave", () => {
      toggleElementsVisibility([reduceButton], false);
    });
  });

  const renderBlocks = () => {
    blocksContainer.style.gridTemplateColumns = `repeat(${this.columnsNumber}, ${BLOCK_SIZE}px)`;
    blocksContainer.style.gridTemplateRows = `repeat(${this.rowsNumber}, ${BLOCK_SIZE}px)`;

    blocksContainer.innerHTML = null;

    for (let i = 0; i < this.rowsNumber; i++) {
      for (let j = 0; j < this.columnsNumber; j++) {
        const newBlock = document.createElement("div");
        newBlock.className = "block";
        blocksContainer.appendChild(newBlock);
      }
    }
  };

  renderBlocks();
}
