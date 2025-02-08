import { Col, Row, Select, TimePicker } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";

const AvailableTimesSelector = ({ initialTimes, onChange }) => {
  const [times, setTimes] = useState(initialTimes || []);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleTimeChange = (dayIndex, time) => {
    setTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];

      if (!time) {
        // If time is cleared, remove the entry
        updatedTimes[dayIndex] = null;
      } else {
        updatedTimes[dayIndex] = {
          day: dayIndex,
          startTime: time[0]?.format("HH:mm:ss"), // Add seconds for backend
          endTime: time[1]?.format("HH:mm:ss"), // Add seconds for backend
        };
      }

      // Filter out null entries and call onChange with cleaned array
      const filteredTimes = updatedTimes.filter(Boolean);
      onChange(filteredTimes);

      return updatedTimes;
    });
  };

  return (
    <div>
      {daysOfWeek.map((day, index) => (
        <Row key={index} gutter={[8, 8]} style={{ marginBottom: "8px" }}>
          <Col xs={24} sm={8}>
            <Select value={index} style={{ width: "100%" }} disabled>
              <Select.Option value={index}>{day}</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={16}>
            <TimePicker.RangePicker
              format="HH:mm"
              style={{ width: "100%" }}
              onChange={(time) => handleTimeChange(index, time)}
              value={
                times[index]?.startTime && times[index]?.endTime
                  ? [
                      moment(times[index].startTime, "HH:mm:ss"),
                      moment(times[index].endTime, "HH:mm:ss"),
                    ]
                  : null
              }
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default AvailableTimesSelector;
