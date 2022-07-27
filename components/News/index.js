import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom
import { motion, useMotionValue, useAnimation } from "framer-motion";
//custom pack
import Title from "../elements/title";
import NewsComponent from "./newsComponent";

const mainVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
    },
  },
};

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const news = [
  {
    type: "info",
    title: "Attire",
    content: "Student has swimming tomorrow",
  },
  {
    type: "warn",
    title: "Transport",
    content: "Bus may be late by 15 min",
  },
  {
    type: "urg",
    title: "Attendance",
    content: "Student isnt in Class today",
  },
  {
    type: "good",
    title: "Transport",
    content: "Student has swimming tomorrow",
  },
];

export default function News() {
  const [items, setItems] = useState(news);

  function onDelete(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    console.log(newItems);
    setItems(newItems);
  }
  return (
    <motion.section variants={mainVar} className="news__sec">
      <Title title="News" />
      <motion.p variants={riseVar} className="text-gray-400 text-sm">
        This area show important/urgent messages
      </motion.p>
      <div  className="incidents">
        {items.map((n, i) => (
          <NewsComponent
            key={i}
            type={n.type}
            title={n.title}
            content={n.content}
            onDelete={onDelete}
            index={i}
          />
        ))}
      </div>
    </motion.section>
  );
}
