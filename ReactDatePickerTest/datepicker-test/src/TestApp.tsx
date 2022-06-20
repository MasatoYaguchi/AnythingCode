import {
  DatePickerWarapper,
  TimePickerWarapper,
} from "./component/parts/DatePickerComponent";
import { Moment } from "moment";
import { useState } from "react";

const TestApp = () => {
  console.log("DomRender", new Date().toLocaleTimeString());
  const [publishStartAt, setPublishStartAt] = useState<Moment>();

  const onChange = (time: Moment | null, timeString: string) => {
    console.log(time, timeString);
    if (time) {
      console.log("🌸 onChange!", time);
      setPublishStartAt(time);
    }
  };

  const onChangeTime = (time: Moment | null, timeString: string) => {
    console.log("onChangeTime", time, timeString);
    if (time) setPublishStartAt(time);
  };

  const onSelectTime = () => {
    console.log("🌸 onSelectTime");
  };

  const onBlur = () => {
    console.log("🌸 onBlur");
  };

  const style: React.CSSProperties = {
    margin: 15,
  };

  return (
    <div style={style}>
      <div>
        <DatePickerWarapper
          style={style}
          onChange={onChange}
          value={publishStartAt}
        ></DatePickerWarapper>
      </div>
      <div>
        <TimePickerWarapper
          style={style}
          onChange={onChangeTime}
          onSelect={onSelectTime}
          onBlur={onBlur}
          format={"HH:mm"}
          value={publishStartAt}
           ></TimePickerWarapper>
      </div>
      <div>{publishStartAt?.toDate().toString()}</div>
      <div style={style}>{navigator.userAgent}</div>
    </div>
  );
};

export default TestApp;
