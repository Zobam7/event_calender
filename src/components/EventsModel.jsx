import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import Draggable from "react-draggable";

const EventsModel = () => {
  const { setShowEventModal, daySelected, dispatchCalEvents, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const red = "rgb(254 202 202)";
  const gray = "rgb(229 231 235)";
  const indigo = "rgb(199 210 254)";
  const blue = "rgb(191 219 254)";
  const green = "rgb(187 247 208)";
  const purple = "rgb(233 213 255)";
  const labelClasses = [indigo, gray, blue, red, green, purple];
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClasses.find((lbl) => lbl === selectedEvent.label)
      : labelClasses[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calenderEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCalEvents({ type: "update", payload: calenderEvent });
    } else {
      dispatchCalEvents({ type: "push", payload: calenderEvent });
    }

    setShowEventModal(false);
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <Draggable
        handle="strong"
        bounds={{ top: -80, left: -450, right: 450, bottom: 80 }}
      >
        <form className="bg-white rounded-lg shadow-2xl w-1/4">
          <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <strong className="material-icons-outlined text-gray-400 cursor-pointer">
              drag_handle
            </strong>
            <div>
              {selectedEvent && (
                <span
                  onClick={() => {
                    dispatchCalEvents({
                      type: "delete",
                      payload: selectedEvent,
                    });
                    setShowEventModal(false);
                  }}
                  className="material-icons-outlined text-gray-400 cursor-pointer"
                >
                  delete
                </span>
              )}
              <button onClick={() => setShowEventModal(false)}>
                <span className="material-icons-outlined text-gray-400">
                  close
                </span>
              </button>
            </div>
          </header>
          <div className="p-3">
            <div className="grid grid-cols-1/5 items-end gap-y-7">
              <div />
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="material-icons-outlined text-gray-400">
                schedule
              </span>
              <p>{daySelected.format("dddd, MMMM DD")}</p>
              <span className="material-icons-outlined text-gray-400">
                segment
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="material-icons-outlined text-gray-400">
                bookmark_border
              </span>
              <div className="flex gap-x-2">
                {labelClasses.map((label, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(label)}
                    className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: `${label}` }}
                  >
                    {selectedLabel === label && (
                      <span className="material-icons-outlined text-white text-sm">
                        check
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <footer className="flex justify-end border-t p-3 mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            >
              Save
            </button>
          </footer>
        </form>
      </Draggable>
    </div>
  );
};

export default EventsModel;
