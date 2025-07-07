import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import  { React,useState } from "react";
import User from "./User";
import Song from "./Song";

const Dnd = ({
    list,
    setList,
}) => {
          const handleDragEnd = (event) => {
        const { active, over } = event;
        // console.log("active", active.id);
        // console.log("over", over.id);
    
        if (!active?.id !== over?.id) {
            setList((list) => {
            const oldIndex = list.findIndex((person) => person?.id === active?.id);
            const newIndex = list.findIndex((person) => person?.id === over?.id);
    
            // console.log(arrayMove(list, oldIndex, newIndex));
            return arrayMove(list, oldIndex, newIndex);
          });
        }
    
        // console.log("drag end");
      };
    
  return (
    <div style={{
    // maxHeight: "60vh",
    // overflowY:"scroll",
    border: "1px solid var(--iq-dark-border-light)",
    borderRadius: "5px",
    }} className="d-flex justify-content-center align-items-center  ">
      <div className="w-75">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={list}
            strategy={verticalListSortingStrategy}
          >
            {/* {list.map((el,index) => (
              <User key={index} song={el} />
            ))} */}
                {list.map((song) => (
              <Song key={song.id} song={song} setList={setList} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

export default Dnd