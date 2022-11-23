import Image from 'next/image';
import CloseButton from '../atoms/buttons/CloseBtn';

export default function FilterForm(props: any) {
  function handleFilter() {
    console.log('filtering');
    console.log('serviceDataFromDB', props.serviceDataFromDB);
    const arrayCopy = [...props.serviceDataFromDB].filter((service) => {
      if (props.district === 'all') {
        return service.price <= props.price;
      } else {
        return (
          service.district
            .toLowerCase()
            .includes(props.district.toLowerCase()) &&
          service.price <= props.price
        );
      }
    });
    props.setShowFilter(false);
    props.setServiceData(arrayCopy);
  }

  function handleGoBackAction() {
    props.setShowFilter(false);
  }

  return (
    <form
      className={`${
        props.showFilter === false ? 'hidden' : ''
      } px-10 pt-16 filter-form flex flex-col sm:w-[450px] sm:border-r-4 overflow-auto hide-scrollbar sm:pt-32 sm:items-center gap-8  h-[100vh]  w-full bg-white z-[1000000000000000000000000000000000000000] fixed left-0 top-0 overflow-y-auto `}
    >
      <div className="relative flex flex-col justify-center gap-10 px-8 py-10 border-2 border-gray-300 rounded-lg sm:w-[400px]">
        <div className="">
          <CloseButton handleGoBackAction={handleGoBackAction} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-end gap-3 pb-4">
            <Image src="/images/location.svg" height="30" width="30" />
            <label htmlFor="district" className=" text-[#564787] font-bold">
              District
            </label>
          </div>
          <select
            className="overflow-visible border-2 border-gray-300 rounded-lg district-select"
            value={props.district}
            onChange={(event) => props.setDistrict(event.target.value)}
          >
            <option className="h-[300px]" value="all">
              All
            </option>
            <option value="1010">1010</option>
            <option value="1020">1020</option>
            <option value="1030">1030</option>
            <option value="1040">1040</option>
            <option value="1050">1050</option>
            <option value="1060">1060</option>
            <option value="1070">1070</option>
            <option value="1080">1080</option>
            <option value="1090">1090</option>
            <option value="1100">1100</option>
            <option value="1110">1110</option>
            <option value="1120">1120</option>
            <option value="1130">1130</option>
            <option value="1140">1140</option>
            <option value="1150">1150</option>
            <option value="1160">1160</option>
            <option value="1170">1170</option>
            <option value="1180">1180</option>
            <option value="1190">1190</option>
            <option value="1200">1200</option>
            <option value="1210">1210</option>
            <option value="1220">1220</option>
            <option value="1230">1230</option>
          </select>
        </div>
        <div className="">
          <label
            htmlFor="price"
            className="block mb-2 font-semibold text-[#564787] text-center relative"
          >
            <div className="flex items-center gap-3 ">
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

        <button
          className="mx-auto btn-secondary bg-[#564787]"
          onClick={(event) => {
            event.preventDefault();
            props.setShowFilter(false);
            handleFilter();
          }}
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
