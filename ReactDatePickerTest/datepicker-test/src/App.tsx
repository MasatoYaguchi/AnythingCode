import "./App.css";
import {
  DatePickerProps,
  TimePicker,
  Modal,
  DatePicker,
  Typography,
  Button,
} from "antd";
import React, { useRef, useEffect, useState } from "react";
import "antd/dist/antd.css";
import moment, { Moment } from "moment";

const TestModal = () => {
  const [publishStartAt, setPublishStartAt] = useState<Moment>();
  const [showModal, setShowModal] = useState(false);
  const clearValues = () => {
    setPublishStartAt(undefined);
  };
  const onChangeDate = (date: Moment | null, _dateString: string) => {
    if (date) {
      const newPublishStartAt = (publishStartAt || moment()).set({
        year: date.get("year"),
        month: date.get("month"),
        date: date.get("date"),
      });
      setPublishStartAt(newPublishStartAt);
    }
  };

  const onChangeTime = (time: Moment | null, _dateString: string) => {
    if (time) {
      const newPublishStartAt = (publishStartAt || moment()).set({
        hour: time.get("hour"),
        minute: time.get("minute"),
      });
      setPublishStartAt(newPublishStartAt);
    }
  };

  const onPress = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <Button onClick={onPress}>モーダル表示</Button>
      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => {
          clearValues();
          setShowModal(false);
        }}
      >
        <div style={{ marginTop: 20 }}>
          <Typography style={{ marginBottom: 10, fontWeight: "bold" }}>
            予約投稿日時を入力
          </Typography>
          <DatePicker value={publishStartAt} onChange={onChangeDate} />
          <TimePicker
            style={{ marginTop: 5 }}
            value={publishStartAt}
            onChange={onChangeTime}
            format={"HH:mm"}
          />
        </div>
        <div style={{ marginTop: 10, alignItems: "flex-end" }}>
          <a
            href="/posts/scheduling_posts"
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            ▶ 予約中投稿一覧
          </a>
        </div>
      </Modal>
    </div>
  );
};

const App = () => {
  const [publishStartAt, setPublishStartAt] = useState<Moment>();



  const userAgent = () => {
    return navigator.userAgent;
  };

  const AntDesignDate: React.FC = () => {
    const onChange: DatePickerProps["onChange"] = (date, dateString) => {};
    const onChangeTime = (time: Moment | null, timeString: string) => {
      console.log(time, timeString);
      if (time) setPublishStartAt(time);
    };

    let selectTime: Moment | undefined = undefined;
    const onSelectTime = (time: Moment) => {
      console.log("select", time);
      selectTime = time;
    };

    // focusが外れた時
    const onBlur = (data: any) => {
      console.log("onBlur", data);
      if (selectTime !== publishStartAt) {
        console.log("valueを書き換える");
        setPublishStartAt(selectTime);
      }
    };


    const inputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      console.log(inputRef.current);

      inputRef.current?.getElementsByClassName("input");
      // inputRef.current
    }, []);

    return (
      <div className="container">
        <div className="m-4 p-2">
          <div className="m-2">
            <DatePicker onChange={onChange} />
          </div>
          <div className="m-2 mt-4" ref={inputRef}>
            <TimePicker
              style={{ marginTop: 5 }}
              onChange={onChangeTime}
              onSelect={onSelectTime}
              onBlur={onBlur}
              format={"HH:mm"}
              value={publishStartAt}
            />
          </div>
        </div>
      </div>
    );
  };

  const DateDefalt = () => {
    console.log("DomRender", new Date().toLocaleTimeString());
    return (
      <div className="container">
        <div className="m-2">
          <div className="ant-picker">
            <div className="ant-picker-input">
              <input placeholder="Select date" title="" size={12} type="date" />
              <span className="ant-picker-suffix">
                <span
                  role="img"
                  aria-label="calendar"
                  className="anticon anticon-calendar"
                >
                  <svg
                    focusable="false"
                    data-icon="calendar"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="ant-picker m-4 p-2">
          <div className="ant-picker-input">
            <input type="date" placeholder="Select Date"></input>
          </div>
        </div>
        <div className="m-4 p-2">
          <div className="m-2 mt-4">
            <label>時間</label>
            <input type="time"></input>
          </div>
        </div>
        <div className="mt-5">{userAgent()}</div>
      </div>
    );
  };

  return (
    <>
      <TestModal></TestModal>
      <AntDesignDate></AntDesignDate>
      <DateDefalt></DateDefalt>
    </>
  );
};

export default App;
