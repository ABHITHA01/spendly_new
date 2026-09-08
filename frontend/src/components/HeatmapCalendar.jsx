import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { daysInMonth, formatINR, categoryEmoji } from '../utils/format';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default function HeatmapCalendar({ expenses, safeDaily }) {
  const today = new Date();
  const currentYear = today.getFullYear();

  const [collapsed, setCollapsed] = useState(false);
  const [viewMonthIndex, setViewMonthIndex] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const viewDate = new Date(currentYear, viewMonthIndex, 1);

  const totalDays = daysInMonth(viewDate);
  const leadingBlanks = viewDate.getDay();

  const isCurrentMonth = viewMonthIndex === today.getMonth();

  const isToday = (day) => {
    return isCurrentMonth && day === today.getDate();
  };

  const isFuture = (day) => {
    return isCurrentMonth
      ? day > today.getDate()
      : viewMonthIndex > today.getMonth();
  };

  const entriesByDay = useMemo(() => {
    const map = {};

    (expenses || []).forEach((e) => {
      const d = new Date(e.date);

      if (
        d.getFullYear() === currentYear &&
        d.getMonth() === viewMonthIndex
      ) {
        const day = d.getDate();

        if (!map[day]) {
          map[day] = [];
        }

        map[day].push(e);
      }
    });

    return map;
  }, [expenses, currentYear, viewMonthIndex]);

  const dayTotal = (day) => {
    return (entriesByDay[day] || []).reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );
  };

  const goPrevMonth = () => {
    setViewMonthIndex((m) => Math.max(0, m - 1));
    setSelectedDay(null);
  };

  const goNextMonth = () => {
    setViewMonthIndex((m) => Math.min(11, m + 1));
    setSelectedDay(null);
  };

  const selectedEntries = selectedDay
    ? entriesByDay[selectedDay] || []
    : [];

  return (
    <div className="card heatmap-card">

      {/* HEADER */}

      <div className="bottom-card-head">
        <div>
          <p className="bottom-card-title">
            Heatmap
          </p>

          <p
            style={{
              fontSize: 9,
              color: 'var(--text-muted)',
              marginTop: 1
            }}
          >
            Tap on a day to see details
          </p>
        </div>

        <button
          className="icon-btn"
          style={{
            width: 22,
            height: 22
          }}
          onClick={() => setCollapsed((c) => !c)}
          type="button"
          aria-label="Toggle heatmap"
        >
          {collapsed ? '＋' : '×'}
        </button>
      </div>

      {!collapsed && (
        <>

          {/* MONTH NAVIGATION */}

          <div className="heatmap-month-nav">

            <button
              className="icon-btn"
              style={{
                width: 20,
                height: 20
              }}
              onClick={goPrevMonth}
              disabled={viewMonthIndex === 0}
              type="button"
              aria-label="Previous month"
            >
              ‹
            </button>

            <span className="heatmap-month-label">
              {MONTH_NAMES[viewMonthIndex]} {currentYear}
            </span>

            <button
              className="icon-btn"
              style={{
                width: 20,
                height: 20
              }}
              onClick={goNextMonth}
              disabled={viewMonthIndex === 11}
              type="button"
              aria-label="Next month"
            >
              ›
            </button>

          </div>


          {/* WEEKDAYS */}

          <div className="heatmap-weekdays">
            {WEEKDAYS.map((d, i) => (
              <span key={i}>
                {d}
              </span>
            ))}
          </div>


          {/* CALENDAR */}

          <div className="heatmap-grid">

            {Array.from(
              { length: leadingBlanks },
              (_, i) => (
                <div key={`blank-${i}`} />
              )
            )}

            {Array.from(
              { length: totalDays },
              (_, i) => i + 1
            ).map((day) => {

              const spent = dayTotal(day);
              const future = isFuture(day);
              const hasEntry = spent > 0;

              return (
                <button
                  key={day}
                  className={`heatmap-day ${
                    hasEntry ? 'has-entry' : ''
                  } ${
                    isToday(day) ? 'is-today' : ''
                  }`}
                  style={{
                    opacity: future ? 0.3 : 1
                  }}
                  title={
                    future
                      ? `Day ${day}`
                      : `Day ${day}: ${formatINR(spent)}`
                  }
                  onClick={() => {
                    if (!future) {
                      setSelectedDay(day);
                    }
                  }}
                  disabled={future}
                >
                  {day}
                </button>
              );
            })}

          </div>
        </>
      )}


      {/* ================================
          POPUP
          ================================ */}

      {selectedDay &&
        createPortal(
          <div
            className="heatmap-modal-backdrop"
            onClick={() => setSelectedDay(null)}
          >

            <div
              className="heatmap-modal-card"
              onClick={(e) => e.stopPropagation()}
            >

              <h2>
                {MONTH_NAMES[viewMonthIndex]} {selectedDay},{' '}
                {currentYear}
              </h2>


              {selectedEntries.length === 0 ? (

                <p className="heatmap-no-entries">
                  No entries logged this day.
                </p>

              ) : (

                <>

                  <div className="heatmap-entry-list">

                    {selectedEntries.map((e) => (

                      <div
                        key={e._id}
                        className="heatmap-entry"
                      >

                        <span className="heatmap-entry-emoji">
                          {categoryEmoji(e.category)}
                        </span>

                        <span className="heatmap-entry-category">
                          {e.category}
                        </span>

                        <span className="heatmap-entry-note">
                          {e.note || '—'}
                        </span>

                        <span className="heatmap-entry-amount">
                          {formatINR(e.amount)}
                        </span>

                      </div>

                    ))}

                  </div>


                  <div className="heatmap-total">
                    Total:{' '}
                    <strong>
                      {formatINR(dayTotal(selectedDay))}
                    </strong>
                  </div>

                </>

              )}


              <button
                type="button"
                className="heatmap-close-btn"
                onClick={() => setSelectedDay(null)}
              >
                Close
              </button>

            </div>

          </div>,

          document.body
        )}

    </div>
  );
}