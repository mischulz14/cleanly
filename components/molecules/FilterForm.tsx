import Image from 'next/image';
import { useState } from 'react';
import { serviceData } from '../../data/service';
import SlideInFromLeft from '../animation/SlideInFromLeft';
import SlideInFromTop from '../animation/SlideInFromTop';

export default function FilterForm(props: any) {
  function handleFilter() {
    const arrayCopy = [...props.serviceDataFromDB].map((service: any) => {
      console.log('service', service);
      if (props.district !== '') {
        const priceAndDistrictFilteredArray = service
          .filter((service: any) => service.price <= parseInt(props.price))
          .filter(
            (service: any) => service.district <= parseInt(props.district),
          );

        props.setServiceData(priceAndDistrictFilteredArray);
        return priceAndDistrictFilteredArray;
      } else {
        console.log('price', props.price);
        console.log('service price', service[0].price);
        const priceFilteredArray = service.filter(
          (service: any) => service.price <= parseInt(props.price),
        );

        console.log('priceFilteredArray', priceFilteredArray);

        return priceFilteredArray;
      }
    });

    props.setShowFilter(false);
    props.setServiceData(arrayCopy);
  }

  return (
    <form className="p-10 filter-form flex flex-col gap-8  h-[100vh] w-full bg-white z-[1000000000000000000000000000000000000000] absolute left-0 top-0">
      <div className="">
        <label
          htmlFor="price"
          className="block mb-2 font-semibold text-[#564787] text-center relative"
        >
          <div className=" flex justify-between items-center ">
            <Image src="/images/euro.svg" height="30" width="30" />
            <span>Price/h: {props.price}</span>
          </div>
        </label>
        <input
          className="mb-8 w-[250px]"
          id="price"
          type="range"
          min="0"
          max="30"
          onChange={(event) => {
            props.setPrice(event.currentTarget.value);
          }}
          value={props.price}
        />
      </div>
      <div>
        <label htmlFor="district">District</label>
        <select
          id="district"
          value={props.district}
          onChange={(event) => props.setDistrict(event.target.value)}
        >
          <option value="all">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
        </select>
      </div>
      <button
        className="btn-primary"
        onClick={(event) => {
          event.preventDefault();
          props.setShowFilter(false);
          handleFilter();
        }}
      >
        Apply Filters
      </button>
    </form>
  );
}
