import React, { useState, useEffect, useRef } from "react";
import WithBar from "../../components/bar/with-bar.component";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  Avatar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Slider from "react-slick";
import axios from "axios";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { motion } from "framer-motion";

const Driver = () => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [dataFull, setDataFull] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  console.log(data);

  let slider = useRef();

  const handleFilter = () => {
    if (filter !== "") {
      setData(dataFull.filter((dataFull) => dataFull.name.first === filter));
    }
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "https://randomuser.me/api/?results=40",
    }).then((res) => {
      setData(res.data.results.slice(skip, limit));
      setDataFull(res.data.results);
    });
  }, []);

  const handleNext = () => {
    setData((data) => [...data, ...dataFull.slice(skip + 5, limit + 5)]);
    setSkip((skip) => skip + 5);
    setLimit((limit) => limit + 5);
    slider.current.slickNext();
  };

  const handlePrev = () => {
    slider.current.slickPrev();
  };

  const handleMNext = () => {
    setData(dataFull.slice(skip + 5, limit + 5));
    setSkip((skip) => skip + 5);
    setLimit((limit) => limit + 5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMPrev = () => {
    setData(dataFull.slice(skip - 5, limit - 5));
    setSkip((skip) => skip - 5);
    setLimit((limit) => limit - 5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 4,
    infinite: false,
    arrows: false,
    variableWidth: true,
    className: "mb-16",
    afterChange: () => {
      setData((data) => [...data, ...dataFull.slice(skip + 5, limit + 5)]);
      setSkip((skip) => skip + 5);
      setLimit((limit) => limit + 5);
    },
    responsive: [
      {
        breakpoint: 200,
        settings: {
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 822,
        settings: {
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1207,
        settings: {
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1590,
        settings: {
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className="w-full flex flex-col p-4 sm:p-12">
      <div className="w-full flex flex-wrap flex-col sm:flex-row justify-between items-center bg-white p-4 mb-10">
        <div>
          <p className="font-mono text-2xl text-red-700 font-semibold">
            DRIVER MANAGEMENT
          </p>
          <p className="text-sm">Data driver yang bekerja dengan anda</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <OutlinedInput
            className="sm:mr-4"
            color="secondary"
            placeholder="Cari Driver"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <IconButton edge="end">
                  <SearchIcon onClick={handleFilter} className="text-red-700" />
                </IconButton>
              </InputAdornment>
            }
          />
          <button className="w-full sm:w-1/2 text-white bg-red-700 py-4 px-4 rounded-md">
            TAMBAH DRIVER +
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:hidden">
        <MDriver data={data} />
      </div>
      <div className="hidden sm:inline">
        <Slider ref={slider} {...settings}>
          {data.map((row, index) => (
            <motion.div
              animate={{ scale: [0, 1] }}
              transition={{ duration: 0.5 + parseFloat("0." + index) }}
              key={index}
              style={{ width: 300 }}
              className="bg-white"
            >
              <div className="flex flex-row justify-between items-center pl-4 pr-1 py-1">
                <div className="flex flex-row">
                  <p className="text-gray-600 mr-2">Driver ID:</p>
                  <span className="text-red-700">
                    {row.cell.replaceAll(/[-\(\) ]/g, "")}
                  </span>
                </div>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </div>
              <Divider />
              <div className="p-4">
                <img src={row.picture.medium} className="rounded-full" />
                <div className="flex flex-col pt-6">
                  <span className="text-sm text-gray-600">Nama Driver</span>
                  <span className="text-base font-medium">
                    {row.name.first}, {row.name.last}
                  </span>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="text-sm text-gray-600">Telepon</span>
                  <span className="text-base font-medium">{row.phone}</span>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="text-base font-medium">{row.email}</span>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="text-sm text-gray-600">Tanggal Lahir</span>
                  <span className="text-base font-medium">{row.dob.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
      <div className="hidden sm:flex flex-row justify-center">
        <IconButton onClick={handlePrev}>
          <KeyboardArrowLeftIcon />
          <p className="text-xs sm:text-base text-gray-600 m-4">
            Previous Page
          </p>
        </IconButton>
        <IconButton onClick={handleNext}>
          <p className="text-xs sm:text-base text-gray-600 m-4">Next Page</p>
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
      <div className="flex sm:hidden flex-row justify-center">
        <IconButton onClick={handleMPrev}>
          <KeyboardArrowLeftIcon />
          <p className="text-xs sm:text-base text-gray-600 m-4">
            Previous Page
          </p>
        </IconButton>
        <IconButton onClick={handleMNext}>
          <p className="text-xs sm:text-base text-gray-600 m-4">Next Page</p>
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

const MDriver = ({ data }) => {
  return data.map((row, index) => (
    <motion.div
      animate={{ scale: [0, 1] }}
      transition={{ duration: 0.5 + parseFloat("0." + index) }}
      key={index}
      className="bg-white mb-4 w-full"
    >
      <div className="flex flex-row justify-between items-center pl-4 pr-1 py-1">
        <div className="flex flex-row">
          <p className="text-sm text-gray-600 mr-2">Driver ID:</p>
          <span className="text-sm text-red-700">
            {row.cell.replaceAll(/[-\(\) ]/g, "")}
          </span>
        </div>
        <IconButton>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </div>
      <Divider />
      <div className="p-4">
        <img src={row.picture.medium} className="rounded-full" />
        <div className="flex flex-col pt-6">
          <span className="text-xs text-gray-600">Nama Driver</span>
          <span className="text-sm font-medium">
            {row.name.first}, {row.name.last}
          </span>
        </div>
        <div className="flex flex-col pt-2">
          <span className="text-xs text-gray-600">Telepon</span>
          <span className="text-sm font-medium">{row.phone}</span>
        </div>
        <div className="flex flex-col pt-2">
          <span className="text-xs text-gray-600">Email</span>
          <span className="text-sm font-medium">{row.email}</span>
        </div>
        <div className="flex flex-col pt-2">
          <span className="text-xs text-gray-600">Tanggal Lahir</span>
          <span className="text-sm font-medium">{row.dob.date}</span>
        </div>
      </div>
    </motion.div>
  ));
};

export default WithBar(Driver);
