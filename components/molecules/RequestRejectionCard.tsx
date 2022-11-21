import React from 'react';

export default function RequestRejectionCard(props: any) {
  return (
    <div className="p-4 absolute top-3 left-[50%] translate-x-[-50%] w-[70%] h-[90%] bg-white z-[100]  rounded-xl">
      <div className="flex flex-col items-center justify-between h-full gap-2 text-sm">
        <div className="flex flex-col text-sm">
          <span>{props.request.day}</span>
          <span>
            {props.request.timeslots.start}- {props.request.timeslots.end}
          </span>
          <span> with {props.name}</span>
        </div>

        {!props.isUser ? (
          <>
            <span className="">
              This Request is either expired or has been rejected by you.
            </span>

            <span>You have to wait for the user to delete this request.</span>
          </>
        ) : (
          <>
            {' '}
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
          </>
        )}
      </div>
    </div>
  );
}
