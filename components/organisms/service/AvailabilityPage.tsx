import { useState } from 'react';
import { timeslots } from '../../../data/timeslots';
import { days } from '../../../utils/days';
import ClickAnimation from '../../animation/ClickAnimation';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import SlideInFromTop from '../../animation/SlideInFromTop';
import AvailabilitiesCalendar from '../../molecules/availability/AvailabilitiesCalendar';
import BookedAvailabilities from '../../molecules/availability/BookedAvailabilities';
import CurrentAvailabilities from '../../molecules/availability/CurrentAvailabilities';
import DeleteAvailabilities from '../../molecules/availability/DeleteAvailabilities';

const AvailabilityPage = (props: any) => {
  const [chosenTimeslotsArray, setChosenTimeslotsArray] = useState([]);
  const [deleteAvailabilities, setDeleteAvailabilities] = useState(false);
  const [newAvailabilities, setNewAvailabilities] = useState(false);
  const [currentAvailabilities, setCurrentAvailabilities] = useState(false);
  const [bookedAvailabilities, setBookedAvailabilities] = useState(false);

  return (
    <SlideInFromLeft>
      <div className="flex flex-col items-center mx-auto">
        <ul className="w-[95vw] sm:max-w-[50%] flex flex-col justify-center items-center gap-4 mx-auto ">
          <li className="w-full rounded-lg">
            <ClickAnimation>
              <button
                onClick={() => {
                  setNewAvailabilities((prevState) => !prevState);
                  setCurrentAvailabilities(false);
                  setDeleteAvailabilities(false);
                  setBookedAvailabilities(false);
                  setChosenTimeslotsArray([]);
                }}
                className="bg-[#564787] text-white px-8 py-6 rounded-lg w-full text-center cursor-pointer z-[99] shadow-secondary"
              >
                Set New Availabilities
              </button>
            </ClickAnimation>
            {newAvailabilities && (
              <SlideInFromTop>
                <AvailabilitiesCalendar
                  timeslots={timeslots}
                  days={days}
                  chosenTimeslotsArray={chosenTimeslotsArray}
                  setChosenTimeslotsArray={setChosenTimeslotsArray}
                  serviceId={props.serviceId}
                  setNewAvailabilities={setNewAvailabilities}
                />
              </SlideInFromTop>
            )}
          </li>

          <li className="w-full rounded-lg">
            <ClickAnimation>
              <button
                className="bg-[#564787] text-white px-8 py-6 rounded-lg w-full text-center cursor-pointer z-[99] shadow-secondary"
                onClick={() => {
                  setDeleteAvailabilities((prevState) => !prevState);
                  setCurrentAvailabilities(false);
                  setNewAvailabilities(false);
                  setBookedAvailabilities(false);
                  setChosenTimeslotsArray([]);
                }}
              >
                Delete Availabilities
              </button>
            </ClickAnimation>
            {deleteAvailabilities && (
              <SlideInFromTop>
                <DeleteAvailabilities
                  availabilities={props.availabilities}
                  serviceId={props.serviceId}
                  setDeleteAvailabilities={setDeleteAvailabilities}
                />
              </SlideInFromTop>
            )}
          </li>

          <li className="w-full rounded-lg">
            <ClickAnimation>
              <button
                onClick={() => {
                  setCurrentAvailabilities((prevState) => !prevState);
                  setNewAvailabilities(false);
                  setDeleteAvailabilities(false);
                  setBookedAvailabilities(false);
                }}
                className="bg-[#564787] text-white px-8 py-6 rounded-lg w-full text-center cursor-pointer z-[99] shadow-secondary"
              >
                See All Current Availabilities
              </button>
            </ClickAnimation>
            {currentAvailabilities && (
              <SlideInFromTop>
                <CurrentAvailabilities
                  availabilities={props.availabilities}
                  serviceId={props.serviceId}
                  chosenTimeslotsArray={undefined}
                />
              </SlideInFromTop>
            )}
          </li>

          <li className="w-full rounded-lg">
            <ClickAnimation>
              <button
                onClick={() => {
                  setCurrentAvailabilities(false);
                  setNewAvailabilities(false);
                  setDeleteAvailabilities(false);
                  setBookedAvailabilities((prevState) => !prevState);
                }}
                className="bg-[#564787] text-white px-8 py-6 rounded-lg w-full text-center cursor-pointer z-[99] shadow-secondary"
              >
                See Booked Availabilities
              </button>
            </ClickAnimation>
            {bookedAvailabilities && (
              <SlideInFromTop>
                <BookedAvailabilities
                  availabilities={props.availabilities}
                  serviceId={props.serviceId}
                  chosenTimeslotsArray={undefined}
                />
              </SlideInFromTop>
            )}
          </li>
        </ul>
      </div>
    </SlideInFromLeft>
  );
};

export default AvailabilityPage;
