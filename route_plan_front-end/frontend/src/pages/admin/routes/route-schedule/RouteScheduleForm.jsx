import React, { useState } from "react";
import { Form, DatePicker, Button, Row, Col, Input, message } from "antd";
import {
  useCreateRouteScheduleMutation,
  useUpdateRouteScheduleMutation,
} from "../../../../redux/slices/routeSlice";
import AvailableTimesSelector from "./time-picker/timePicker";

const { TextArea } = Input;

const RouteScheduleForm = ({ route, initialValues, onComplete }) => {
  const [form] = Form.useForm();
  const [availableTimes, setAvailableTimes] = useState(
    initialValues?.available_times || []
  );

  const [createRouteSchedule, { isLoading: isCreating }] =
    useCreateRouteScheduleMutation();
  const [updateRouteSchedule, { isLoading: isUpdating }] =
    useUpdateRouteScheduleMutation();

  const handleSave = async (values) => {
    try {
      // Validate that we have at least one available time
      if (!availableTimes.length) {
        message.error("Please set at least one available time");
        return;
      }

      const payload = {
        route: route.id,
        start_date: values.start_date[0].format("YYYY-MM-DD"),
        end_date: values.start_date[1]
          ? values.start_date[1].format("YYYY-MM-DD")
          : null,
        notes: values.notes,
        status: "SCHEDULED",
        available_time: availableTimes.map((at) => ({
          day_of_week: at.day,
          start_time: at.startTime,
          end_time: at.endTime,
        })),
      };

      console.log("Payload being sent:", payload);

      if (initialValues?.id) {
        await updateRouteSchedule({
          id: initialValues.id,
          ...payload,
        }).unwrap();
        message.success("Route schedule updated successfully");
      } else {
        await createRouteSchedule(payload).unwrap();
        message.success("Route schedule created and notification sent");
      }

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error saving route schedule:", error);
      const errorMessage =
        error?.data?.non_field_errors?.[0] ||
        error?.data?.message ||
        "Failed to save route schedule.";
      message.error(errorMessage);
    }
  };

  const handleAvailableTimeChange = (newTimes) => {
    setAvailableTimes(newTimes);
  };

  const disabledDate = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Form
      form={form}
      onFinish={handleSave}
      initialValues={{
        ...initialValues,
        start_date:
          initialValues?.start_date && initialValues?.end_date
            ? [initialValues.start_date, initialValues.end_date]
            : null,
      }}
      layout="vertical"
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="route-info">
            <p>
              <strong>Route:</strong> {route?.name}
            </p>
            {route?.merchandiser && (
              <p>
                <strong>Merchandiser:</strong> {route.merchandiser}
              </p>
            )}
          </div>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Start and End Date"
            name="start_date"
            rules={[{ required: true, message: "Please select a date range" }]}
          >
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              disabledDate={disabledDate}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Available Times"
            rules={[
              {
                required: true,
                message: "Please set at least one available time",
              },
            ]}
          >
            <AvailableTimesSelector
              initialTimes={availableTimes}
              onChange={handleAvailableTimeChange}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Notes" name="notes">
            <TextArea
              rows={4}
              placeholder="Add any notes or instructions for this schedule"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" gutter={16}>
        <Col>
          <Button onClick={onComplete}>Cancel</Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {initialValues?.id ? "Update Schedule" : "Create Schedule"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RouteScheduleForm;
