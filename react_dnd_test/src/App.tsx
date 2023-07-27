import React, { useState } from "react";
import "./App.css";
import { ImageData } from "./ImageData";
import { Box, Card, Typography } from "@mui/material";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

type DragCardProps = {
  id: string;
  name: string;
  thumb: string;
  index: number;
};

const DragCard = ({ id, name, thumb, index }: DragCardProps) => {
  return (
    <Draggable
      key={`draggable-${id}`}
      draggableId={`draggable-${id}`}
      index={index}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={2}
          style={{
            backgroundColor: "#111",
            backgroundImage: `url(${thumb})`,
            backgroundRepeat: "no-repeat",
            width: "500px",
            height: "50px",
            margin: "10px",
            padding: "10px",
          }}
        >
          {/* <Box
            sx={{
              ml: -1,
              mt: 0.75,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              display: "flex",
              typography: "caption",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "primary.900" : "primary.50",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "primary.700",
            }}
          >
            <Typography
              component="div"
              fontWeight="bold"
              color={"#FFF"}
              style={{ width: "100%", textAlign: "end" }}
            >
              {name}
            </Typography>
          </Box> */}
        </Card>
      )}
    </Draggable>
  );
};

// 結果を並べ替えるのに役立つ小さな関数
const reorder = (
  list: typeof ImageData,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [list, setList] = useState<typeof ImageData>(ImageData);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    // ドロップ先がない
    if (!result.destination) {
      return;
    }
    // 配列の順序を入れ替える
    const items = reorder(list, result.source.index, result.destination.index);
    setList(items);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>D&Dテスト</h1>
        {/* ドラッグアンドドロップの有効範囲 */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.map(({ id, name, thumb }, index) => (
                  <DragCard
                    key={`card-${id}`}
                    id={id}
                    name={name}
                    thumb={thumb}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
