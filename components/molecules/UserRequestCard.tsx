import React from 'react';
import { FaStar } from 'react-icons/fa';
import CalendarIcon from '../atoms/icons/CalendarIcon';
import ClockIcon from '../atoms/icons/ClockIcon';

export default function UserRequestCard(props: any) {
  return (
    <li
      className={`z-1 px-10 py-6 mx-10 mb-6 relative flex flex-col items-center text-[#564787] text-center bg-white  rounded-xl shadow-secondaryModified gap-5 ${
        props.date < new Date() || props.request.status === 'rejected'
          ? 'bg-gray-300'
          : ''
      }`}
    >
      {props.date < new Date() && props.request.status !== 'pending' ? (
        <div className="p-4 absolute top-4 left-[50%] translate-x-[-50%] w-[70%] h-[90%] bg-white z-[100]  rounded-xl">
          <span className="">
            How was the service from {props.request.serviceName} on{' '}
            {props.request.day.slice(0, 10)} from{' '}
            {props.request.timeslots.start} - {props.request.timeslots.end}?
          </span>
          <div className=" flex items-center justify-center w-full pt-8 text-[#9AD]">
            {props.stars.map((star: any, index: number) => (
              <FaStar
                size={30}
                key={index}
                color={
                  index < (props.hoverValue || props.currentValue)
                    ? '#564787'
                    : '#9AD'
                }
                onClick={() => {
                  props.handleClickStars(index + 1);
                  props.setRating(index + 1);
                  console.log(index + 1);
                }}
                onMouseEnter={() => props.handleHoverStars(index + 1)}
                onMouseLeave={props.handleLeaveStars}
              />
            ))}
          </div>
          <button
            onClick={() => {
              props.handleCreateNewRating(
                props.request.serviceId,
                props.rating,
              );
              props.setRating(0);
              props.handleDeleteRequest(props.request.id);
            }}
            className="mt-10 btn-secondary"
          >
            Submit Rating
          </button>
        </div>
      ) : (
        ''
      )}

      {(props.date < new Date() && props.request.status === 'pending') ||
      props.request.status === 'rejected' ? (
        <div className="overflow-y-auto p-4 absolute top-4 left-[50%] translate-x-[-50%] w-[70%] h-[90%] bg-white z-[100]  rounded-xl">
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex flex-col text-sm">
              <span>{props.request.day}</span>
              <span>
                {props.request.timeslots.start}- {props.request.timeslots.end}
              </span>
              <span> with {props.request.serviceName}</span>
            </div>
            <span className="">
              This Request is expired or has been rejected.
            </span>

            <button
              onClick={() => {
                props.handleDeleteRequest(props.request.id);
              }}
              className="mt-3 text-sm btn-secondary"
            >
              Delete Request
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      <div>{props.request.serviceName}</div>
      <div className="flex flex-col gap-3 p-4 border-2 shadow-secondaryModified rounded-xl">
        <div className="flex items-center justify-start w-full gap-2">
          <CalendarIcon />

          <div className="font-bold">{props.request.day}</div>
        </div>
        <div className="flex items-center w-full gap-4">
          <ClockIcon />
          <div className="text-center ">
            {props.request.timeslots.start} - {props.request.timeslots.end}
          </div>
        </div>
      </div>
      <div>
        <span className="mr-2">Status:</span>
        {props.request.status === 'pending' && (
          <span className="text-[#F9A826]">Pending</span>
        )}
        {props.request.status === 'accepted' && (
          <span className="text-[#4BB543]">Accepted</span>
        )}
        {props.request.status === 'rejected' && (
          <span className="text-[#F95E5A]">Rejected</span>
        )}
      </div>
      {props.request.status === 'accepted' && (
        <a href={`mailto:${props.request.serviceEmail}`}>
          <button className="btn-secondary">Contact</button>
        </a>
      )}
    </li>
  );
}
