import React from "react";

// A mock function to generate random attendance data for a year
const generateRandomAttendanceData = () => {
  const attendanceData = [];
  for (let i = 0; i < 365; i++) {
    attendanceData.push({
      date: new Date(2023, 0, i), // Example year 2023
      attendance: Math.floor(Math.random() * 3), // Random attendance: 0 - absent, 1 - late, 2 - present
    });
  }
  return attendanceData;
};

// Color function to determine the color based on attendance value
const getColor = (attendance: number) => {
  switch (attendance) {
    case 0:
      return "#ffffff"; // White for absent
    case 1:
      return "#add8e6"; // Light blue for late
    case 2:
      return "#2671c6"; // Blue for present
    default:
      return "#ffffff"; // Default white color for absent
  }
};

const AttendanceGrid = () => {
  const attendanceData = generateRandomAttendanceData();

  return (
    <div className="attendance-grid">
      {attendanceData.map((day, index) => (
        <div
          key={index}
          className="grid-cell "
          style={{ backgroundColor: getColor(day.attendance) }}
          title={`Date: ${day.date.toDateString()}, Attendance: ${
            day.attendance === 2
              ? "Present"
              : day.attendance === 1
              ? "Late"
              : "Absent"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default AttendanceGrid;
