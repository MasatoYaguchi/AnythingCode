import { DatePickerProps, TimePickerProps, TimePicker, DatePicker } from "antd";
import "antd/dist/antd.css";
import { Moment } from "moment";
import { useState } from "react";

export const DatePickerWarapper: React.FC<DatePickerProps> = (
  datePickerProps
) => {
  return (
    <>
      <DatePicker {...datePickerProps} inputReadOnly={true}></DatePicker>
    </>
  );
};

/**
 *
 * @param timePickerProps
 * @returns
 */
export const TimePickerWarapper: React.FC<TimePickerProps> = (
  timePickerProps
) => {
  const onBlurOriginal = timePickerProps.onBlur;
  const onSelectOriginal = timePickerProps.onSelect;
  const onChangeOriginal = timePickerProps.onChange;
  const [selectTime, setSelectTime] = useState<Moment>();

  const onChange = (value: Moment | null, dateString: string) => {
    if (value) setSelectTime(value);

    if (onChangeOriginal) onChangeOriginal(value, dateString);
  };

  console.log(timePickerProps);

  let selectMoment: Moment | undefined = undefined;
  /**
   * 選択した時刻を保持する
   * @param time
   */
  const onSelect = (time: Moment) => {
    selectMoment = time;
    if (onSelectOriginal) onSelectOriginal(time);
  };

  /**
   * フォーカスが外れた時、Selectの値を反映する
   * @param event
   */
  const onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (selectMoment && selectMoment !== selectTime) {
      setSelectTime(selectMoment);
      if (timePickerProps.onChange) {
        timePickerProps.onChange(selectMoment, selectMoment.toString());
        console.log("🌸 onChangeState更新", selectMoment?.toString());
      }
    }

    if (onBlurOriginal) onBlurOriginal(event);
  };

  return (
    <>
      <TimePicker
        {...timePickerProps}
        onChange={onChange}
        onBlur={onBlur}
        onSelect={onSelect}
        inputReadOnly={true}
        value={selectTime}
      ></TimePicker>
    </>
  );
};
