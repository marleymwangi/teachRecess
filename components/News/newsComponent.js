import dynamic from "next/dynamic";
//custom
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useEffect } from "react";

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

export default function NewsComponent({ title, content, type, onDelete, index }) {
  const controls = useAnimation();

  useEffect(()=>{
    controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
  },[])

  async function handleDragEnd(event, info) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      await controls.start({ x: "-100%", transition: { duration: 0.2 } });
      onDelete(index);
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  }

  return (
    <motion.div
      drag="x"
      dragDirectionLock
      onDragEnd={handleDragEnd}
      animate={controls}
      className="incident"
    >
      <div className="icon"></div>
      <div className={`content ${type}`}>
        <div>
          <h6>{title}</h6>
          <p>{content}</p>
        </div>
        <div className="child">
          <div className="avatar">
            <div>
              <img
                src={`https://api.lorem.space/image/face?hash=327${0}`}
                alt=""
              />
            </div>
          </div>
          <h1>Jane Doe</h1>
        </div>
      </div>
    </motion.div>
  );
}
