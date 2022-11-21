import React from 'react';
import CalendarIcon from '../atoms/icons/CalendarIcon';
import ClockIcon from '../atoms/icons/ClockIcon';
import RequestRejectionCard from './RequestRejectionCard';

export default function ServiceRequestCard(props: any) {
  return (
    <li
      className={`z-1 px-10 py-6 mx-10 mb-6 relative flex flex-col items-center text-[#564787] text-center bg-white  rounded-xl shadow-secondaryModified gap-5 ${
        props.date < new Date() || props.request.status === 'rejected'
          ? 'bg-gray-300'
          : ''
      }`}
    >
      {(props.date < new Date() && props.request.status === 'pending') ||
      props.request.status === 'rejected' ? (
        <RequestRejectionCard
          request={props.request}
          name={props.request.userName}
          isUser={false}
        />
      ) : (
        ''
      )}
      <div>{props.request.userName}</div>
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
      {props.request.status === 'pending' && (
        <>
          <button
            onClick={() => {
              props.handleRequestStatusUpdate(props.request.id, 'accepted');
              props.request.status = 'accepted';
              props.setRender((prev: boolean) => !prev);
            }}
            className="btn-secondary"
          >
            Accept
          </button>
          <button
            onClick={() => {
              props.handleRequestStatusUpdate(props.request.id, 'rejected');
              props.request.status = 'rejected';
              props.setRender((prev: boolean) => !prev);
            }}
            className="border-2 btn-primary"
          >
            Decline
          </button>
        </>
      )}
      {props.request.status === 'accepted' && (
        <a href={`mailto:${props.request.userEmail}`}>
          <button className="btn-secondary">Contact</button>
        </a>
      )}
    </li>
  );
}
