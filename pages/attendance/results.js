import { motion } from "framer-motion";
import LineG from "../../components/elements/lineG";

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
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

const resultsObj = [
  {
    name: "english",
    endt: 56.0,
    opener: 14.86,
    cat1: 5.67,
    total: 77,
    point: 10,
    grade: "b+",
    pos: "9/273",
    remarks: "Quite Good",
  },
  {
    name: "mathematics",
    endt: 42.7,
    opener: 14.4,
    cat1: 10.0,
    total: 67,
    point: 8,
    grade: "b-",
    pos: "6/273",
    remarks: "Fairly Good",
  },
  {
    name: "kiswahili",
    endt: 36.0,
    opener: 9.14,
    cat1: 9.0,
    total: 54,
    point: 5,
    grade: "c-",
    pos: "54/273",
    remarks: "You can do better",
  },
  {
    name: "biology",
    endt: 64.68,
    opener: 17.0,
    cat1: 8.67,
    total: 90,
    point: 12,
    grade: "a",
    pos: "2/273",
    remarks: "Excellent",
  },
  {
    name: "Physics",
    endt: 65.8,
    opener: 14.0,
    cat1: 9.0,
    total: 89,
    point: 12,
    grade: "a",
    pos: "1/273",
    remarks: "Excellent",
  },
  {
    name: "Chemistry",
    endt: 62.0,
    opener: 14.49,
    cat1: 9.67,
    total: 86,
    point: 12,
    grade: "a",
    pos: "15/273",
    remarks: "Excellent",
  },
  {
    name: "History",
    endt: 68.6,
    opener: 17.0,
    cat1: 10.0,
    total: 96,
    point: 12,
    grade: "a",
    pos: "4/273",
    remarks: "Excellent",
  },
  {
    name: "Geography",
    endt: 56.0,
    opener: 14.86,
    cat1: 5.67,
    total: 77,
    point: 10,
    grade: "b+",
    pos: "9/273",
    remarks: "Excellent",
  },
  {
    name: "C.R.E",
    endt: 56.0,
    opener: 14.86,
    cat1: 5.67,
    total: 77,
    point: 10,
    grade: "b+",
    pos: "9/273",
    remarks: "Excellent",
  },
  {
    name: "French",
    endt: 56.0,
    opener: 14.86,
    cat1: 5.67,
    total: 77,
    point: 10,
    grade: "b+",
    pos: "9/273",
    remarks: "Excellent",
  },
];

export default function Results() {
  return (
    <motion.main
      variants={contVar}
      initial="hide"
      animate="show"
      className="results__page"
    >
      <motion.section variants={riseVar}>
        <div className="overall">
          <h1>Overall Performance</h1>
          <div className="results">
            <div className="grid grid-cols-2">
              <div className="result">
                <span>Class Pos</span>
                <h6>
                  2<span> /55</span>
                </h6>
              </div>
              <div className="result">
                <span>Level Pos</span>
                <h6>
                  3<span> /276</span>
                </h6>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="result">
                <span>Mean Point</span>
                <h6>11</h6>
              </div>
              <div className="result">
                <span>Mean Score</span>
                <h6>81.0</h6>
              </div>
              <div className="result">
                <span>Mean Grade</span>
                <h6>A-</h6>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="result">
                <span>Total Points</span>
                <h6>105</h6>
              </div>
              <div className="result">
                <span>Total Marks</span>
                <h6>
                  807.0<span> /1000</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section variants={riseVar}>
        <LineG />
      </motion.section>
      <motion.section variants={riseVar}>
        <div className="subjects">
          <h1>Per Subject Performance</h1>
          {resultsObj.map((r, i) => (
            <div key={i} className="collapse collapse-plus">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-bold capitalize">{r.name}</div>
              <div className="collapse-content">
                <div className="subject">
                  <div className="grid-cols-4">
                    <div>
                      <span>ENDT</span>
                      <span>{r.endt}</span>
                    </div>
                    <div>
                      <span>OPENER</span>
                      <span>{r.opener}</span>
                    </div>
                    <div>
                      <span>CAT1</span>
                      <span>{r.cat1}</span>
                    </div>
                    <div>
                      <span>TOTAL</span>
                      <span>{r.total}</span>
                    </div>
                  </div>
                  <div className="grid-cols-3">
                    <div>
                      <span>POINT</span>
                      <span>{r.point}</span>
                    </div>
                    <div>
                      <span>GRADE</span>
                      <span className="uppercase">{r.grade}</span>
                    </div>
                    <div>
                      <span>POS</span>
                      <span>{r.pos}</span>
                    </div>
                  </div>
                  <div className="grid-cols-1">
                    <div>
                      <span>REMARKS</span>
                      <span className="uppercase">{r.remarks}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
