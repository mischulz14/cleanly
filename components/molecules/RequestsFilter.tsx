import React from 'react';

export default function RequestsFilter(props: any) {
  return (
    <div className="flex items-center justify-center gap-4 px-2 mt-24 mb-6">
      <button
        onClick={() => {
          props.getAllRequests(props.id);
          props.setRequestsTimeframe('all');
        }}
        className={`px-8 py-2 bg-white border-2 rounded-xl ${
          props.requestsTimeframe === 'all' && 'bg-[#101935] text-white'
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          props.handleShowUpcomingRequests();
          props.setRequestsTimeframe('upcoming');
        }}
        className={`px-8 py-2 bg-white border-2 rounded-xl ${
          props.requestsTimeframe === 'upcoming' && 'bg-[#101935] text-white'
        }`}
      >
        Upcoming
      </button>
      <button
        onClick={() => {
          props.handleShowPastRequests();
          props.setRequestsTimeframe('past');
        }}
        className={`px-8 py-2 bg-white border-2 rounded-xl ${
          props.requestsTimeframe === 'past' && 'bg-[#101935] text-white'
        }`}
      >
        Past
      </button>
    </div>
  );
}
