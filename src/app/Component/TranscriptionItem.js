import React, { useState } from "react";

export default function TranscriptionItem({ item,handleStartTimechange,handleEndTimechange,handleContentchange }) {
    const [startsec, setStartsec] = useState(item.start_time);
    const [endsec, setEndsec] = useState(item.end_time);
    const [content, setCont] = useState(item.content);

    console.log("item", item);

    return (
        <div className="my-1 grid grid-cols-3 gap-1 items-center">
            <input
                type="text"
                className="bg-white/20 p-1 rounded-md"
                value={startsec}
                onChange={handleStartTimechange}
            />
            <input
                type="text"
                className="bg-white/20 p-1 rounded-md"
                value={endsec}
                onChange={handleEndTimechange}
            />
            <input
                type="text"
                className="bg-white/20 p-1 rounded-md"
                value={content}
                onChange={handleContentchange}
            />
        </div>
    );
}
