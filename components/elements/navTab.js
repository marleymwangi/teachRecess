import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";

const contVar = {
  hide: { opacity: 1 },
  show: { opacity: 1 },
};

const revealVar = {
  normal: {
    scale: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
  show: {
    scale: 1.3,
    y: -5,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

const iconVar = {
  normal: {
    color: "#fff",
    backgroundColor: "#06b6d4",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
  show: {
    color: "#fff",
    backgroundColor: "#22d3ee",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

const textVar = {
  normal: {
    y: 0,
    color: "#e5e7eb",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
  show: {
    y: 5,
    color: "#fff",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export default function NavTab({ icon, href, text, selected, setSelected }) {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    if (selected === href) {
      controls.set("show");
    } else {
      controls.set("normal");
    }
  }, [router, controls, selected, href]);

  return (
    <div className="w-full">
      {href && (
        <Link href={href}>
          <motion.a
            variants={contVar}
            animate={controls}
            className="selected"
            onClick={() => setSelected(href)}
          >
            <motion.div variants={revealVar} className="icon__cont__out">
              <motion.div variants={iconVar} className="icon__cont__in">
                {icon}
              </motion.div>
            </motion.div>
            <motion.span variants={textVar}>{text}</motion.span>
          </motion.a>
        </Link>
      )}
    </div>
  );
}
